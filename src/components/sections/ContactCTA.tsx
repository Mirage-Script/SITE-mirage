import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import { gsap } from '@/lib/gsap';

export function ContactCTA() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    gsap.fromTo(
      sectionRef.current,
      { scale: 0.95, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true
        }
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mt-24 overflow-hidden rounded-[3rem] border border-neutral-200 bg-gradient-to-br from-primary via-primary/90 to-accent px-10 py-16 text-white shadow-2xl dark:border-neutral-800"
    >
      <motion.div
        className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-white/10 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-accent/30 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />
      <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-accent">Próximo passo</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Vamos destravar seu roadmap com engenharia confiável.
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-neutral-200">
            Montamos squads, aceleramos entregas críticas e estruturamos processos. Sessão estratégica sem custo para mapear
            o cenário atual e priorizar iniciativas.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-sm text-neutral-200">
          <NavLink
            to="/contato"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-neutral-900 shadow-subtle transition hover:bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Agendar discovery call
          </NavLink>
          <span className="text-xs uppercase tracking-[0.4em] text-neutral-400">
            SLA de resposta em até 12h úteis
          </span>
        </div>
      </div>
    </section>
  );
}
