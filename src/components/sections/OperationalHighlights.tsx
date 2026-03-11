// src/components/sections/OperationalHighlights.tsx

import { CheckIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';

// ==================================================================
// * CORREÇÃO FINAL: CAMINHO RELATIVO AJUSTADO
// * O caminho correto é: '../effects/OrbitAnimation'
// ==================================================================
import logoMirage from '@/assets/logotipo.png';

import { OrbitAnimation } from '../effects/OrbitAnimation';

export function OperationalHighlights() {
  // CORREÇÃO #1: DECLARAÇÃO DOS useRef
  const sectionRef = useRef(null);
  const logoRef = useRef(null);

  return (
    <section ref={sectionRef} className="mt-24 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
      
      {/* Títulos da Secção */}
      <div className="mb-10 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-primary">OPERAÇÃO E GOVERNANÇA</p>
        <h2 className="mt-3 text-3xl font-semibold text-neutral-900 dark:text-neutral-50 sm:text-4xl">
          Engenharia de Confiança para Produtos Críticos.
        </h2>
      </div>

      {/* DOCUMENTAÇÃO */}
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
            O nosso trabalho não termina no lançamento. Na Mirage Script, continuamos monitorando seu sistema 24/7 com segurança robusta e respostas rápidas a qualquer problema. Garantimos que seu produto esteja sempre funcionando, protegido e confiável para os seus usuários.
          </p>

          {/* CHECKLIST */}
          <div className="mt-8 space-y-3">
            <div className="operational-check flex items-center gap-4 rounded-2xl border border-neutral-200/50 bg-white/50 p-4 transition-colors hover:border-primary/20 hover:bg-white dark:border-neutral-800/60 dark:bg-neutral-900/30 dark:hover:border-accent/30 dark:hover:bg-neutral-800/80">
              <CheckIcon
                className="h-5 w-5 flex-shrink-0 text-primary dark:text-accent"
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                Segurança de ponta a ponta
              </span>
            </div>
            <div className="operational-check flex items-center gap-4 rounded-2xl border border-neutral-200/50 bg-white/50 p-4 transition-colors hover:border-primary/20 hover:bg-white dark:border-neutral-800/60 dark:bg-neutral-900/30 dark:hover:border-accent/30 dark:hover:bg-neutral-800/80">
              <CheckIcon
                className="h-5 w-5 flex-shrink-0 text-primary dark:text-accent"
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                Monitoramento Ativo 24/7
              </span>
            </div>
            <div className="operational-check flex items-center gap-4 rounded-2xl border border-neutral-200/50 bg-white/50 p-4 transition-colors hover:border-primary/20 hover:bg-white dark:border-neutral-800/60 dark:bg-neutral-900/30 dark:hover:border-accent/30 dark:hover:bg-neutral-800/80">
              <CheckIcon
                className="h-5 w-5 flex-shrink-0 text-primary dark:text-accent"
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                Resposta Rápida a Incidentes
              </span>
            </div>
            <div className="operational-check flex items-center gap-4 rounded-2xl border border-neutral-200/50 bg-white/50 p-4 transition-colors hover:border-primary/20 hover:bg-white dark:border-neutral-800/60 dark:bg-neutral-900/30 dark:hover:border-accent/30 dark:hover:bg-neutral-800/80">
              <CheckIcon
                className="h-5 w-5 flex-shrink-0 text-primary dark:text-accent"
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                Entregas Ágeis e Previsíveis
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}