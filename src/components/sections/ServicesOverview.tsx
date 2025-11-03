import clsx from 'clsx';
import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { services } from '@/data/services';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ANIM, prefersReducedMotion as checkReducedMotion } from '@/lib/animTokens';

export function ServicesOverview() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const framerReducedMotion = useReducedMotion();

  useEffect(() => {
    if (framerReducedMotion || checkReducedMotion() || !sectionRef.current) {
      return;
    }

    const cards = sectionRef.current.querySelectorAll('.service-card');
    const triggers: ScrollTrigger[] = [];

    cards.forEach((card, index) => {
      const tween = gsap.fromTo(
        card,
        { y: ANIM.distance.y.md, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: ANIM.duration.md,
          ease: ANIM.ease.out,
          delay: index * 0.08
        }
      );

      const trigger = ScrollTrigger.create({
        trigger: card,
        start: ANIM.scroll.start,
        animation: tween,
        once: true
      });

      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="mt-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-primary">Serviços</p>
          <h2 className="mt-3 text-3xl font-semibold text-neutral-900 dark:text-neutral-50 sm:text-4xl">
            Desenvolvimento que equilibra velocidade e governança.
          </h2>
        </div>
        <p className="max-w-2xl text-sm text-neutral-600 dark:text-neutral-300">
          Da concepção à operação, aplicamos padrões de arquitetura, testes automatizados e pipelines maduros.
          Integração contínua, observabilidade e foco em ROI desde o sprint zero.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {services.map((service) => (
          <article
            key={service.id}
            className={clsx(
              'service-card group relative flex h-full flex-col gap-6 overflow-hidden rounded-3xl border border-neutral-200 bg-white/90 p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-gradient-to-br before:from-primary/0 before:via-primary/0 before:to-accent/5 before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100 dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:border-accent/50 dark:hover:shadow-accent/20 dark:before:to-primary/10',
              service.badge ? 'ring-2 ring-primary/40 dark:ring-accent/50' : undefined
            )}
          >
            {service.badge && (
              <span className="absolute right-8 top-8 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary dark:bg-primary/20 dark:text-accent">
                {service.badge}
              </span>
            )}
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">{service.title}</h3>
            <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">{service.description}</p>

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

            <div className="flex items-center justify-between border-t border-neutral-200 pt-4 text-sm text-neutral-900 transition-colors duration-300 group-hover:text-primary dark:border-neutral-800 dark:text-neutral-100 dark:group-hover:text-accent">
              <span>Investimento</span>
              <span className="text-base font-semibold">{service.investment}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
