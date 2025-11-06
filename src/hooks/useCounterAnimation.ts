import { useReducedMotion } from 'framer-motion';
import { RefObject, useEffect } from 'react';

import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ANIM } from '@/lib/animTokens';

interface CounterAnimationOptions {
  from?: number;
  to: number;
  duration?: number;
  ease?: string;
  start?: string;
  end?: string;
  format?: (value: number) => string;
  disabled?: boolean;
  onUpdate?: (value: number) => void;
}

/**
 * Animates a counter from one value to another when element enters viewport.
 * Respects prefers-reduced-motion and uses ScrollTrigger for scroll-driven animation.
 * 
 * @example
 * const counterRef = useRef<HTMLDivElement>(null);
 * useCounterAnimation(counterRef, {
 *   to: 1000,
 *   duration: 2,
 *   format: (val) => Math.round(val).toLocaleString()
 * });
 */
export function useCounterAnimation(
  targetRef: RefObject<HTMLElement | null>,
  {
    from = 0,
    to,
    duration = ANIM.duration.lg,
    ease = ANIM.ease.out,
    start = 'top 80%',
    end = 'top 50%',
    format = (val) => Math.round(val).toString(),
    disabled = false,
    onUpdate,
  }: CounterAnimationOptions,
) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const element = targetRef.current;
    if (!element || disabled || prefersReducedMotion) {
      // Set to final value immediately if reduced motion
      element?.textContent === null && (element.textContent = format(to));
      return;
    }

    const context = gsap.context(() => {
      const counter = { value: from };

      gsap.to(counter, {
        value: to,
        duration,
        ease,
        onUpdate() {
          const formattedValue = format(counter.value);
          element.textContent = formattedValue;
          onUpdate?.(counter.value);
        },
        scrollTrigger: {
          trigger: element,
          start,
          end,
          once: true,
          toggleActions: 'play none none none',
        },
      });
    }, element);

    return () => {
      context.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [from, to, duration, ease, start, end, format, disabled, prefersReducedMotion, targetRef, onUpdate]);
}

