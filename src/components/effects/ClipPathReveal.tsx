import { useReducedMotion } from 'framer-motion';
import { useRef, useEffect, ReactNode } from 'react';

import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ANIM } from '@/lib/animTokens';

interface ClipPathRevealProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  ease?: string;
  start?: string;
  end?: string;
  direction?: 'left' | 'right' | 'top' | 'bottom';
}

/**
 * Reveals content using clip-path animation.
 * Content appears to slide in from specified direction.
 * 
 * @example
 * <ClipPathReveal direction="left">
 *   <img src="..." alt="..." />
 * </ClipPathReveal>
 */
export function ClipPathReveal({
  children,
  className = '',
  duration = ANIM.duration.lg,
  ease = ANIM.ease.out,
  start = 'top 80%',
  end = 'top 50%',
  direction = 'left',
}: ClipPathRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const element = elementRef.current;
    if (!element || prefersReducedMotion) {
      return;
    }

    const clipPaths = {
      left: { from: 'inset(0 100% 0 0)', to: 'inset(0 0 0 0)' },
      right: { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0)' },
      top: { from: 'inset(100% 0 0 0)', to: 'inset(0 0 0 0)' },
      bottom: { from: 'inset(0 0 100% 0)', to: 'inset(0 0 0 0)' },
    };

    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          clipPath: clipPaths[direction].from,
          opacity: 0,
        },
        {
          clipPath: clipPaths[direction].to,
          opacity: 1,
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
  }, [duration, ease, start, end, direction, prefersReducedMotion]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

