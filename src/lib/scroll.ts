import { ANIM, prefersReducedMotion } from './animTokens';
import { ScrollTrigger } from './gsap';

interface LenisController {
  on(event: 'scroll', handler: (event: unknown) => void): (() => void) | undefined;
  raf(time: number): void;
  destroy(): void;
}

// Helper to wire Lenis scroll with ScrollTrigger in one place if needed elsewhere
export function bindLenisToScrollTrigger(lenis: LenisController) {
  const off = lenis.on('scroll', () => ScrollTrigger.update());
  let rafId: number;
  const raf = (time: number) => {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  return () => {
    cancelAnimationFrame(rafId);
    off?.();
    lenis.destroy();
  };
}

export type RevealOptions = {
  start?: string;
  end?: string;
  scrub?: number | boolean;
  y?: number;
  scale?: number;
  duration?: number;
  ease?: string;
  once?: boolean;
};

// Compute defaults honoring prefers-reduced-motion
export function revealDefaults(): Required<Pick<RevealOptions, 'start' | 'end' | 'scrub' | 'y' | 'scale' | 'duration' | 'ease' | 'once'>> {
  const reduced = prefersReducedMotion();
  return {
    start: ANIM.scroll.start,
    end: ANIM.scroll.end,
    scrub: reduced ? false : ANIM.scroll.scrub,
    y: reduced ? 0 : ANIM.distance.y.lg,
    scale: reduced ? 1 : ANIM.distance.scale.subtle,
    duration: reduced ? ANIM.duration.xs : ANIM.duration.lg,
    ease: ANIM.ease.out,
    once: false
  };
}

