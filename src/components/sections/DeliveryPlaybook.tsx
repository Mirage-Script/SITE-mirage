// src/components/sections/DeliveryPlaybook.tsx (MODIFICADO - Novos Títulos)

import { motion, useReducedMotion } from 'framer-motion';

import { deliveryPlaybook } from '@/data/highlights';
import { ANIM } from '@/lib/animTokens';

export function DeliveryPlaybook() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="mt-24 rounded-[2.5rem] border border-neutral-200 bg-neutral-900 px-8 py-16 text-white shadow-2xl dark:border-neutral-800">
      
      {/* ==================================================================
       * DOCUMENTAÇÃO (MODIFICAÇÃO DOS TÍTULOS)
       *
       * Atualizamos o Título (h2) e a Descrição (p) principais
       * da secção para os novos textos que aprovámos.
       * A div "Lead Time" permanece removida.
       * ================================================================== */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-accent">Playbook Mirage</p>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            O Nosso Processo: Da Ideia ao Lançamento.
          </h2>
          <p className="text-sm text-neutral-200">
            Trabalhamos em ciclos curtos e transparentes. Da descoberta ao suporte contínuo,
            o nosso playbook garante que o seu projeto seja entregue com qualidade, no prazo
            e alinhado com os seus objetivos.
          </p>
        </div>
      </div>

      {/* A nossa estrutura de "Timeline Aberto" (sem cards)
        agora será preenchida com os novos dados.
      */}
      <ol className="mt-12 grid gap-6 lg:grid-cols-4">
        {deliveryPlaybook.map((stage, index) => (
          <motion.li
            key={stage.id}
            className="relative flex h-full flex-col gap-4 p-6"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: ANIM.distance.y.sm }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={prefersReducedMotion ? undefined : { duration: ANIM.duration.md, ease: 'easeOut', delay: index * 0.08 }}
          >
            {/* O conteúdo é carregado do novo array 'deliveryPlaybook' */}
            <span className="text-[0.65rem] uppercase tracking-[0.45em] text-accent/80">{stage.duration}</span>
            <h3 className="text-lg font-semibold text-white">{stage.title}</h3>
            <p className="text-sm text-neutral-200">{stage.focus}</p>
            <ul className="mt-4 space-y-2 text-sm text-neutral-100/80">
              {stage.outputs.map((output) => (
                <li key={output} className="flex items-start gap-3">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                  <span>{output}</span>
                </li>
              ))}
            </ul>

            {/* Linha de conexão */}
            {index < deliveryPlaybook.length - 1 ? (
              <span className="absolute -right-3 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-gradient-to-r from-accent/40 to-transparent lg:block" aria-hidden />
            ) : null}
          </motion.li>
        ))}
      </ol>
    </section>
  );
}