// src/components/navigation/Navbar.tsx (CORRIGIDO - Borda Branca Removida)

import {
  Bars3Icon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { gsap } from '@/lib/gsap';
import { useTheme } from '@/providers/ThemeProvider';
import logoMirage from '@/assets/logotipo.png'; // Seu logo importado

import { Button } from '../ui/Button';

// ==================================================================
// DOCUMENTAÇÃO: Removemos "Blog" para alinhar com a HomePage.
// ==================================================================
const navItems = [
  { label: 'Início', path: '/' },
  { label: 'Serviços', path: '/servicos' },
  { label: 'Sobre', path: '/sobre' },
  // { label: 'Blog', path: '/blog' } // <-- REMOVIDO
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const navListRef = useRef<HTMLUListElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!logoRef.current || prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'back.out(1.6)' },
      );
    }, logoRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!navListRef.current || prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.nav-item');

      if (!items.length) {
        return;
      }

      gsap.fromTo(
        items,
        { y: -16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.08,
          delay: 0.2,
        },
      );
    }, navListRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        isScrolled
          ? 'bg-white/90 shadow-lg shadow-primary/5 backdrop-blur dark:bg-neutral-900/90'
          : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
        
        {/* ==================================================================
         * DOCUMENTAÇÃO (A CORREÇÃO)
         * Adicionámos "outline-none" ao NavLink para remover
         * a borda branca (anel de foco) que aparece no link ativo.
         * ================================================================== */}
        <NavLink to="/" className="group flex items-center gap-2 text-lg font-bold outline-none focus:outline-none focus-visible:outline-none">
          <div ref={logoRef} className="flex items-center gap-2">
            
            <img
              src={logoMirage}
              alt="Mirage Script Logo"
              width={56}
              height={56}
              className="h-14 w-14 flex-shrink-0 transition-all duration-300" 
            />
            {/* Adicionámos "SCRIPT" ao nome */}
            <span className="uppercase tracking-[0.25em] text-neutral-700 transition-colors duration-300 group-hover:text-primary dark:text-neutral-100 dark:group-hover:text-accent">
              MIRAGE SCRIPT
            </span>
          </div>
        </NavLink>

        <div className="hidden items-center gap-8 lg:flex">
          <ul ref={navListRef} className="flex items-center gap-6 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.path} className="nav-item">
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }: { isActive: boolean }) =>
                    clsx(
                      'relative transition-colors hover:text-primary dark:hover:text-accent',
                      isActive
                        ? 'text-primary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-primary'
                        : 'text-neutral-600 dark:text-neutral-300',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={toggleTheme} aria-label="Alternar tema">
              {theme === 'dark' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            </Button>
            <NavLink to="/contato" className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-subtle transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              Iniciar Projeto
            </NavLink>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button variant="outline" size="sm" onClick={toggleTheme} aria-label="Alternar tema">
            {theme === 'dark' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
          </Button>
          <button
            type="button"
            aria-label="Abrir menu"
            className="rounded-full p-2 text-neutral-600 transition hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary dark:text-neutral-200 dark:hover:bg-neutral-800"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="lg:hidden">
          <div className="border-t border-neutral-100 bg-white px-6 py-6 shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
            <ul className="flex flex-col gap-4 text-sm font-medium">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }: { isActive: boolean }) =>
                      clsx(
                        'block rounded-lg px-4 py-2 transition-all hover:bg-neutral-100 dark:hover:bg-neutral-800',
                        isActive
                          ? 'bg-neutral-100 text-primary dark:bg-neutral-800 dark:text-accent'
                          : 'text-neutral-700 dark:text-neutral-200',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <NavLink
              to="/contato"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-subtle transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Iniciar Projeto
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}