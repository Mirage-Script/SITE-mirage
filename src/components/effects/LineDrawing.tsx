import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ANIM } from '@/lib/animTokens';

interface LineDrawingProps {
  svgPath: string;
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
  duration?: number;
  scrollTrigger?: boolean;
}

export function LineDrawing({
  svgPath,
  className = '',
  strokeColor = 'currentColor',
  strokeWidth = 2,
  duration = ANIM.duration.lg,
  scrollTrigger: enableScrollTrigger = true
}: LineDrawingProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    // Set initial state
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length
    });

    // Animate
    const tl = gsap.timeline({
      scrollTrigger: enableScrollTrigger
        ? {
            trigger: svgRef.current,
            start: ANIM.scroll.start,
            once: true
          }
        : undefined
    });

    tl.to(path, {
      strokeDashoffset: 0,
      duration: duration,
      ease: ANIM.ease.out
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === svgRef.current) {
          trigger.kill();
        }
      });
    };
  }, [duration, enableScrollTrigger]);

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        ref={pathRef}
        d={svgPath}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

