import { useEffect, useRef } from 'react';

import { gsap, ScrollTrigger } from '@/lib/gsap';

const partners = [
  { id: 1, name: 'TechCorp', logo: '🏢' },
  { id: 2, name: 'InnovateLab', logo: '🚀' },
  { id: 3, name: 'DataStream', logo: '📊' },
  { id: 4, name: 'CloudNine', logo: '☁️' },
  { id: 5, name: 'SecureVault', logo: '🔐' },
  { id: 6, name: 'AIFlow', logo: '🤖' },
  { id: 7, name: 'DevOpsHub', logo: '⚙️' },
  { id: 8, name: 'CodeFactory', logo: '💻' }
];

export function PartnersShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const logos = sectionRef.current.querySelectorAll('.partner-logo');

    logos.forEach((logo, index) => {
      gsap.fromTo(
        logo,
        { opacity: 0, scale: 0.8, rotateY: -90 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: logo,
            start: 'top 85%',
            once: true
          },
          delay: index * 0.08
        }
      );

      ScrollTrigger.create({
        trigger: logo,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => {
          gsap.to(logo, {
            y: -10,
            duration: 2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
          });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="mt-24">
      <div className="rounded-[2.5rem] border border-neutral-200 bg-white p-12 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">Ecossistema</p>
          <h2 className="mt-3 text-2xl font-semibold text-neutral-900 dark:text-neutral-50 sm:text-3xl">
            Confiança de marcas enterprise e scale-ups
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="partner-logo group flex flex-col items-center justify-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 transition-all hover:scale-110 hover:border-primary/40 hover:shadow-subtle dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-accent/40"
              style={{ perspective: '1000px' }}
            >
              <span className="text-4xl transition-transform group-hover:scale-125" aria-hidden>
                {partner.logo}
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
