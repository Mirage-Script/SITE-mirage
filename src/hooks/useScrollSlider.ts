import { useReducedMotion } from 'framer-motion';
import { RefObject, useEffect } from 'react';

import { gsap, ScrollTrigger } from '@/lib/gsap';

interface ScrollSliderOptions {
  direction?: 'left' | 'right';
  speed?: number;
  disabled?: boolean;
}

/**
 * Creates horizontal scroll animation triggered by vertical scroll.
 * Perfect for carousels and horizontal sliders.
 * 
 * @example
 * const sliderRef = useRef<HTMLDivElement>(null);
 * useScrollSlider(sliderRef, { direction: 'left', speed: 1 });
 */
export function useScrollSlider(
  containerRef: RefObject<HTMLElement | null>,
  {
    direction = 'left',
    speed = 1,
    disabled = false,
  }: ScrollSliderOptions = {},
) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || disabled || prefersReducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      const scrollWidth = container.scrollWidth - container.clientWidth;

      gsap.to(container, {
        scrollLeft: direction === 'left' ? scrollWidth : 0,
        duration: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top center',
          end: 'bottom center',
          scrub: speed,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => {
      context.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [direction, speed, disabled, prefersReducedMotion, containerRef]);
}

