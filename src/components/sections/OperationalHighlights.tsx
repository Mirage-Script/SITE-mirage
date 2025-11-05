// src/components/sections/OperationalHighlights.tsx (MODIFICADO - Mais Margem Acima da Animação)

import { CheckIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';

import logoMirage from '@/assets/logotipo.png';

export function OperationalHighlights() {
  return (
    <section ref={sectionRef} className="mt-24 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
      
      {/* Títulos da Secção */}
      <div className="mb-10 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-primary">OPERAÇÃO E GOVERNANÇA</p>
        <h2 className="mt-3 text-3xl font-semibold text-neutral-900 dark:text-neutral-50 sm:text-4xl">
          Engenharia de Confiança para Produtos Críticos.
        </h2>
      </div>

      {/* ==================================================================
       * DOCUMENTAÇÃO (A CORREÇÃO)
       *
       * Aumentámos a margem superior de "mt-16" (4rem) para "mt-32" (8rem).
       * Isto empurra a secção da animação para baixo,
       * dando mais espaço para os títulos.
       * ================================================================== */}
      <div className="mt-32 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        
        {/* COLUNA DA ESQUERDA (O VISUAL) */}
        <div className="relative flex items-center justify-center h-96">
          
          {/* O SEU LOGO (NA FRENTE) */}
          <img
            ref={logoRef}
            src={logoMirage}
            alt="Logotipo da Mirage Script"
            className="relative z-10 h-auto w-full max-w-sm"
            width={384} 
            height={384}
          />

          {/* A ANIMAÇÃO (POR TRÁS) */}
          <OrbitAnimation />

        </div>

        {/* COLUNA DA DIREITA (O CONTEÚDO) */}
        <div>
          <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            A Nossa Garantia de Performance
          </h3>
          <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-300">
            O nosso trabalho não termina no *deploy*. Na Mirage Script, &lsquo;Governança&rsquo; significa que
            garantimos a saúde do seu produto com um ecossistema robusto de segurança e
            monitoramento 24/7. Aplicamos processos de resposta a incidentes e um *delivery* ágil
            para que o seu sistema esteja sempre online, seguro e confiável.
          </p>

          {/* CHECKLIST */}
          <div className="mt-8 space-y-4">
            <div className="operational-check flex items-start gap-3">
              <CheckIcon
                className="h-5 w-5 flex-shrink-0 text-primary dark:text-accent"
                aria-hidden="true"
              />
              <span className="text-sm text-neutral-700 dark:text-neutral-200">
                Segurança de ponta a ponta
              </span>
            </div>
            <div className="operational-check flex items-start gap-3">
              <CheckIcon
                className="h-5 w-5 flex-shrink-0 text-primary dark:text-accent"
                aria-hidden="true"
              />
              <span className="text-sm text-neutral-700 dark:text-neutral-200">
                Monitoramento Ativo 24/7
              </span>
            </div>
            <div className="operational-check flex items-start gap-3">
              <CheckIcon
                className="h-5 w-5 flex-shrink-0 text-primary dark:text-accent"
                aria-hidden="true"
              />
              <span className="text-sm text-neutral-700 dark:text-neutral-200">
                Resposta Rápida a Incidentes
              </span>
            </div>
            <div className="operational-check flex items-start gap-3">
              <CheckIcon
                className="h-5 w-5 flex-shrink-0 text-primary dark:text-accent"
                aria-hidden="true"
              />
              <span className="text-sm text-neutral-700 dark:text-neutral-200">
                Entregas Ágeis e Previsíveis (CI/CD)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}