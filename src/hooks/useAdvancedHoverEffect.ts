import { useReducedMotion } from 'framer-motion';
import { RefObject, useEffect } from 'react';

import { gsap } from '@/lib/gsap';
import { ANIM } from '@/lib/animTokens';

interface AdvancedHoverEffectOptions {
  scale?: number;
  rotateX?: number;
  rotateY?: number;
  shadowBlur?: number;
  duration?: number;
  ease?: string;
  disabled?: boolean;
}

/**
 * Creates advanced hover effects with 3D transforms and shadows.
 * Perfect for cards and interactive elements.
 * 
 * @example
 * const cardRef = useRef<HTMLDivElement>(null);
 * useAdvancedHoverEffect(cardRef, {
 *   scale: 1.05,
 *   rotateX: 5,
 *   rotateY: 5,
 *   shadowBlur: 30
 * });
 */
export function useAdvancedHoverEffect(
  targetRef: RefObject<HTMLElement | null>,
  {
    scale = 1.05,
    rotateX = 5,
    rotateY = 5,
    shadowBlur = 30,
    duration = ANIM.duration.sm,
    ease = ANIM.ease.out,
    disabled = false,
  }: AdvancedHoverEffectOptions = {},
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

      const handleMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        mouseX = ((e.clientX - centerX) / rect.width) * rotateY;
        mouseY = ((e.clientY - centerY) / rect.height) * -rotateX;

        gsap.to(element, {
          rotateX: mouseY,
          rotateY: mouseX,
          duration,
          ease,
          overwrite: 'auto',
        });
      };

      const handleMouseEnter = () => {
        gsap.to(element, {
          scale,
          boxShadow: `0 20px ${shadowBlur}px rgba(0, 0, 0, 0.3)`,
          duration,
          ease,
          overwrite: 'auto',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          boxShadow: '0 0 0px rgba(0, 0, 0, 0)',
          duration,
          ease,
          overwrite: 'auto',
        });
      };

      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, element);

    return () => {
      context.revert();
    };
  }, [scale, rotateX, rotateY, shadowBlur, duration, ease, disabled, prefersReducedMotion, targetRef]);
}

