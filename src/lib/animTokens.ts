// Animation tokens: centralize easing, durations, distances, and defaults
// Keep values conservative to protect performance and motion-sickness-sensitive users

export const ANIM = {
  duration: {
    xs: 0.25,
    sm: 0.45,
    md: 0.8,
    lg: 1.2
  },
  ease: {
    in: 'power2.in',
    out: 'power3.out',
    inOut: 'power2.inOut',
    spring: 'expo.out'
  },
  distance: {
    y: {
      sm: 20,
      md: 40,
      lg: 60
    },
    x: {
      sm: 20,
      md: 40
    },
    scale: {
      subtle: 0.95
    }
  },
  scroll: {
    start: 'top 80%',
    end: 'top 50%',
    scrub: 1
  }
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
}

