// src/components/sections/ServicesOverview.tsx (Correção Final de Layout)

import clsx from 'clsx';
import { useRef } from 'react';

import { services } from '@/data/services';
import { useSectionReveal } from '@/hooks/useSectionReveal';

import { MagneticButton } from '../effects/MagneticButton';
import { Button } from '../ui/Button';

export function ServicesOverview() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useSectionReveal(sectionRef, {
    targets: ['.services-badge', '.services-title', '.services-intro'],
    y: 36,
    stagger: 0.16,
  });

  useSectionReveal(sectionRef, {
    targets: ['.service-card'],
    y: 72,
    stagger: 0.12,
    once: false,
    from: { y: 72, opacity: 0, rotateX: -6 },
    to: { y: 0, opacity: 1, rotateX: 0, duration: 1, ease: 'power3.out' },
  });

  // ==================================================================
  // DOCUMENTAÇÃO (CORREÇÃO 1: CARDS "FINOS")
  //
  // Removi "max-w-screen-2xl" e "mx-auto" desta <section>.
  // A secção agora ocupa 100% da largura, permitindo que os 4 cards
  // fiquem lado a lado e ocupem mais espaço.
  // ==================================================================
  return (
    <section ref={sectionRef} className="mt-24 px-6 sm:px-10 lg:px-16">
      <div className="services-heading flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="services-badge text-xs uppercase tracking-[0.4em] text-primary">Serviços</p>
          <h2 className="services-title mt-3 text-3xl font-semibold text-neutral-900 dark:text-neutral-50 sm:text-4xl">
            Soluções de Software de Ponta a Ponta.
          </h2>
        </div>
        <p className="services-intro max-w-2xl text-sm text-neutral-600 dark:text-neutral-300">
          Cobrimos o ciclo de vida completo do seu produto. Da arquitetura inicial ao lançamento final, o nosso processo garante uma solução robusta, segura e focada no retorno do seu investimento.
        </p>
      </div>

      {/* Mantivemos as classes "2xl:grid-cols-4" para 4 colunas lado a lado */}
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {services.map((service) => (
          <article
            key={service.id}
            className={clsx(
              'service-card group relative flex h-full flex-col gap-6 overflow-hidden rounded-3xl border border-neutral-200 bg-white/90 p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-gradient-to-br before:from-primary/0 before:via-primary/0 before:to-accent/5 before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100 dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:border-accent/50 dark:hover:shadow-accent/20 dark:before:to-primary/10',
              service.badge ? 'ring-2 ring-primary/40 dark:ring-accent/50' : undefined,
            )}
          >
            {/* ==================================================================
             * DOCUMENTAÇÃO (CORREÇÃO 2: TAG SOBREPOSTA)
             *
             * Criei um wrapper <div flex> para o título e a tag.
             * O <h3> (título) e o <span> (tag) agora são
             * items de um flexbox, o que impede a sobreposição.
             * ================================================================== */}
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                {service.title}
              </h3>
              {service.badge && (
                <span className="flex-shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary dark:bg-primary/20 dark:text-accent">
                  {service.badge}
                </span>
              )}
            </div>

            <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
              {service.description}
            </p>

            <div className="mt-2 space-y-3 text-sm text-neutral-600 dark:text-neutral-300">
              {service.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-neutral-100 px-4 py-3 text-xs font-medium uppercase tracking-widest text-neutral-600 transition-colors group-hover:bg-primary/10 group-hover:text-primary dark:bg-neutral-800 dark:text-neutral-300 dark:group-hover:bg-accent/10 dark:group-hover:text-accent">
              Entregas: {service.deliverables.join(' · ')}
            </div>

            <div className="mt-auto border-t border-neutral-200 pt-4 dark:border-neutral-800">
              <MagneticButton strength={0.2} className="w-full">
                <Button
                  variant="ghost"
                  className="w-full border border-neutral-300/80 bg-transparent text-neutral-800 hover:bg-neutral-100/70 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800/70"
                >
                  Solicite um Orçamento
                </Button>
              </MagneticButton>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}