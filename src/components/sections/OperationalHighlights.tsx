import { motion, useReducedMotion } from 'framer-motion';

import { capabilityHighlights } from '@/data/highlights';

export function OperationalHighlights() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="mt-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-primary">Operação</p>
          <h2 className="mt-3 text-3xl font-semibold text-neutral-900 dark:text-neutral-50 sm:text-4xl">
            Governança que sustenta produtos críticos diariamente.
          </h2>
        </div>
        <p className="max-w-xl text-sm text-neutral-600 dark:text-neutral-300">
          Monitoramento em tempo real, resposta a incidentes e segurança aplicada desde a discovery. Um ecossistema com
          processos maduros para manter squads enxutos e confiáveis.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-4">
        {capabilityHighlights.map((highlight, index) => (
          <motion.article
            key={highlight.id}
            className="group relative flex h-full flex-col justify-between gap-6 rounded-3xl border border-neutral-200 bg-white/90 p-6 shadow-sm transition-colors hover:border-primary/40 hover:shadow-subtle dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:border-accent/40"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={prefersReducedMotion ? undefined : { duration: 0.6, ease: 'easeOut', delay: index * 0.08 }}
          >
            <div>
              <span className="text-[0.65rem] uppercase tracking-[0.45em] text-neutral-500 dark:text-neutral-400">
                {highlight.signal}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900 transition-colors group-hover:text-primary dark:text-neutral-100 dark:group-hover:text-accent">
                {highlight.title}
              </h3>
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">{highlight.description}</p>
            </div>

            <div className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-100/60 px-4 py-3 text-xs text-neutral-600 transition group-hover:border-primary/40 group-hover:text-primary dark:border-neutral-700 dark:bg-neutral-800/40 dark:text-neutral-300 dark:group-hover:border-accent/40 dark:group-hover:text-accent">
              {highlight.detail}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
