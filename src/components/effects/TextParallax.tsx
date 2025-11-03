import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ANIM } from '@/lib/animTokens';

interface TextParallaxProps {
  text: string;
  className?: string;
  speed?: number; // 0.5 = half speed, 2 = double speed
  direction?: 'up' | 'down';
  opacityParallax?: boolean;
}

export function TextParallax({
  text,
  className = '',
  speed = 1,
  direction = 'up',
  opacityParallax = false
}: TextParallaxProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const yOffset = direction === 'up' ? -100 : 100;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: elementRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        markers: false
      }
    });

    tl.fromTo(
      elementRef.current,
      {
        y: 0,
        opacity: opacityParallax ? 0 : 1
      },
      {
        y: yOffset * speed,
        opacity: opacityParallax ? 1 : 1,
        duration: 1,
        ease: 'none'
      },
      0
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === elementRef.current) {
          trigger.kill();
        }
      });
    };
  }, [speed, direction, opacityParallax]);

  return (
    <div ref={elementRef} className={className}>
      {text}
    </div>
  );
}

