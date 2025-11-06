import { useReducedMotion } from 'framer-motion';
import { useRef, useEffect, ReactNode } from 'react';

import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ANIM } from '@/lib/animTokens';

interface Text3DAnimationProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  ease?: string;
  start?: string;
  end?: string;
  rotateX?: number;
  rotateY?: number;
  perspective?: number;
}

/**
 * Animates text with 3D rotation and perspective effects.
 * Creates immersive 3D text entrance animations.
 * 
 * @example
 * <Text3DAnimation rotateX={-90} rotateY={45}>
 *   Your 3D Text
 * </Text3DAnimation>
 */
export function Text3DAnimation({
  children,
  className = '',
  duration = ANIM.duration.lg,
  ease = ANIM.ease.out,
  start = 'top 80%',
  end = 'top 50%',
  rotateX = -90,
  rotateY = 45,
  perspective = 1000,
}: Text3DAnimationProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const element = textRef.current;
    if (!element || prefersReducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          rotateX,
          rotateY,
          scale: 0.8,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration,
          ease,
          scrollTrigger: {
            trigger: element,
            start,
            end,
            once: true,
            toggleActions: 'play none none none',
          },
        }
      );
    }, element);

    return () => {
      context.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [duration, ease, start, end, rotateX, rotateY, prefersReducedMotion]);

  return (
    <div
      ref={textRef}
      className={className}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
}

