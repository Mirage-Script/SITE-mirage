// Ficheiro: src/components/sections/HeroSection.tsx (CORRIGIDO)

import { useReducedMotion } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import Typed from 'typed.js';

import { CounterCard } from '@/components/effects/CounterCard';
import { MagneticButton } from '@/components/effects/MagneticButton';
import { ShaderAurora } from '@/components/effects/ShaderAurora';
import { TextScramble, type TextScrambleHandle } from '@/components/effects/TextScramble';
import { useScrollParallax } from '@/hooks/useScrollParallax';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { ANIM } from '@/lib/animTokens';
import { gsap, useGsapTimeline } from '@/lib/gsap';

import { Button } from '../ui/Button';
// O import para a nova animação de partículas (já estava correto no teu código)
import LogoParticleAnimation from './LogoParticleAnimation';

// Passo Crucial: Registrar o plugin GSAP antes de ser usado
gsap.registerPlugin(ScrollTrigger);

const HEADLINE_ROTATIONS = [
  'Desenvolvimento Web de Alta Performance',
  'Aplicações Mobile Nativas e Híbridas',
  'Software e Sistemas Escaláveis',
];

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const typedElementRef = useRef<HTMLSpanElement | null>(null);
  const typedInstance = useRef<Typed | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const primaryCtaRef = useRef<TextScrambleHandle | null>(null);
  const secondaryCtaRef = useRef<TextScrambleHandle | null>(null);
  const auroraWrapperRef = useRef<HTMLDivElement | null>(null);
  const blurLeftRef = useRef<HTMLDivElement | null>(null);
  const blurRightRef = useRef<HTMLDivElement | null>(null);
  const processGridRef = useRef<HTMLDivElement | null>(null);
  const serviceColumnRef = useRef<HTMLDivElement | null>(null);

  // ... (Todos os teus hooks: useEffect, useGsapTimeline, useSectionReveal, useScrollParallax) ...
  // ... (Estes permanecem exatamente iguais) ...

  useEffect(() => {
    if (prefersReducedMotion) {
      typedInstance.current?.destroy();
      typedInstance.current = null;
      if (typedElementRef.current) {
        typedElementRef.current.textContent = HEADLINE_ROTATIONS[0];
      }
      return;
    }
    if (!typedElementRef.current) {
      return;
    }
    typedElementRef.current.textContent = HEADLINE_ROTATIONS[0];
    typedInstance.current = new Typed(typedElementRef.current, {
      strings: HEADLINE_ROTATIONS,
      typeSpeed: 42,
      backSpeed: 24,
      backDelay: 2200,
      smartBackspace: true,
      loop: true,
      showCursor: false,
    });
    return () => {
      typedInstance.current?.destroy();
      typedInstance.current = null;
    };
  }, [prefersReducedMotion]);

  useGsapTimeline(
    (context) => {
      if (prefersReducedMotion || !headingRef.current) {
        return;
      }
      const splitHeading = new SplitType(headingRef.current, {
        types: 'lines,words,chars',
      });
      splitHeading.lines?.forEach((line) => {
        line.style.overflow = 'hidden';
      });
      gsap.set(splitHeading.chars, {
        display: 'inline-block',
        transformOrigin: '50% 100%',
      });
      const timeline = gsap.timeline();
      timeline.from(splitHeading.chars, {
        yPercent: 110,
        opacity: 0,
        rotateX: -90,
        duration: ANIM.duration.lg,
        ease: ANIM.ease.out,
        stagger: { each: 0.015, from: 'random' },
      });
      timeline.from(
        '.hero-subline',
        {
          y: ANIM.distance.y.sm,
          opacity: 0,
          duration: ANIM.duration.md,
          ease: ANIM.ease.out,
        },
        '-=0.6',
      );
      timeline.from(
        '.hero-stats',
        {
          y: ANIM.distance.y.sm,
          opacity: 0,
          duration: ANIM.duration.lg,
          ease: ANIM.ease.out,
          stagger: 0.12,
        },
        '-=0.4',
      );
      context.add(() => {
        timeline.kill();
        splitHeading.revert();
      });
    },
    [prefersReducedMotion],
    sectionRef,
  );

  useSectionReveal(sectionRef, {
    targets: ['.hero-stat-block'],
    start: 'top 85%',
    from: { y: 32, opacity: 0, filter: 'blur(6px)' },
    to: { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' },
    stagger: 0.08,
  });

  useSectionReveal(sectionRef, {
    targets: ['.hero-process-card'],
    start: 'top 85%',
    from: {
      y: 48,
      opacity: 0,
      rotateZ: -4,
      skewY: 3,
      filter: 'blur(10px)',
    },
    to: {
      y: 0,
      opacity: 1,
      rotateZ: 0,
      skewY: 0,
      filter: 'blur(0px)',
      duration: 0.95,
      ease: 'power3.out',
    },
    stagger: 0.1,
  });

  useSectionReveal(sectionRef, {
    targets: ['.hero-service-card'],
    start: 'top 85%',
    from: {
      y: 72,
      opacity: 0,
      rotateX: -18,
      rotateY: 8,
      scale: 0.9,
      filter: 'blur(14px)',
    },
    to: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 1.05,
      ease: 'power3.out',
    },
    stagger: 0.16,
  });

  useScrollParallax(auroraWrapperRef, {
    intensity: 140,
    scrub: 0.85,
  });

  useScrollParallax(blurLeftRef, {
    intensity: 120,
    scrub: 0.9,
  });

  useScrollParallax(blurRightRef, {
    intensity: 160,
    scrub: 0.95,
  });

  useScrollParallax(processGridRef, {
    intensity: 60,
    scrub: 0.8,
    start: 'top bottom',
    end: 'bottom 45%',
  });

  useScrollParallax(serviceColumnRef, {
    intensity: 90,
    scrub: 0.85,
    start: 'top 90%',
    end: 'bottom top',
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden rounded-[3rem] bg-neutral-900 px-8 py-24 text-white shadow-2xl"
    >
      {/* ==================================================================
       * DOCUMENTAÇÃO (FUNDOS)
       * Estes são os teus elementos de fundo estáticos e com parallax.
       * ================================================================== */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(74,123,167,0.45),transparent_60%)]" aria-hidden />
      <div className="absolute inset-y-0 left-0 w-1/2 bg-[radial-gradient(circle_at_left,rgba(15,58,102,0.35),transparent_70%)]" aria-hidden />

      {/* Nossos Alvos de Parallax (Fundo) */}
      <div ref={auroraWrapperRef} className="pointer-events-none absolute inset-0" aria-hidden>
        <ShaderAurora className="hero-parallax-bg absolute inset-0 mix-blend-screen opacity-80" />
      </div>
      <div
        ref={blurLeftRef}
        className="hero-blur-circle-1 pointer-events-none absolute -left-20 top-24 h-64 w-64 rounded-full bg-primary/40 blur-3xl motion-safe:animate-pulse-glow"
        aria-hidden
      />
      <div
        ref={blurRightRef}
        className="hero-blur-circle-2 pointer-events-none absolute -bottom-10 right-[-6rem] h-80 w-80 rounded-full bg-accent/30 blur-3xl motion-safe:animate-pulse-glow"
        aria-hidden
      />

      {/* ==================================================================
       * <<< A NOSSA MODIFICAÇÃO >>>
       * Aqui substituímos o <HeroAnimation /> (scroll de texto)
       * pelo <LogoParticleAnimation /> (partículas do logo)
       * que criámos no passo anterior.
       * ================================================================== */}
      <LogoParticleAnimation />

      {/* O Conteúdo (agora com a classe 'hero-content-grid') */}
      <div className="hero-content-grid relative grid gap-10 lg:grid-cols-[3fr_2fr]">
        
        {/* Coluna da Esquerda (Conteúdo) */}
        <div>
          <p className="text-sm uppercase tracking-[0.5em] text-neutral-400">
            Soluções Digitais Sob Medida
          </p>
          <h1
            ref={headingRef}
            className="hero-heading mt-6 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Mirage Script
          </h1>
          <div className="hero-subline mt-5 min-h-[2.5rem] overflow-hidden text-lg font-medium text-accent">
            {prefersReducedMotion ? (
              <span className="block">{HEADLINE_ROTATIONS[0]}</span>
            ) : (
              <span ref={typedElementRef} className="block" />
            )}
          </div>
          <p className="mt-6 max-w-xl text-neutral-200">
            Transformamos os seus desafios de negócio em software robusto,
            performático e escalável. Entregamos produtos Web, Mobile e Software com código
            limpo e design focado no utilizador.
          </p>

          {/* Botões (CTAs) */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <div className="relative z-10 transition-all duration-200 ease-out hover:z-20">
              <MagneticButton strength={0.3}>
                <Button
                  size="lg"
                  variant="ghost"
                  className="border border-white/30 bg-transparent text-white hover:bg-white/10"
                  aria-label="Agende uma Reunião"
                  onMouseEnter={() => primaryCtaRef.current?.play()}
                  onFocus={() => primaryCtaRef.current?.play()}
                >
                  <span className="sr-only">Agende uma Reunião</span>
                  <TextScramble
                    ref={primaryCtaRef}
                    text="Agende uma Reunião"
                    className="uppercase tracking-[0.35em]"
                  />
                </Button>
              </MagneticButton>
            </div>
            <div className="relative z-10 transition-all duration-200 ease-out hover:z-20">
              <MagneticButton strength={0.3}>
                <Button
                  size="lg"
                  variant="ghost"
                  className="border border-white/30 bg-transparent text-white hover:bg-white/10"
                  aria-label="Conheça Nossos Projetos"
                  onMouseEnter={() => secondaryCtaRef.current?.play()}
                  onFocus={() => secondaryCtaRef.current?.play()}
                >
                  <span className="sr-only">Conheça Nossos Projetos</span>
                  <TextScramble
                    ref={secondaryCtaRef}
                    text="Conheça Nossos Projetos"
                    className="uppercase tracking-[0.35em]"
                  />
                </Button>
              </MagneticButton>
            </div>
          </div>

          {/* Estatísticas (Prova Social) */}
          <dl className="hero-stats mt-12 grid gap-6 text-sm sm:grid-cols-3">
            <CounterCard
              label="Deploys assistidos por IA"
              value={42}
              className="hero-stat-block"
              labelClassName="text-neutral-400 text-sm"
              valueClassName="mt-1 text-2xl font-semibold text-neutral-900 dark:text-neutral-50"
            />
            <CounterCard
              label="Plataformas escaladas"
              value={80}
              suffix="+"
              className="hero-stat-block"
              labelClassName="text-neutral-400 text-sm"
              valueClassName="mt-1 text-2xl font-semibold text-neutral-900 dark:text-neutral-50"
            />
            <div className="hero-stat-block">
              <dt className="text-neutral-400">SLA crítico</dt>
              <dd className="mt-1 text-2xl font-semibold">99.98%</dd>
            </div>
          </dl>

          {/* Cards de Processo */}
          <div
            ref={processGridRef}
            className="mt-10 grid gap-4 rounded-3xl border border-white/20 bg-white/5 p-6 text-xs uppercase tracking-[0.35em] text-neutral-300 sm:grid-cols-2 lg:grid-cols-3"
          >
            <div className="hero-process-card">
              <span className="text-neutral-400">Entender para Construir</span>
              <p className="mt-2 text-sm normal-case text-white">
                O nosso primeiro passo é ouvir. Analisamos os seus objetivos de negócio para
                garantir que a tecnologia proposta seja a solução perfeita para o seu crescimento.
              </p>
            </div>
            <div className="hero-process-card">
              <span className="text-neutral-400">Construir com Qualidade</span>
              <p className="mt-2 text-sm normal-case text-white">
                Escrevemos código limpo e testado. O nosso processo garante que o seu
                projeto seja seguro, escalável e fácil de manter no futuro.
              </p>
            </div>
            <div className="hero-process-card">
              <span className="text-neutral-400">Design que Gera Valor</span>
              <p className="mt-2 text-sm normal-case text-white">
                Uma boa interface faz mais do que parecer bonita. Criamos um design
                intuitivo que melhora a retenção de utilizadores e impulsiona os seus resultados.
              </p>
            </div>
          </div>
        </div>

        {/* Coluna da Direita (Cards de Serviço) */}
        <div ref={serviceColumnRef} className="space-y-6">
          
          {/* CARD 1: DESENVOLVIMENTO WEB */}
          <div className="hero-service-card hero-card rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all duration-300 hover:border-white/20">
            <p className="text-xs uppercase tracking-[0.4em] text-accent">
              Desenvolvimento Web
            </p>
            <ul className="mt-4 space-y-3 text-sm text-neutral-200">
              <li>Plataformas SaaS & Dashboards</li>
              <li>E-commerce de Alta Performance</li>
              <li>Landing Pages Otimizadas (SEO)</li>
              <li>Sistemas de Gestão de Conteúdo (CMS)</li>
            </ul>
          </div>

          {/* CARD 2: APLICAÇÕES MOBILE */}
          <div className="hero-service-card hero-card rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all duration-300 hover:border-white/20">
            <p className="text-xs uppercase tracking-[0.4em] text-accent">
              Aplicações Mobile
            </p>
            <ul className="mt-4 space-y-3 text-sm text-neutral-200">
              <li>Apps Nativos (iOS & Android)</li>
              <li>Aplicações Híbridas (React Native)</li>
              <li>Design focado na Experiência (UX/UI)</li>
              <li>Integração com APIs e Serviços</li>
            </ul>
          </div>

          {/* CARD 3: SOFTWARE E ECOSSISTEMAS */}
          <div className="hero-service-card hero-card rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all duration-300 hover:border-white/20">
            <p className="text-xs uppercase tracking-[0.4em] text-accent">
              Software e Ecossistemas
            </p>
            <ul className="mt-4 space-y-3 text-sm text-neutral-200">
              <li>Sistemas Internos (ERPs, CRMs)</li>
              <li>Modernização de Código (Legacy)</li>
              <li>Arquitetura de APIs (Microsserviços)</li>
              <li>Consultoria e Arquitetura de Software</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}