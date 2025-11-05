// src/components/sections/CaseShowcase.tsx (MODIFICADO - Projeto Destaque)

import { motion, useReducedMotion } from 'framer-motion';
// DOCUMENTAÇÃO: Importamos o ícone de Check (✓) para o nosso checklist
import { CheckIcon } from '@heroicons/react/24/outline';
// DOCUMENTAÇÃO: Removemos 'caseStudies' e 'gsap'.

export function CaseShowcase() {
  const prefersReducedMotion = useReducedMotion();

  // DOCUMENTAÇÃO: Removemos o 'useEffect' do GSAP pois
  // agora temos uma animação 'framer-motion' mais simples.

  return (
    // DOCUMENTAÇÃO: Adicionamos o 'max-w-7xl' para centralizar
    <section className="mt-24 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
      
      {/* ==================================================================
       * DOCUMENTAÇÃO (NOVOS TÍTULOS)
       * Substituímos "Cases Reais" por "Projeto em Destaque"
       * e alinhámos o texto com a nossa estratégia 100% autêntica.
       * ================================================================== */}
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-primary">PROJETO EM DESTAQUE</p>
        <h2 className="mt-3 text-3xl font-semibold text-neutral-900 dark:text-neutral-50 sm:text-4xl">
          Nosso Código em Ação.
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-sm text-neutral-600 dark:text-neutral-300">
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
      <motion.a
        href="https://casadascamisetasoficial.com.br/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-12 grid grid-cols-1 items-center gap-8 overflow-hidden rounded-3xl border border-neutral-200 bg-white/90 p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/40 dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:border-accent/40 lg:grid-cols-2 lg:gap-16 lg:p-12"
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 50 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        
        {/* COLUNA DA ESQUERDA (A IMAGEM) */}
        <div className="overflow-hidden rounded-xl border-2 border-neutral-300 shadow-md dark:border-neutral-700">
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
            <li className="flex items-start gap-3">
              <CheckIcon className="h-5 w-5 flex-shrink-0 text-primary dark:text-accent" />
              <span className="text-sm text-neutral-700 dark:text-neutral-200">
                Plataforma de E-commerce 100% Customizada
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckIcon className="h-5 w-5 flex-shrink-0 text-primary dark:text-accent" />
              <span className="text-sm text-neutral-700 dark:text-neutral-200">
                Design Otimizado para Conversão (Mobile-First)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckIcon className="h-5 w-5 flex-shrink-0 text-primary dark:text-accent" />
              <span className="text-sm text-neutral-700 dark:text-neutral-200">
                Integração Segura com Meios de Pagamento
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckIcon className="h-5 w-5 flex-shrink-0 text-primary dark:text-accent" />
              <span className="text-sm text-neutral-700 dark:text-neutral-200">
                SEO Técnico para melhor ranking no Google
              </span>
            </li>
          </ul>
        </div>
        
      </motion.a>
    </section>
  );
}