import { motion, useReducedMotion } from 'framer-motion';

import { deliveryPlaybook } from '@/data/highlights';

export function DeliveryPlaybook() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="mt-24 rounded-[2.5rem] border border-neutral-200 bg-neutral-900 px-8 py-16 text-white shadow-2xl dark:border-neutral-800">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-accent">Playbook Mirage</p>
          <h2 className="text-3xl font-semibold sm:text-4xl">Pipeline de delivery orquestrado para previsibilidade.</h2>
          <p className="text-sm text-neutral-200">
            Cada fase é monitorada com indicadores claros, checkpoints executivos e artefatos acionáveis. Do discovery ao
            suporte contínuo, nossos times trabalham em ciclos curtos sem perder o rigor técnico.
          </p>
        </div>
        <div className="rounded-3xl border border-white/20 bg-white/10 px-6 py-5 text-xs uppercase tracking-[0.4em] text-white/70">
          <span className="text-white">Lead time médio: 46 dias</span>
          <div className="mt-2 text-white/60">+12 squads alocados em paralelo com governança unificada.</div>
        </div>
      </div>

      <ol className="mt-12 grid gap-6 lg:grid-cols-4">
        {deliveryPlaybook.map((stage, index) => (
          <motion.li
            key={stage.id}
            className="relative flex h-full flex-col gap-4 rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 28 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={prefersReducedMotion ? undefined : { duration: 0.6, ease: 'easeOut', delay: index * 0.08 }}
          >
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

            {index < deliveryPlaybook.length - 1 ? (
              <span className="absolute -right-3 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-gradient-to-r from-accent/40 to-transparent lg:block" aria-hidden />
            ) : null}
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
