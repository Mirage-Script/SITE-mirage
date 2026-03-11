// src/components/sections/DeliveryPlaybook.tsx (MODIFICADO - Novos Títulos)

import { useRef } from 'react';

import { deliveryPlaybook } from '@/data/highlights';
import { useSectionReveal } from '@/hooks/useSectionReveal';

export function DeliveryPlaybook() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useSectionReveal(sectionRef, {
    targets: ['.playbook-badge', '.playbook-title', '.playbook-copy'],
    y: 36,
    stagger: 0.14,
  });

  useSectionReveal(sectionRef, {
    targets: ['.playbook-stage'],
    y: 80,
    stagger: 0.12,
    once: false,
    from: { y: 72, opacity: 0, rotateX: -12, transformPerspective: 1200 },
    to: { y: 0, opacity: 1, rotateX: 0, transformPerspective: 1200, duration: 1, ease: 'power4.out' },
  });

  return (
    <section ref={sectionRef} className="mt-24 rounded-[2.5rem] border border-neutral-200 bg-neutral-900 px-8 py-16 text-white shadow-2xl dark:border-neutral-800">
      
      {/* ==================================================================
       * DOCUMENTAÇÃO (MODIFICAÇÃO DOS TÍTULOS)
       *
       * Atualizamos o Título (h2) e a Descrição (p) principais
       * da secção para os novos textos que aprovámos.
       * A div "Lead Time" permanece removida.
       * ================================================================== */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl space-y-4">
          <p className="playbook-badge text-xs uppercase tracking-[0.4em] text-accent">Playbook Mirage</p>
          <h2 className="playbook-title text-3xl font-semibold sm:text-4xl">
            O Nosso Processo: Da Ideia ao Lançamento.
          </h2>
          <p className="playbook-copy text-sm text-neutral-200">
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
          <li
            key={stage.id}
            className="playbook-stage group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950/40 p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-accent/40 hover:bg-neutral-900/80 hover:shadow-xl hover:shadow-accent/5"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-gradient-to-br from-accent/0 via-accent/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
            <span className="text-[0.65rem] uppercase tracking-[0.45em] text-accent/80 transition-colors group-hover:text-accent">{stage.duration}</span>
            <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-accent">{stage.title}</h3>
            <p className="text-sm text-neutral-300">{stage.focus}</p>
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
          </li>
        ))}
      </ol>
    </section>
  );
}