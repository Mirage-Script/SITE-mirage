import { useReducedMotion } from 'framer-motion';
import { useRef, useEffect, ReactNode } from 'react';

import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ANIM } from '@/lib/animTokens';

interface TextBlurRevealProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  ease?: string;
  start?: string;
  end?: string;
  blurAmount?: number;
}

/**
 * Text appears with blur effect that gradually disappears.
 * Respects prefers-reduced-motion preference.
 * 
 * @example
 * <TextBlurReveal>
 *   Your text here
 * </TextBlurReveal>
 */
export function TextBlurReveal({
  children,
  className = '',
  duration = ANIM.duration.md,
  ease = ANIM.ease.out,
  start = 'top 80%',
  end = 'top 50%',
  blurAmount = 8,
}: TextBlurRevealProps) {
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
          filter: `blur(${blurAmount}px)`,
        },
        {
          opacity: 1,
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
  }, [duration, ease, start, end, blurAmount, prefersReducedMotion]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
}

