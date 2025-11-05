// src/components/sections/CaseShowcase.tsx (MODIFICADO - Projeto Destaque)

import { CheckIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';

import { useScrollParallax } from '@/hooks/useScrollParallax';
import { useSectionReveal } from '@/hooks/useSectionReveal';

export function CaseShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const artworkRef = useRef<HTMLDivElement | null>(null);

  useSectionReveal(sectionRef, {
    targets: ['.case-badge', '.case-title', '.case-lead'],
    y: 40,
    stagger: 0.12,
  });

  useSectionReveal(sectionRef, {
    targets: ['.case-banner'],
    y: 64,
    stagger: 0.12,
    from: { y: 80, opacity: 0, rotateX: -8, transformPerspective: 1000, filter: 'blur(8px)' },
    to: { y: 0, opacity: 1, rotateX: 0, transformPerspective: 1000, filter: 'blur(0px)', duration: 1.1, ease: 'power4.out' },
  });

  useSectionReveal(sectionRef, {
    targets: ['.case-point'],
    y: 32,
    stagger: 0.1,
    once: false,
    from: { y: 24, opacity: 0, x: -12 },
    to: { y: 0, opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
  });

  useScrollParallax(artworkRef, {
    intensity: 110,
    scrub: 1.1,
    ease: 'power2.out',
  });

  return (
    // DOCUMENTAÇÃO: Adicionamos o 'max-w-7xl' para centralizar
    <section ref={sectionRef} className="mt-24 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
      
      {/* ==================================================================
       * DOCUMENTAÇÃO (NOVOS TÍTULOS)
       * Substituímos "Cases Reais" por "Projeto em Destaque"
       * e alinhámos o texto com a nossa estratégia 100% autêntica.
       * ================================================================== */}
      <div className="text-center">
        <p className="case-badge text-xs uppercase tracking-[0.4em] text-primary">PROJETO EM DESTAQUE</p>
        <h2 className="case-title mt-3 text-3xl font-semibold text-neutral-900 dark:text-neutral-50 sm:text-4xl">
          Nosso Código em Ação.
        </h2>
        <p className="case-lead mt-4 mx-auto max-w-2xl text-sm text-neutral-600 dark:text-neutral-300">
          Acreditamos que o código fala por si.
          Este é um projeto de e-commerce de alta performance construído do zero, demonstrando a nossa expertise em arquitetura e experiência do usuário.
        </p>
      </div>

      {/* ==================================================================
       * DOCUMENTAÇÃO (O NOVO "BANNER")
       *
       * 1. Removemos o .map() e os 3 cards falsos.
       * 2. Criámos um único 'motion.a' (um link animado) que
       * "embrulha" o nosso banner inteiro, como você sugeriu.
       * 3. O 'href' aponta para o site real.
       * ================================================================== */}
      <a
        href="https://casadascamisetasoficial.com.br/"
        target="_blank"
        rel="noopener noreferrer"
        className="case-banner mt-12 grid grid-cols-1 items-center gap-8 overflow-hidden rounded-3xl border border-neutral-200 bg-white/90 p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/40 dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:border-accent/40 lg:grid-cols-2 lg:gap-16 lg:p-12"
      >

        {/* COLUNA DA ESQUERDA (A IMAGEM) */}
        <div
          ref={artworkRef}
          className="overflow-hidden rounded-xl border-2 border-neutral-300 shadow-md dark:border-neutral-700"
        >
          <img
            // DOCUMENTAÇÃO: Verifique se este é o caminho para a sua screenshot!
            src="/images/casadascamisetas.png"
            alt="Screenshot do site Casa das Camisetas Oficial"
            className="h-auto w-full object-cover"
            width={1200}
            height={900}
          />
        </div>

        {/* COLUNA DA DIREITA (O TEXTO) */}
        <div>
          <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            Casa das Camisetas Oficial
          </h3>
          <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-300">
            Construído do zero uma plataforma de e-commerce de alta performance, focada na
            otimização para dispositivos móveis e numa experiência de checkout fluida.
          </p>

          {/* CHECKLIST (PROVA REAL) */}
          <ul className="mt-6 space-y-3">
            <li className="case-point flex items-start gap-3">
              <CheckIcon className="h-5 w-5 flex-shrink-0 text-primary dark:text-accent" />
              <span className="text-sm text-neutral-700 dark:text-neutral-200">
                Plataforma de E-commerce 100% Customizada
              </span>
            </li>
            <li className="case-point flex items-start gap-3">
              <CheckIcon className="h-5 w-5 flex-shrink-0 text-primary dark:text-accent" />
              <span className="text-sm text-neutral-700 dark:text-neutral-200">
                Design Otimizado para Conversão (Mobile-First)
              </span>
            </li>
            <li className="case-point flex items-start gap-3">
              <CheckIcon className="h-5 w-5 flex-shrink-0 text-primary dark:text-accent" />
              <span className="text-sm text-neutral-700 dark:text-neutral-200">
                Integração Segura com Meios de Pagamento
              </span>
            </li>
            <li className="case-point flex items-start gap-3">
              <CheckIcon className="h-5 w-5 flex-shrink-0 text-primary dark:text-accent" />
              <span className="text-sm text-neutral-700 dark:text-neutral-200">
                SEO Técnico para melhor ranking no Google
              </span>
            </li>
          </ul>
        </div>

      </a>
    </section>
  );
}