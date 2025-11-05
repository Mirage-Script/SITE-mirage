import { useReducedMotion } from 'framer-motion';
import { RefObject, useEffect } from 'react';

import { gsap, ScrollTrigger } from '@/lib/gsap';

interface SectionRevealConfig {
  targets?: string[];
  start?: string;
  end?: string;
  y?: number;
  opacity?: number;
  stagger?: number;
  duration?: number;
  ease?: string;
  once?: boolean;
  disabled?: boolean;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  scrub?: ScrollTrigger.Vars['scrub'];
}

/**
 * Scroll-driven entrance animations inspired by Codrops OnScrollLayout formations.
 * Applies a GSAP from->to reveal to provided selectors within the section.
 */
export function useSectionReveal(
  sectionRef: RefObject<HTMLElement | null>,
  {
    targets = [],
    start = 'top 80%',
    end = 'bottom center',
    y = 48,
    opacity = 0,
    stagger = 0.12,
    duration = 0.9,
    ease = 'power3.out',
    once = true,
    disabled = false,
    from,
    to,
    scrub,
  }: SectionRevealConfig = {},
) {
  const prefersReducedMotion = useReducedMotion();
  const selectorsKey = targets.join('|');

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) {
      return;
    }

    if (disabled || prefersReducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      const select = gsap.utils.selector(element);
      const nodes = selectorsKey
        ? selectorsKey.split('|').flatMap((selector) => select(selector))
        : select('*');

      if (!nodes.length) {
        return;
      }

      const animation = gsap.fromTo(
        nodes,
        from ?? { y, opacity },
        {
          y: to?.y ?? 0,
          opacity: to?.opacity ?? 1,
          duration: to?.duration ?? duration,
          stagger: to?.stagger ?? stagger,
          ease: to?.ease ?? ease,
          overwrite: 'auto',
          ...to,
          scrollTrigger: {
            trigger: element,
            start,
            end,
            once,
            scrub,
            toggleActions: once ? 'play none none none' : 'play reverse play reverse',
            ...(to?.scrollTrigger as object | undefined),
          },
        },
      );

      return () => {
        animation.kill();
      };
    }, element);

    return () => {
      context.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [disabled, ease, end, once, opacity, prefersReducedMotion, scrub, sectionRef, selectorsKey, stagger, start, y, duration, from, to]);
}
