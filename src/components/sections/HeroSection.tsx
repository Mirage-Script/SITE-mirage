import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import Typed from 'typed.js';

import { HeroImmersiveCanvas } from '@/components/effects/HeroImmersiveCanvas';
import { MagneticButton } from '@/components/effects/MagneticButton';
import { ShaderAurora } from '@/components/effects/ShaderAurora';
import { TextScramble, type TextScrambleHandle } from '@/components/effects/TextScramble';
import { gsap, ScrollTrigger, useGsapTimeline } from '@/lib/gsap';
import { ANIM } from '@/lib/animTokens';

import { Button } from '../ui/Button';

const HEADLINE_ROTATIONS = [
  'Experiências imersivas com GSAP + Lenis',
  'Supabase + RLS entregues com auditoria contínua',
  'Design systems acessíveis com Framer Motion'
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
      showCursor: false
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
        types: 'lines,words,chars'
      });

      splitHeading.lines?.forEach((line) => {
        line.style.overflow = 'hidden';
      });

      gsap.set(splitHeading.chars, {
        display: 'inline-block',
        transformOrigin: '50% 100%'
      });

      const timeline = gsap.timeline();

      timeline.from(splitHeading.chars, {
        yPercent: 110,
        opacity: 0,
        rotateX: -90,
        duration: ANIM.duration.lg,
        ease: ANIM.ease.out,
        stagger: { each: 0.015, from: 'random' }
      });

      timeline.from(
        '.hero-subline',
        {
          y: ANIM.distance.y.sm,
          opacity: 0,
          duration: ANIM.duration.md,
          ease: ANIM.ease.out
        },
        '-=0.6'
      );

      timeline.from(
        '.hero-stats',
        {
          y: ANIM.distance.y.sm,
          opacity: 0,
          duration: ANIM.duration.lg,
          ease: ANIM.ease.out,
          stagger: 0.12
        },
        '-=0.4'
      );

      context.add(() => {
        timeline.kill();
        splitHeading.revert();
      });
    },
    [prefersReducedMotion],
    sectionRef
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
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
          );
        }
      });

      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden rounded-[3rem] bg-neutral-900 px-8 py-24 text-white shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(74,123,167,0.45),transparent_60%)]" aria-hidden />
      <div className="absolute inset-y-0 left-0 w-1/2 bg-[radial-gradient(circle_at_left,rgba(15,58,102,0.35),transparent_70%)]" aria-hidden />
  <HeroImmersiveCanvas className="pointer-events-none absolute inset-0 mix-blend-screen" />
  <ShaderAurora className="pointer-events-none absolute inset-0 mix-blend-screen opacity-80" />
      <div className="pointer-events-none absolute -left-20 top-24 h-64 w-64 rounded-full bg-primary/40 blur-3xl motion-safe:animate-pulse-glow" aria-hidden />
      <div className="pointer-events-none absolute -bottom-10 right-[-6rem] h-80 w-80 rounded-full bg-accent/30 blur-3xl motion-safe:animate-pulse-glow" aria-hidden />
      <div className="relative grid gap-10 lg:grid-cols-[3fr_2fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.5em] text-neutral-400">Engenharia orientada a resultado</p>
          <h1
            ref={headingRef}
            className="hero-heading mt-6 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Mirage transforma ideias em plataformas digitais enterprise-grade.
          </h1>
          <div className="hero-subline mt-5 min-h-[2.5rem] overflow-hidden text-lg font-medium text-accent">
            {prefersReducedMotion ? (
              <span className="block">{HEADLINE_ROTATIONS[0]}</span>
            ) : (
              <span ref={typedElementRef} className="block" />
            )}
          </div>
          <p className="mt-6 max-w-xl text-neutral-200">
            Arquiteturas composable, Supabase Edge e pipelines observáveis desde o sprint 0. Utilizamos GSAP, Lenis e Framer
            Motion para entregar microinterações sofisticadas enquanto mantemos governança, RLS e auditoria contínua.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton strength={0.4}>
              <Button
                size="lg"
                variant="primary"
                className="bg-white text-neutral-900 hover:bg-neutral-200"
                aria-label="Planejar sprint"
                onMouseEnter={() => primaryCtaRef.current?.play()}
                onFocus={() => primaryCtaRef.current?.play()}
              >
                <span className="sr-only">Planejar Sprint</span>
                <TextScramble
                  ref={primaryCtaRef}
                  text="Planejar Sprint"
                  className="uppercase tracking-widest"
                />
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.3}>
              <Button
                size="lg"
                variant="ghost"
                className="border border-white/30 bg-transparent text-white hover:bg-white/10"
                aria-label="Portfólio técnico"
                onMouseEnter={() => secondaryCtaRef.current?.play()}
                onFocus={() => secondaryCtaRef.current?.play()}
              >
                <span className="sr-only">Portfólio técnico</span>
                <TextScramble ref={secondaryCtaRef} text="Portfólio técnico" className="uppercase tracking-[0.35em]" />
              </Button>
            </MagneticButton>
          </div>
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
          <div className="mt-10 grid gap-4 rounded-3xl border border-white/20 bg-white/5 p-6 text-xs uppercase tracking-[0.35em] text-neutral-300 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <span className="text-neutral-400">Discovery assistida por IA</span>
              <p className="mt-2 text-sm normal-case text-white">
                Priorizamos demandas com dados de analytics, entrevistas e matriz RICE em até 10 dias úteis.
              </p>
            </div>
            <div>
              <span className="text-neutral-400">Observabilidade conectada</span>
              <p className="mt-2 text-sm normal-case text-white">
                Dashboards executivos com DORA, NPS e SLOs prontos para o board em toda sprint review.
              </p>
            </div>
            <div>
              <span className="text-neutral-400">Experiências cinemáticas</span>
              <p className="mt-2 text-sm normal-case text-white">
                Coreografamos Lottie, Motion One e áudio responsivo para jornadas que convertem em alto impacto.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <motion.div
            className="hero-card rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            whileHover={{ y: -12, boxShadow: '0 20px 45px -20px rgba(74,123,167,0.6)' }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-accent">Stack em sinergia</p>
            <ul className="mt-4 space-y-3 text-sm text-neutral-200">
              <li>React 18.3.1 · TypeScript · Tailwind CSS</li>
              <li>Supabase · PostgreSQL com RLS</li>
              <li>GSAP ScrollTrigger · Lenis · Motion One</li>
              <li>Observabilidade · Weights & Logs</li>
            </ul>
          </motion.div>
          <motion.div
            className="hero-card rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            whileHover={{ y: -12, boxShadow: '0 24px 50px -24px rgba(15,58,102,0.6)' }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-accent">Governança completa</p>
            <ul className="mt-4 space-y-3 text-sm text-neutral-200">
              <li>Playbooks de incidentes e SRE</li>
              <li>Security by design + audits contínuos</li>
              <li>CI/CD com zero-downtime</li>
              <li>Dashboards, analytics real-time e data storytelling</li>
            </ul>
          </motion.div>
          <motion.div
            className="hero-card rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            whileHover={{ y: -12, boxShadow: '0 24px 50px -24px rgba(74,123,167,0.6)' }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-accent">Squads e operações</p>
            <ul className="mt-4 space-y-3 text-sm text-neutral-200">
              <li>Cell-based squads com chapter leads</li>
              <li>Ritos semanais com board view e OKRs dinâmicos</li>
              <li>Feature flags e experimentação guiada</li>
              <li>Metodologia Mirage Delivery Playbook</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
