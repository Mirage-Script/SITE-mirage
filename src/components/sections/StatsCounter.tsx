import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { gsap, ScrollTrigger } from '@/lib/gsap';
import { BuildingOffice2Icon, UsersIcon, ChartBarIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

const stats = [
  { label: 'Clientes enterprise ativos', value: '42+', Icon: BuildingOffice2Icon },
  { label: 'Colaboradores técnicos', value: '120+', Icon: UsersIcon },
  { label: 'Horas de code review/semana', value: '1.8k', Icon: ChartBarIcon },
  { label: 'Squads simultâneos', value: '12', Icon: RocketLaunchIcon }
];

export function StatsCounter() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const counters = sectionRef.current.querySelectorAll('.stat-value');

    const localTriggers: ScrollTrigger[] = [];

    counters.forEach((counter) => {
      const target = counter.getAttribute('data-target');
      if (!target) return;

      const isNumeric = /^\d+(\.\d+)?$/.test(target.replace(/[+k]/g, ''));
      if (!isNumeric) return;

      const numericTarget = parseFloat(target.replace(/[+k]/g, ''));
      const suffix = target.includes('+') ? '+' : target.includes('k') ? 'k' : '';

      const trig = ScrollTrigger.create({
        trigger: counter,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            textContent: numericTarget,
            duration: 2.0,
            ease: 'power2.out',
            snap: { textContent: 0.1 },
            onUpdate() {
              const currentValue = parseFloat(counter.textContent ?? '0');
              counter.textContent = currentValue.toFixed(1).replace('.0', '') + suffix;
            }
          });
        }
      });
      localTriggers.push(trig);
    });

    return () => {
      localTriggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="mt-24">
      <div className="rounded-[2.5rem] border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-12 shadow-subtle dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-800">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">Operação em números</p>
          <h2 className="mt-3 text-3xl font-semibold text-neutral-900 dark:text-neutral-50 sm:text-4xl">
            Escala validada por clientes enterprise
          </h2>
        </div>

        <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="group flex flex-col items-center gap-4 rounded-3xl border border-neutral-200 bg-white p-8 text-center shadow-sm transition-all hover:scale-105 hover:shadow-subtle dark:border-neutral-700 dark:bg-neutral-900"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
            >
              <stat.Icon className="h-12 w-12 text-primary dark:text-accent" aria-hidden />
              <dd
                className="stat-value text-4xl font-bold text-primary transition-colors group-hover:text-accent dark:text-accent dark:group-hover:text-primary"
                data-target={stat.value}
              >
                0
              </dd>
              <dt className="text-sm text-neutral-600 dark:text-neutral-300">{stat.label}</dt>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
