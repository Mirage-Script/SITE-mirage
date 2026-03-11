import { Helmet } from 'react-helmet-async';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChatBubbleBottomCenterTextIcon, 
  EnvelopeOpenIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

import { useScrollParallax } from '@/hooks/useScrollParallax';
import { useSectionReveal } from '@/hooks/useSectionReveal';

export default function ContactPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useSectionReveal(heroRef, {
    targets: ['.contact-kicker', '.contact-headline', '.contact-description'],
    y: 48,
    stagger: 0.1,
  });

  useSectionReveal(cardsRef, {
    targets: ['.contact-card'],
    start: 'top 85%',
    y: 48,
    stagger: 0.15,
  });

  useScrollParallax(glowRef, {
    intensity: 150,
    scrub: 0.9,
  });

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-8rem)] flex items-center">
      <Helmet>
        <title>Contato · MIRAGE</title>
        <meta name="description" content="Inicie um projeto com a MIRAGE. Escolha entre atendimento via WhatsApp ou preencha nosso briefing por E-mail." />
      </Helmet>

      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-[-10rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl dark:bg-accent/15"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 py-24 sm:px-10 lg:px-16">
        <section ref={heroRef} className="text-center mx-auto max-w-2xl">
          <div className="space-y-6 flex flex-col items-center">
            <div className="flex justify-center">
              <span className="contact-kicker inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary dark:bg-accent/10 dark:text-accent">
                <SparklesIcon className="h-4 w-4" />
                Dê o próximo passo
              </span>
            </div>
            <h1 className="contact-headline text-4xl font-semibold text-neutral-900 md:text-5xl dark:text-neutral-50">
              Como prefere nos contar sobre seu projeto?
            </h1>
            <p className="contact-description text-base text-neutral-600 dark:text-neutral-300">
              Escolha o canal que faz mais sentido para o seu momento. Nossa equipe técnica 
              está pronta para mapear seu desafio e priorizar entregas com alto impacto.
            </p>
          </div>
        </section>

        <section ref={cardsRef} className="grid gap-6 md:grid-cols-2">
          {/* WhatsApp Card */}
          <a
            href="https://wa.me/5561991810148"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card group relative flex flex-col justify-between gap-8 rounded-3xl border border-neutral-200/70 bg-white/60 p-8 shadow-lg shadow-primary/5 backdrop-blur transition-all duration-300 hover:border-green-500/50 hover:bg-white hover:shadow-green-500/10 dark:border-neutral-800/70 dark:bg-neutral-900/60 dark:hover:border-green-500/50 dark:hover:bg-neutral-900"
          >
            <div className="space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400">
                <ChatBubbleBottomCenterTextIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                  Atendimento por WhatsApp
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  Ideal para respostas rápidas, dúvidas pontuais ou se você quer apenas um contato inicial mais ágil direto com nosso time.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
              <span>Iniciar conversa</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </a>

          {/* Email Form Card */}
          <Link
            to="/contato/email"
            className="contact-card group relative flex flex-col justify-between gap-8 rounded-3xl border border-neutral-200/70 bg-white/60 p-8 shadow-lg shadow-primary/5 backdrop-blur transition-all duration-300 hover:border-primary/50 hover:bg-white hover:shadow-primary/10 dark:border-neutral-800/70 dark:bg-neutral-900/60 dark:hover:border-accent/50 dark:hover:bg-neutral-900"
          >
            <div className="space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-accent/20 dark:text-accent">
                <EnvelopeOpenIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                  Solicitação Tática por E-mail
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  Ideal para contextos detalhados. Preencha nosso briefing form e retornaremos em até 12h úteis com documentação prévia.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary dark:text-accent">
              <span>Preencher formulário</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </Link>
        </section>
      </div>

      <div
        className="pointer-events-none absolute bottom-[-18rem] left-1/2 h-[32rem] w-[50rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl dark:bg-accent/15"
        aria-hidden="true"
      />
    </div>
  );
}
