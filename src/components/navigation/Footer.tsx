import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import { gsap } from '@/lib/gsap';

import { NewsletterForm } from '../sections/NewsletterForm';

const footerLinks = [
  {
    title: 'Empresa',
    links: [
      { label: 'Início', path: '/' },
      { label: 'Sobre', path: '/sobre' },
      { label: 'Serviços', path: '/servicos' }
    ]
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Blog', path: '/blog' },
      { label: 'Cases', path: '/sobre#cases' },
      { label: 'Contato', path: '/contato' }
    ]
  }
];

export function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!footerRef.current) {
      return;
    }

    gsap.fromTo(
      footerRef.current,
      { y: 60, opacity: 0.7 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          once: true
        }
      }
    );
  }, []);

  return (
    <footer ref={footerRef} className="relative overflow-hidden border-t border-neutral-200 bg-white px-6 pb-8 pt-16 dark:border-neutral-800 dark:bg-neutral-900 sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl motion-safe:animate-pulse-glow dark:bg-accent/10" aria-hidden />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl motion-safe:animate-pulse-glow dark:bg-primary/10" aria-hidden />
      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[2fr_1fr_1fr]">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xl font-bold uppercase tracking-[0.3em] text-primary">
            <span className="rounded-full bg-primary px-3 py-1 text-sm font-black text-white">M</span>
            Mirage
          </div>
          <p className="max-w-md text-sm text-neutral-600 dark:text-neutral-300">
            Engenharia de software end-to-end para transformar ideias em plataformas digitais sólidas. Foco em
            qualidade enterprise-grade, performance e segurança.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-300">
            <a href="tel:+5561999999999" className="flex items-center gap-2 hover:text-primary">
              <PhoneIcon className="h-4 w-4" /> +55 (61) 99999-9999
            </a>
            <a href="mailto:contato@mirage.dev" className="flex items-center gap-2 hover:text-primary">
              <EnvelopeIcon className="h-4 w-4" /> contato@mirage.dev
            </a>
            <span className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4" /> Brasília · São Paulo · Remoto
            </span>
          </div>
        </div>

        {footerLinks.map((section) => (
          <div key={section.title}>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              {section.title}
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-neutral-600 dark:text-neutral-300">
              {section.links.map((link) => (
                <li key={link.path}>
                  <NavLink to={link.path} className="transition hover:text-primary">
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <NewsletterForm />
      </div>

      <div className="mx-auto mt-12 flex w-full max-w-7xl flex-col gap-4 border-t border-neutral-200 pt-6 text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Mirage Tecnologia. Todos os direitos reservados.</p>
        <div className="flex items-center gap-4">
          <a href="https://www.linkedin.com" className="hover:text-primary" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com" className="hover:text-primary" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://www.youtube.com" className="hover:text-primary" target="_blank" rel="noreferrer">
            YouTube
          </a>
        </div>
      </div>
    </footer>
  );
}
