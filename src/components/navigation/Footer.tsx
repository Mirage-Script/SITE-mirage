// src/components/navigation/Footer.tsx (MODIFICADO - Logo Customizado e Finalizado)

import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import { gsap } from '@/lib/gsap';
// ==================================================================
// DOCUMENTAÇÃO: Importamos o logo e definimos a localização correta
// ==================================================================
import logoMirage from '@/assets/logotipo.png';

const footerLinks = [
  {
    title: 'Empresa',
    links: [
      { label: 'Início', path: '/' },
      { label: 'Sobre', path: '/sobre' },
      { label: 'Serviços', path: '/servicos' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Contato', path: '/contato' },
    ],
  },
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
          once: true,
        },
      },
    );
  }, []);

  return (
    <footer ref={footerRef} className="relative overflow-hidden border-t border-neutral-200 bg-white px-6 pb-8 pt-16 dark:border-neutral-800 dark:bg-neutral-900 sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl motion-safe:animate-pulse-glow dark:bg-accent/10" aria-hidden />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl motion-safe:animate-pulse-glow dark:bg-primary/10" aria-hidden />
      
      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[3fr_1fr_1fr]">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xl font-bold uppercase tracking-[0.3em] text-primary">
            
            {/* ==================================================================
             * DOCUMENTAÇÃO (LOGO CUSTOMIZADO)
             * Substituímos o <span>M</span> pela imagem.
             * Usamos h-14 w-14 (56px) e removemos as classes de sombra.
             * ================================================================== */}
            <img
              src={logoMirage}
              alt="Mirage Script Logo"
              width={56}
              height={56}
              className="h-14 w-14 flex-shrink-0"
            />
            Mirage SCRIPT
          </div>
          
          <p className="max-w-md text-sm text-neutral-600 dark:text-neutral-300">
            Somos uma software house de elite. Transformamos as suas ideias em produtos digitais robustos, focados em qualidade, escalabilidade e performance de nível enterprise.
          </p>
          
          {/* Contactos */}
          <div className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-300">
            <a href="tel:+5511932212697" className="flex items-center gap-2 hover:text-primary">
              <PhoneIcon className="h-4 w-4" /> +55 (11) 9.3221-2697 (Miguel)
            </a>
            <a href="tel:+5561991810148" className="flex items-center gap-2 hover:text-primary">
              <PhoneIcon className="h-4 w-4" /> +55 (61) 9.9181-0148 (Kauã)
            </a>
            <a href="mailto:contato@miragescript.com" className="flex items-center gap-2 hover:text-primary">
              <EnvelopeIcon className="h-4 w-4" /> contato@miragescript.com
            </a>
            <span className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4" /> Brasília · Recife 
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

      </div>

      <div className="mx-auto mt-12 flex w-full max-w-7xl flex-col gap-4 border-t border-neutral-200 pt-6 text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Mirage Script. Todos os direitos reservados.</p>
        
        <div className="flex items-center gap-4">
          <a href="https://github.com/Mirage-Script" className="hover:text-primary" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}