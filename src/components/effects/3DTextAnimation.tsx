import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ANIM } from '@/lib/animTokens';

interface Text3DAnimationProps {
  text: string;
  className?: string;
  rotationX?: number;
  rotationY?: number;
  rotationZ?: number;
  perspective?: number;
  duration?: number;
}

export function Text3DAnimation({
  text,
  className = '',
  rotationX = 45,
  rotationY = 45,
  rotationZ = 0,
  perspective = 1000,
  duration = ANIM.duration.lg
}: Text3DAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    gsap.set(containerRef.current, { perspective: perspective });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: ANIM.scroll.start,
        end: 'bottom center',
        scrub: 1,
        markers: false
      }
    });

    tl.fromTo(
      textRef.current,
      {
        rotationX: rotationX,
        rotationY: rotationY,
        rotationZ: rotationZ,
        opacity: 0
      },
      {
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        opacity: 1,
        duration: duration,
        ease: ANIM.ease.out
      }
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [rotationX, rotationY, rotationZ, perspective, duration]);

  return (
    <div ref={containerRef} className={className}>
      <div
        ref={textRef}
        style={{
          transformStyle: 'preserve-3d',
          transform: 'translateZ(0)'
        }}
      >
        {text}
      </div>
    </div>
  );
}

