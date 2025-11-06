import { RefObject, useEffect } from 'react';

import { gsap, ScrollTrigger } from '@/lib/gsap';

interface ScrollProgressBarOptions {
  disabled?: boolean;
}

/**
 * Animates a progress bar based on scroll position.
 * Updates width from 0% to 100% as user scrolls through page.
 * 
 * @example
 * const progressRef = useRef<HTMLDivElement>(null);
 * useScrollProgressBar(progressRef);
 */
export function useScrollProgressBar(
  targetRef: RefObject<HTMLElement | null>,
  { disabled = false }: ScrollProgressBarOptions = {},
) {
  useEffect(() => {
    const element = targetRef.current;
    if (!element || disabled) {
      return;
    }

    const context = gsap.context(() => {
      gsap.to(element, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          onUpdate: (self) => {
            gsap.set(element, {
              scaleX: self.getVelocity() > 0 ? self.progress : self.progress,
            });
          },
        },
      });

      // Initial state
      gsap.set(element, { scaleX: 0, transformOrigin: 'left center' });
    }, element);

    return () => {
      context.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element || trigger.trigger === document.body) {
          trigger.kill();
        }
      });
    };
  }, [disabled, targetRef]);
}

