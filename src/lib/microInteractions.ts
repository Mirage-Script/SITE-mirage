/**
 * Micro-interactions: Small, delightful animations for UI elements.
 * Built on GSAP for smooth, performant animations.
 */

import { gsap } from './gsap';
import { ANIM } from './animTokens';

export const MicroInteractions = {
  /**
   * Button press effect
   */
  buttonPress: (element: HTMLElement) => {
    gsap.to(element, {
      scale: 0.95,
      duration: ANIM.duration.xs,
      ease: ANIM.ease.in,
      yoyo: true,
      repeat: 1,
    });
  },

  /**
   * Ripple effect on click
   */
  ripple: (element: HTMLElement, event: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const size = Math.max(rect.width, rect.height);

    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = '0px';
    ripple.style.height = '0px';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    ripple.style.pointerEvents = 'none';

    element.appendChild(ripple);

    gsap.to(ripple, {
      width: size,
      height: size,
      left: x - size / 2,
      top: y - size / 2,
      opacity: 0,
      duration: ANIM.duration.md,
      ease: ANIM.ease.out,
      onComplete: () => ripple.remove(),
    });
  },

  /**
   * Shake effect (error feedback)
   */
  shake: (element: HTMLElement) => {
    gsap.to(element, {
      x: -5,
      duration: ANIM.duration.xs,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: 5,
    });
  },

  /**
   * Pulse effect (attention)
   */
  pulse: (element: HTMLElement) => {
    gsap.to(element, {
      scale: 1.1,
      duration: ANIM.duration.sm,
      ease: ANIM.ease.out,
      yoyo: true,
      repeat: 1,
    });
  },

  /**
   * Bounce effect
   */
  bounce: (element: HTMLElement) => {
    gsap.to(element, {
      y: -10,
      duration: ANIM.duration.xs,
      ease: 'power1.out',
      yoyo: true,
      repeat: 1,
    });
  },

  /**
   * Flip effect
   */
  flip: (element: HTMLElement) => {
    gsap.to(element, {
      rotateY: 360,
      duration: ANIM.duration.md,
      ease: ANIM.ease.out,
    });
  },

  /**
   * Glow effect
   */
  glow: (element: HTMLElement) => {
    gsap.to(element, {
      boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)',
      duration: ANIM.duration.sm,
      ease: ANIM.ease.out,
      yoyo: true,
      repeat: 1,
    });
  },
};

