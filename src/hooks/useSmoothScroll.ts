// src/hooks/useSmoothScroll.ts (REVERTIDO PARA O ORIGINAL - ESTE CÓDIGO ESTÁ CORRETO)

import Lenis from 'lenis';
import { useEffect } from 'react';

import { ScrollTrigger } from '@/lib/gsap';

export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.08,
      wheelMultiplier: 1,
      lerp: 0.1,
    });

    // ==================================================================
    // DOCUMENTAÇÃO: Esta linha é a sincronização correta.
    // Ela diz ao GSAP para atualizar em cada evento de scroll do Lenis.
    // ==================================================================
    const unsubscribe = lenis.on('scroll', () => ScrollTrigger.update());

    let animationFrame: number;

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    };

    animationFrame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrame);
      unsubscribe();
      lenis.destroy();
    };
  }, [enabled]);
}