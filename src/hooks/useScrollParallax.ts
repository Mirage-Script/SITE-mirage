import { useReducedMotion } from 'framer-motion';
import { RefObject, useEffect } from 'react';

import { gsap, ScrollTrigger } from '@/lib/gsap';


interface ScrollParallaxOptions {
  axis?: 'x' | 'y';
  intensity?: number;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  ease?: string;
  disabled?: boolean;
}

/**
 * Applies a subtle parallax translation to the provided element using GSAP + ScrollTrigger.
 * Respects reduced motion preferences and the performance budget guard.
 */
export function useScrollParallax(
  targetRef: RefObject<HTMLElement>,
  {
    axis = 'y',
    intensity = 80,
    start = 'top bottom',
    end = 'bottom top',
    scrub = 0.85,
    ease = 'none',
    disabled = false,
  }: ScrollParallaxOptions = {}
) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const element = targetRef.current;
    if (!element) {
      return;
    }

    if (disabled || prefersReducedMotion) {
      gsap.set(element, { [axis]: 0 });
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        { [axis]: -intensity / 2 },
        {
          [axis]: intensity / 2,
          ease,
          overwrite: 'auto',
          scrollTrigger: {
            trigger: element,
            start,
            end,
            scrub,
            invalidateOnRefresh: true,
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
  }, [axis, disabled, ease, end, intensity, prefersReducedMotion, scrub, start, targetRef]);
}
