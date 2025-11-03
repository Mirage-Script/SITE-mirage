import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { caseStudies } from '@/data/cases';
import { gsap } from '@/lib/gsap';

export function CaseShowcase() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) {
      return;
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%'
      }
    });

    timeline.fromTo(
      sectionRef.current.querySelectorAll('.case-card'),
      { y: 32, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.2
      }
    );

    return () => {
      timeline.kill();
    };
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="mt-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-primary">Cases reais</p>
          <h2 className="mt-3 text-3xl font-semibold text-neutral-900 dark:text-neutral-50 sm:text-4xl">
            Resultados mensuráveis com métricas corporativas.
          </h2>
        </div>
        <p className="max-w-xl text-sm text-neutral-600 dark:text-neutral-300">
          Projetos entregues com engenharia completa: arquitetura, código, infraestrutura e operação 24/7.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {caseStudies.map((item) => (
          <motion.article
            key={item.id}
            className="case-card flex h-full flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-10 shadow-sm transition dark:border-neutral-800 dark:bg-neutral-900"
            whileHover={{ y: -10 }}
          >
            <div>
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-neutral-500">
                <span>{item.client}</span>
                <span>Stack {item.stack.join(' · ')}</span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">{item.title}</h3>
              <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-300">{item.description}</p>

              <dl className="mt-6 grid gap-4 sm:grid-cols-3">
                {item.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl bg-neutral-100 px-4 py-3 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                    <dt>{metric.label}</dt>
                    <dd className="mt-2 text-xl font-semibold text-primary dark:text-accent">{metric.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <blockquote className="mt-8 rounded-2xl border-l-4 border-primary bg-primary/5 px-6 py-4 text-sm text-neutral-700 dark:border-accent dark:bg-accent/10 dark:text-neutral-200">
              “{item.quote}”
              <footer className="mt-4 text-xs uppercase tracking-[0.3em] text-neutral-500">
                {item.author} · {item.role}
              </footer>
            </blockquote>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
