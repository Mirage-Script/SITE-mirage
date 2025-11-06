// src/hooks/useSmoothScroll.ts (CORRIGIDO - Sincronização GSAP + Lenis)

import Lenis from 'lenis';
import { useEffect } from 'react';

// DOCUMENTAÇÃO: Importamos o 'gsap' principal
import { gsap } from '@/lib/gsap';

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
    // DOCUMENTAÇÃO (A CORREÇÃO DEFINITIVA DA SINCRONIZAÇÃO)
    //
    // 1. Removemos a lógica antiga de 'raf' e 'lenis.on'.
    // 2. Adicionámos o 'lenis.raf' (motor do Lenis)
    //    diretamente ao 'gsap.ticker' (motor do GSAP).
    // 3. Isto força ambos a correrem no mesmo 'loop',
    //    o que é essencial para o 'scrub: true' (paralaxe) funcionar.
    // ==================================================================
    
    // Esta é a função que o GSAP vai chamar em cada 'tick' (frame)
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000); // Lenis usa milissegundos
    };

    // Adiciona o Lenis ao ticker do GSAP
    gsap.ticker.add(updateLenis);
    
    // Diz ao GSAP para não suavizar a taxa de 'ticks'
    gsap.ticker.lagSmoothing(0);

    // Função de Limpeza (Cleanup)
    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis); // Remove o 'listener' do ticker
    };
  }, [enabled]);
}