import { useReducedMotion } from 'framer-motion';
import { RefObject, useEffect } from 'react';

import { gsap, ScrollTrigger } from '@/lib/gsap';

interface Formation {
  columns: number;
  start: string;
  gap?: string;
}

interface LayoutFormationsOptions {
  formations: Formation[];
  disabled?: boolean;
}

/**
 * Reorganizes grid layout into different formations as user scrolls.
 * Inspired by Codrops OnScrollLayoutFormations.
 * 
 * @example
 * useLayoutFormations(containerRef, {
 *   formations: [
 *     { columns: 1, start: 'top 80%' },
 *     { columns: 2, start: 'top 50%' },
 *     { columns: 3, start: 'top 20%' }
 *   ]
 * });
 */
export function useLayoutFormations(
  containerRef: RefObject<HTMLElement | null>,
  {
    formations,
    disabled = false,
  }: LayoutFormationsOptions,
) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || disabled || prefersReducedMotion || !formations.length) {
      return;
    }

    const context = gsap.context(() => {
      formations.forEach((formation, index) => {
        const nextFormation = formations[index + 1];
        const end = nextFormation?.start || 'bottom center';

        gsap.to(container, {
          gridTemplateColumns: `repeat(${formation.columns}, 1fr)`,
          gap: formation.gap || '1.5rem',
          duration: 0.8,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: container,
            start: formation.start,
            end,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
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
  }, [formations, disabled, prefersReducedMotion, containerRef]);
}

