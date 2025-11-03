import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ANIM } from '@/lib/animTokens';

interface SVGMorphingProps {
  fromPath: string;
  toPath: string;
  className?: string;
  duration?: number;
  scrollTrigger?: boolean;
  repeat?: boolean;
}

export function SVGMorphing({
  fromPath,
  toPath,
  className = '',
  duration = ANIM.duration.lg,
  scrollTrigger: enableScrollTrigger = true,
  repeat = false
}: SVGMorphingProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: enableScrollTrigger
        ? {
            trigger: svgRef.current,
            start: ANIM.scroll.start,
            once: !repeat
          }
        : undefined,
      repeat: repeat ? -1 : 0,
      yoyo: repeat
    });

    tl.to(pathRef.current, {
      attr: { d: toPath },
      duration: duration,
      ease: ANIM.ease.out
    });

    if (repeat) {
      tl.to(
        pathRef.current,
        {
          attr: { d: fromPath },
          duration: duration,
          ease: ANIM.ease.out
        }
      );
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === svgRef.current) {
          trigger.kill();
        }
      });
    };
  }, [fromPath, toPath, duration, enableScrollTrigger, repeat]);

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        ref={pathRef}
        d={fromPath}
        fill="currentColor"
      />
    </svg>
  );
}

