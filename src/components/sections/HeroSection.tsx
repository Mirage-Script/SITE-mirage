// src/components/sections/HeroSection.tsx (FINALIZADO - Todos os textos atualizados)

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import Typed from 'typed.js';

import { HeroImmersiveCanvas } from '@/components/effects/HeroImmersiveCanvas';
import { MagneticButton } from '@/components/effects/MagneticButton';
import { ShaderAurora } from '@/components/effects/ShaderAurora';
import { TextScramble, type TextScrambleHandle } from '@/components/effects/TextScramble';
import { gsap, ScrollTrigger, useGsapTimeline } from '@/lib/gsap';
import { ANIM } from '@/lib/animTokens'; // Corrigido (o seu paste tinha um typo aqui)

import { Button } from '../ui/Button';

// ==================================================================
// DOCUMENTAÇÃO: Textos rotativos focados nos 3 pilares de serviço.
// ==================================================================
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

  // ... (Toda a lógica de animação GSAP e useEffects permanece intacta) ...

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

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) {
      return;
    }
    const cards = sectionRef.current.querySelectorAll('.hero-card');
    const triggers: ScrollTrigger[] = [];
    cards.forEach((card) => {
      const trigger = ScrollTrigger.create({
        trigger: card,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            card,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          );
        },
      });
      triggers.push(trigger);
    });
    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [prefersReducedMotion]);

  // ==================================================================
  // INÍCIO DO CONTEÚDO (HTML/JSX)
  // ==================================================================
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden rounded-[3rem] bg-neutral-900 px-8 py-24 text-white shadow-2xl"
    >
      {/* ... (Efeitos visuais de fundo) ... */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(74,123,167,0.45),transparent_60%)]" aria-hidden />
      <div className="absolute inset-y-0 left-0 w-1/2 bg-[radial-gradient(circle_at_left,rgba(15,58,102,0.35),transparent_70%)]" aria-hidden />
      <HeroImmersiveCanvas className="pointer-events-none absolute inset-0 mix-blend-screen" />
      <ShaderAurora className="pointer-events-none absolute inset-0 mix-blend-screen opacity-80" />
      <div className="pointer-events-none absolute -left-20 top-24 h-64 w-64 rounded-full bg-primary/40 blur-3xl motion-safe:animate-pulse-glow" aria-hidden />
      <div className="pointer-events-none absolute -bottom-10 right-[-6rem] h-80 w-80 rounded-full bg-accent/30 blur-3xl motion-safe:animate-pulse-glow" aria-hidden />

      <div className="relative grid gap-10 lg:grid-cols-[3fr_2fr]">
        <div>
          {/* DOCUMENTAÇÃO (MODIFICAÇÃO 1): Tagline (Linha de chamada) */}
          <p className="text-sm uppercase tracking-[0.5em] text-neutral-400">
            Soluções Digitais Sob Medida
          </p>

          {/* DOCUMENTAÇÃO (MODIFICAÇÃO 2): Título Principal (H1) */}
          <h1
            ref={headingRef}
            className="hero-heading mt-6 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Mirage Script
          </h1>

          {/* DOCUMENTAÇÃO (MODIFICAÇÃO 3): Subtítulo Rotativo (Typed.js) */}
          <div className="hero-subline mt-5 min-h-[2.5rem] overflow-hidden text-lg font-medium text-accent">
            {prefersReducedMotion ? (
              <span className="block">{HEADLINE_ROTATIONS[0]}</span>
            ) : (
              <span ref={typedElementRef} className="block" />
            )}
          </div>

          {/* DOCUMENTAÇÃO (MODIFICAÇÃO 4): Parágrafo de Descrição */}
          <p className="mt-6 max-w-xl text-neutral-200">
            Transformamos os seus desafios de negócio em software robusto,
            performático e escalável. Entregamos produtos Web, Mobile e Software com código
            limpo e design focado no utilizador.
          </p>

          {/* ================================================================== */}
          {/* DOCUMENTAÇÃO (MODIFICAÇÃO 5): BOTÕES (CTAs) */}
          {/* ================================================================== */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            
            {/* Wrapper 1 (Controla o Z-index) */}
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

            {/* Wrapper 2 (Controla o Z-index) */}
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

          {/* ================================================================== */}
          {/* DOCUMENTAÇÃO (SEM MODIFICAÇÃO): Estatísticas (Prova Social) */}
          {/* ================================================================== */}
          <dl className="hero-stats mt-12 grid gap-6 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-neutral-400">Deploys assistidos por IA</dt>
              <dd className="mt-1 text-2xl font-semibold">42</dd>
            </div>
            <div>
              <dt className="text-neutral-400">Plataformas escaladas</dt>
              <dd className="mt-1 text-2xl font-semibold">+80</dd>
            </div>
            <div>
              <dt className="text-neutral-400">SLA crítico</dt>
              <dd className="mt-1 text-2xl font-semibold">99.98%</dd>
            </div>
          </dl>

          {/* ================================================================== */}
          {/* DOCUMENTAÇÃO (MODIFICAÇÃO 6): CARDS DE PROCESSO (OPÇÃO 3)
           *
           * Substituí o jargão técnico (Discovery, Observabilidade, Cinemática)
           * pelos 3 Pilares de Processo focados no cliente.
           * ================================================================== */}
          <div className="mt-10 grid gap-4 rounded-3xl border border-white/20 bg-white/5 p-6 text-xs uppercase tracking-[0.35em] text-neutral-300 sm:grid-cols-2 lg:grid-cols-3">
            
            {/* CARD 1: ENTENDER PARA CONSTRUIR */}
            <div>
              <span className="text-neutral-400">Entender para Construir</span>
              <p className="mt-2 text-sm normal-case text-white">
                O nosso primeiro passo é ouvir. Analisamos os seus objetivos de negócio para
                garantir que a tecnologia proposta seja a solução perfeita para o seu crescimento.
              </p>
            </div>
            
            {/* CARD 2: CONSTRUIR COM QUALIDADE */}
            <div>
              <span className="text-neutral-400">Construir com Qualidade</span>
              <p className="mt-2 text-sm normal-case text-white">
                Escrevemos código limpo e testado. O nosso processo garante que o seu
                projeto seja seguro, escalável e fácil de manter no futuro.
              </p>
            </div>
            
            {/* CARD 3: DESIGN QUE GERA VALOR */}
            <div>
              <span className="text-neutral-400">Design que Gera Valor</span>
              <p className="mt-2 text-sm normal-case text-white">
                Uma boa interface faz mais do que parecer bonita. Criamos um design
                intuitivo que melhora a retenção de utilizadores e impulsiona os seus resultados.
              </p>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* DOCUMENTAÇÃO (MODIFICAÇÃO 7): CARDS DE SERVIÇOS (OS 3 PILARES)
         *
         * Substituí o jargão técnico (Stack, Governança, Squads)
         * pelos 3 Pilares de Serviço da Mirage Script.
         * ================================================================== */}
        <div className="space-y-6">
          
          {/* CARD 1: DESENVOLVIMENTO WEB */}
          <motion.div
            className="hero-card rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            whileHover={{ y: -12, boxShadow: '0 20px 45px -20px rgba(74,123,167,0.6)' }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-accent">
              Desenvolvimento Web
            </p>
            <ul className="mt-4 space-y-3 text-sm text-neutral-200">
              <li>Plataformas SaaS & Dashboards</li>
              <li>E-commerce de Alta Performance</li>
              <li>Landing Pages Otimizadas (SEO)</li>
              <li>Sistemas de Gestão de Conteúdo (CMS)</li>
            </ul>
          </motion.div>
          
          {/* CARD 2: APLICAÇÕES MOBILE */}
          <motion.div
            className="hero-card rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            whileHover={{ y: -12, boxShadow: '0 24px 50px -24px rgba(15,58,102,0.6)' }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-accent">
              Aplicações Mobile
            </p>
            <ul className="mt-4 space-y-3 text-sm text-neutral-200">
              <li>Apps Nativos (iOS & Android)</li>
              <li>Aplicações Híbridas (React Native)</li>
              <li>Design focado na Experiência (UX/UI)</li>
              <li>Integração com APIs e Serviços</li>
            </ul>
          </motion.div>
          
          {/* CARD 3: SOFTWARE E ECOSSISTEMAS */}
          <motion.div
            className="hero-card rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            whileHover={{ y: -12, boxShadow: '0 24px 50px -24px rgba(74,123,167,0.6)' }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-accent">
              Software e Ecossistemas
            </p>
            <ul className="mt-4 space-y-3 text-sm text-neutral-200">
              <li>Sistemas Internos (ERPs, CRMs)</li>
              <li>Modernização de Código (Legacy)</li>
              <li>Arquitetura de APIs (Microsserviços)</li>
              <li>Consultoria e Arquitetura de Software</li>
            </ul>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}