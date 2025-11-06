import { useReducedMotion } from 'framer-motion';
import { RefObject, useEffect } from 'react';

import { gsap } from '@/lib/gsap';
import { ANIM } from '@/lib/animTokens';

interface MagneticEffectOptions {
  strength?: number;
  duration?: number;
  ease?: string;
  disabled?: boolean;
}

/**
 * Creates a magnetic effect where element follows cursor on hover.
 * Respects prefers-reduced-motion preference.
 * 
 * @example
 * const buttonRef = useRef<HTMLButtonElement>(null);
 * useMagneticEffect(buttonRef, { strength: 0.3 });
 */
export function useMagneticEffect(
  targetRef: RefObject<HTMLElement | null>,
  {
    strength = 0.3,
    duration = ANIM.duration.sm,
    ease = ANIM.ease.out,
    disabled = false,
  }: MagneticEffectOptions = {},
) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const element = targetRef.current;
    if (!element || disabled || prefersReducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      let mouseX = 0;
      let mouseY = 0;
      let elementX = 0;
      let elementY = 0;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        mouseX = e.clientX - centerX;
        mouseY = e.clientY - centerY;

        const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
        const maxDistance = Math.max(rect.width, rect.height);

        if (distance < maxDistance) {
          elementX = mouseX * strength;
          elementY = mouseY * strength;

          gsap.to(element, {
            x: elementX,
            y: elementY,
            duration,
            ease,
            overwrite: 'auto',
          });
        }
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration,
          ease,
          overwrite: 'auto',
        });
      };

      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, element);

    return () => {
      context.revert();
    };
  }, [strength, duration, ease, disabled, prefersReducedMotion, targetRef]);
}

