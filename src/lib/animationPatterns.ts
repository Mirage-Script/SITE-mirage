/**
 * Reusable animation patterns for consistent animations across the site.
 * Built on top of GSAP and animation tokens.
 */

import { ANIM } from './animTokens';

export const AnimationPatterns = {
  /**
   * Stagger reveal with adaptive delays
   */
  staggerReveal: {
    from: { y: ANIM.distance.y.md, opacity: 0, filter: 'blur(8px)' },
    to: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: ANIM.duration.md,
      ease: ANIM.ease.out,
    },
    stagger: 0.12,
  },

  /**
   * Blur reveal for text elements
   */
  blurReveal: {
    from: { opacity: 0, filter: 'blur(8px)' },
    to: {
      opacity: 1,
      filter: 'blur(0px)',
      duration: ANIM.duration.md,
      ease: ANIM.ease.out,
    },
  },

  /**
   * 3D card entrance with perspective
   */
  card3DEntrance: {
    from: {
      y: ANIM.distance.y.lg,
      opacity: 0,
      rotateX: -15,
      rotateY: 8,
      scale: 0.9,
      filter: 'blur(12px)',
    },
    to: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: ANIM.duration.lg,
      ease: ANIM.ease.out,
    },
  },

  /**
   * Subtle scale and fade
   */
  scaleReveal: {
    from: { scale: 0.95, opacity: 0 },
    to: {
      scale: 1,
      opacity: 1,
      duration: ANIM.duration.sm,
      ease: ANIM.ease.out,
    },
  },

  /**
   * Horizontal slide from left
   */
  slideInLeft: {
    from: { x: -ANIM.distance.x.md, opacity: 0 },
    to: {
      x: 0,
      opacity: 1,
      duration: ANIM.duration.md,
      ease: ANIM.ease.out,
    },
  },

  /**
   * Horizontal slide from right
   */
  slideInRight: {
    from: { x: ANIM.distance.x.md, opacity: 0 },
    to: {
      x: 0,
      opacity: 1,
      duration: ANIM.duration.md,
      ease: ANIM.ease.out,
    },
  },

  /**
   * Clip path reveal (requires clip-path CSS)
   */
  clipPathReveal: {
    from: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
    to: {
      clipPath: 'inset(0 0 0 0)',
      opacity: 1,
      duration: ANIM.duration.lg,
      ease: ANIM.ease.out,
    },
  },
};

