import { useEffect, useRef } from 'react';

import { gsap, ScrollTrigger } from '@/lib/gsap';
import { UserCircleIcon } from '@heroicons/react/24/solid';

const testimonials = [
  {
    id: 'testimonial-1',
    quote:
      'A MIRAGE entregou não apenas código, mas uma operação completa: dashboards, runbooks e treinamentos hands-on que transformaram nossa capacidade de escalar.',
    author: 'Carlos Mendes',
    role: 'CTO',
    company: 'TechSolutions'
  },
  {
    id: 'testimonial-2',
    quote:
      'Processos maduros, visibilidade total e zero surpresas. Cada sprint review vinha com métricas claras e planos de evolução alinhados ao board.',
    author: 'Ana Silva',
    role: 'Head de Produto',
    company: 'InnovaCorp'
  },
  {
    id: 'testimonial-3',
    quote:
      'Arquitetura desenhada para crescer. Três anos depois, a base que a MIRAGE construiu ainda sustenta nossos lançamentos semanais sem downtime.',
    author: 'Roberto Alves',
    role: 'VP Engineering',
    company: 'DataStream'
  }
];

export function TestimonialsCarousel() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const cards = sectionRef.current.querySelectorAll('.testimonial-card');

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, rotateX: -15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true
          },
          delay: index * 0.15
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="mt-24">
      <div className="mb-12 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-primary">Depoimentos</p>
        <h2 className="mt-3 text-3xl font-semibold text-neutral-900 dark:text-neutral-50 sm:text-4xl">
          O que lideranças técnicas dizem sobre nós
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-neutral-600 dark:text-neutral-300">
          Feedback de CTOs, heads e VPs que confiam na MIRAGE para entregar produtos críticos de negócio.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <article
            key={testimonial.id}
            className="testimonial-card group relative flex flex-col gap-6 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-2 hover:shadow-subtle dark:border-neutral-800 dark:bg-neutral-900"
            style={{ perspective: '1000px' }}
          >
            <div className="absolute -right-4 -top-4 text-8xl opacity-10" aria-hidden>
              &ldquo;
            </div>
            <blockquote className="relative text-sm leading-relaxed text-neutral-700 dark:text-neutral-200">
              {testimonial.quote}
            </blockquote>
            <footer className="mt-auto flex items-center gap-4 border-t border-neutral-200 pt-6 dark:border-neutral-700">
              <UserCircleIcon className="h-10 w-10 text-neutral-400" aria-hidden />
              <div>
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">{testimonial.author}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  {testimonial.role} · {testimonial.company}
                </p>
              </div>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
