import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

import { Button } from '@/components/ui/Button';
import { services } from '@/data/services';

export default function ServicesPage() {
  return (
    <div className="space-y-20">
      <Helmet>
        <title>Serviços · MIRAGE</title>
        <meta
          name="description"
          content="Desenvolvimento web, mobile e software enterprise com React, Supabase, GSAP e pipelines CI/CD." />
      </Helmet>

      <header className="max-w-3xl space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-primary">Entrega full-cycle</p>
        <h1 className="text-4xl font-semibold text-neutral-900 dark:text-neutral-50">
          Operamos desde discovery até observabilidade contínua.
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Cada projeto recebe uma arquitetura desenhada sob medida, alinhada a OKRs e indicadores de negócio. Foco em
          resiliência, governança, automação e documentação viva.
        </p>
      </header>

      <section className="space-y-10">
        {services.map((service) => (
          <motion.article
            key={service.id}
            className="rounded-[2.5rem] border border-neutral-200 bg-white p-10 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
              <div className="max-w-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                    {service.title}
                  </span>
                  {service.badge && (
                    <span className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white dark:bg-neutral-100 dark:text-neutral-900">
                      {service.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">{service.description}</p>

                <ul className="grid gap-3 text-sm text-neutral-600 dark:text-neutral-300 md:grid-cols-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <aside className="flex flex-col justify-between gap-6 rounded-3xl border border-neutral-200 bg-neutral-50/70 p-6 text-sm text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800/40 dark:text-neutral-200">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-500">Deliverables</h3>
                  <ul className="mt-3 space-y-2">
                    {service.deliverables.map((deliverable) => (
                      <li key={deliverable}>{deliverable}</li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-neutral-200 pt-4 text-xs uppercase tracking-[0.4em] text-neutral-500 dark:border-neutral-700">
                  Investimento
                  <p className="mt-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">{service.investment}</p>
                </div>
                <Button variant="outline" className="justify-center">
                  Solicitar escopo detalhado
                </Button>
              </aside>
            </div>
          </motion.article>
        ))}
      </section>
    </div>
  );
}
