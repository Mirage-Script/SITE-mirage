// src/components/sections/TechMarquee.tsx (Revertido para Layout 100%)

import { useRef } from 'react';

// import { PixiMarqueeParticles } from '@/components/effects/PixiMarqueeParticles';
import { techMarqueeItems } from '@/data/highlights';
import { useSectionReveal } from '@/hooks/useSectionReveal';

export function TechMarquee() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const items = [...techMarqueeItems, ...techMarqueeItems];

  useSectionReveal(sectionRef, {
    targets: ['.tech-marquee-intro', '.marquee-item'],
    y: 64,
    stagger: 0.1,
    from: { y: 80, opacity: 0, filter: 'blur(12px)' },
    to: { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
  });

  return (
    // DOCUMENTAÇÃO: O "wrapper" de layout foi removido
    // para que a secção volte a ocupar 100% da largura.
    <section ref={sectionRef} className="mt-24">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-neutral-200 bg-white/80 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/60">
        {/* PixiMarqueeParticles removido - animação de fundo desabilitada */}
        <div className="relative z-10 p-6">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="tech-marquee-intro space-y-2">
              <p className="text-xs uppercase tracking-[0.4em] text-primary">Stack vivo</p>
              <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
                Tecnologias que rodamos todos os dias.
              </h2>
            </div>
            <p className="tech-marquee-intro max-w-md text-sm text-neutral-600 dark:text-neutral-300">
              Mais do que palavras bonitas, esta é a nossa caixa de ferramentas de produção real. Usamos estas ferramentas diariamente para construir, escalar e modernizar aplicações robustas.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/40 dark:border-neutral-700 dark:bg-neutral-900/40">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white via-white/70 to-transparent dark:from-neutral-900 dark:via-neutral-900/70"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white via-white/70 to-transparent dark:from-neutral-900 dark:via-neutral-900/70"
              aria-hidden
            />

            <div className="relative flex w-max items-center gap-4 whitespace-nowrap motion-safe:animate-marquee">
              {items.map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="marquee-item inline-flex items-center gap-2 rounded-full border border-neutral-200/80 bg-neutral-50 px-5 py-2 text-sm font-medium text-neutral-600 shadow-sm transition-colors hover:border-primary/40 hover:text-primary dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary dark:bg-accent" aria-hidden />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}