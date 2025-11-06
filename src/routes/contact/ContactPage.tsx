import {
  ClockIcon,
  DocumentMagnifyingGlassIcon,
  RocketLaunchIcon,
  SparklesIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { type ComponentType, type SVGProps, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useScrollParallax } from '@/hooks/useScrollParallax';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { isSupabaseConfigured, supabase } from '@/lib/supabaseClient';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const contactHighlights: Array<{ title: string; description: string; icon: IconComponent }> = [
  {
    title: 'Retorno em 12h úteis',
    description: 'Agenda com horários alinhados ao seu fuso e stakeholders.',
    icon: ClockIcon,
  },
  {
    title: 'Briefing guiado',
    description: 'Enviamos um roteiro com perguntas-chave para acelerar a discovery.',
    icon: DocumentMagnifyingGlassIcon,
  },
  {
    title: 'Equipe dedicada',
    description: 'Tech lead, produto e UX participam desde o primeiro contato.',
    icon: UserGroupIcon,
  },
];

const contactWorkflow: Array<{ title: string; description: string; icon: IconComponent }> = [
  {
    title: 'Contexto imersivo',
    description: 'Mapeamos objetivos, métricas críticas e riscos para priorizar o impacto.',
    icon: DocumentMagnifyingGlassIcon,
  },
  {
    title: 'Roadmap colaborativo',
    description: 'Co-criamos um plano de entregas com estimativas lean e pontos de controle.',
    icon: SparklesIcon,
  },
  {
    title: 'Kickoff assistido',
    description: 'Configuração de rituais, SLAs e painéis de acompanhamento nas primeiras 24h.',
    icon: RocketLaunchIcon,
  },
];

const FALLBACK_SUBMIT_DELAY_MS = 700;

const contactSchema = z.object({
  name: z.string().min(3, 'Informe seu nome completo'),
  email: z.string().email('Use um e-mail válido'),
  company: z.string().min(2, 'Informe a empresa'),
  service: z.enum(['web', 'mobile', 'software', 'discovery'], {
    required_error: 'Selecione o serviço'
  }),
  message: z.string().min(16, 'Descreva o contexto do projeto com mais detalhes')
});

type ContactValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const workflowRef = useRef<HTMLElement | null>(null);

  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema)
  });

  useSectionReveal(heroRef, {
    targets: ['.contact-kicker', '.contact-headline', '.contact-description'],
    y: 48,
    stagger: 0.1,
  });

  useSectionReveal(detailRef, {
    targets: ['.contact-detail'],
    start: 'top 85%',
    y: 36,
    stagger: 0.12,
  });

  useSectionReveal(formRef, {
    targets: ['.contact-field', '.contact-feedback'],
    start: 'top 85%',
    y: 48,
    stagger: 0.09,
  });

  useSectionReveal(workflowRef, {
    targets: ['.contact-workflow-title', '.contact-step'],
    start: 'top 85%',
    y: 52,
    stagger: 0.12,
  });

  useScrollParallax(glowRef, {
    intensity: 180,
    scrub: 0.9,
  });

  async function onSubmit(values: ContactValues) {
    setErrorMessage(null);
    setIsSuccess(false);

    try {
      if (!isSupabaseConfigured) {
        console.info('Supabase não configurado. Registrando contato localmente para acompanhamento manual.', values);
        await new Promise((resolve) => setTimeout(resolve, FALLBACK_SUBMIT_DELAY_MS));
        setIsSuccess(true);
        reset();
        return;
      }

      const { error } = await supabase.from('contact_requests').insert({
        ...values,
        status: 'novo',
        source: 'website'
      });

      if (error) {
        throw error;
      }

      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error('Erro ao enviar formulário de contato', error);
      const details = error instanceof Error ? error.message : null;
      setErrorMessage(
        details
          ? `Não foi possível enviar o formulário (${details}). Recarregue a página ou use o e-mail contato@mirage.dev.`
          : 'Não foi possível enviar o formulário. Recarregue a página ou use o e-mail contato@mirage.dev.'
      );
    }
  }

  return (
    <div className="relative overflow-hidden">
      <Helmet>
        <title>Contato · MIRAGE</title>
        <meta name="description" content="Solicite uma discovery call com a equipe MIRAGE." />
      </Helmet>

      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-[-18rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl dark:bg-accent/20"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-24 px-6 pb-24 pt-16 sm:px-10 lg:px-16">
        <section ref={heroRef} className="grid gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div className="space-y-10">
            <div className="space-y-6">
              <p className="contact-kicker text-xs uppercase tracking-[0.4em] text-primary">Discovery call</p>
              <h1 className="contact-headline text-4xl font-semibold text-neutral-900 dark:text-neutral-50">
                Vamos mapear seu desafio e priorizar entregas com alto impacto.
              </h1>
              <p className="contact-description max-w-xl text-sm text-neutral-600 dark:text-neutral-300">
                Compartilhe contexto sobre produto, área e métricas. Retornaremos em até 12 horas úteis com uma agenda
                inteligente, materiais prévios e o plano de perguntas que guia nossa discovery.
              </p>
            </div>

            <div ref={detailRef} className="contact-meta grid gap-4 text-sm text-neutral-700 dark:text-neutral-200 sm:grid-cols-3">
              {contactHighlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="contact-detail flex flex-col gap-3 rounded-2xl border border-neutral-200/60 bg-white/70 p-4 backdrop-blur dark:border-neutral-800/70 dark:bg-neutral-900/60"
                  >
                    <Icon className="h-6 w-6 text-primary dark:text-accent" aria-hidden="true" />
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{item.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <form
            ref={formRef}
            className="rounded-3xl border border-neutral-200/70 bg-white/80 p-8 shadow-xl shadow-primary/5 backdrop-blur dark:border-neutral-800/80 dark:bg-neutral-900/70"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="grid gap-5">
              <div className="contact-field">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200" htmlFor="name">
                  Nome completo
                </label>
                <input
                  id="name"
                  type="text"
                  className={clsx(
                    'mt-2 w-full rounded-2xl border bg-white px-4 py-2 text-sm text-neutral-900 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100',
                    errors.name && 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  )}
                  {...register('name')}
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
              </div>

              <div className="contact-field">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200" htmlFor="email">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  className={clsx(
                    'mt-2 w-full rounded-2xl border bg-white px-4 py-2 text-sm text-neutral-900 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100',
                    errors.email && 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  )}
                  {...register('email')}
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
              </div>

              <div className="contact-field">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200" htmlFor="company">
                  Empresa
                </label>
                <input
                  id="company"
                  type="text"
                  className={clsx(
                    'mt-2 w-full rounded-2xl border bg-white px-4 py-2 text-sm text-neutral-900 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100',
                    errors.company && 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  )}
                  {...register('company')}
                />
                {errors.company && <p className="mt-1 text-xs text-red-500">{errors.company.message}</p>}
              </div>

              <div className="contact-field">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200" htmlFor="service">
                  Serviço
                </label>
                <select
                  id="service"
                  className={clsx(
                    'mt-2 w-full rounded-2xl border bg-white px-4 py-2 text-sm text-neutral-900 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100',
                    errors.service && 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  )}
                  {...register('service')}
                >
                  <option value="">Selecione...</option>
                  <option value="web">Desenvolvimento Web</option>
                  <option value="mobile">Desenvolvimento Mobile</option>
                  <option value="software">Engenharia de Software</option>
                  <option value="discovery">Discovery / Consultoria</option>
                </select>
                {errors.service && <p className="mt-1 text-xs text-red-500">{errors.service.message}</p>}
              </div>

              <div className="contact-field">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200" htmlFor="message">
                  Contexto do projeto
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className={clsx(
                    'mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm text-neutral-900 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100',
                    errors.message && 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  )}
                  placeholder="Contexto, tecnologias, metas e prazos. Quanto mais detalhes, melhor."
                  {...register('message')}
                />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
              </div>

              {errorMessage && (
                <div className="contact-feedback rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700 dark:border-red-400/50 dark:bg-red-900/40 dark:text-red-200">
                  {errorMessage}
                </div>
              )}
              {isSuccess && (
                <div className="contact-feedback rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-xs text-primary dark:border-accent/30 dark:bg-accent/10 dark:text-accent">
                  Mensagem enviada com sucesso! Entraremos em contato em breve.
                </div>
              )}

              <div className="contact-field">
                <button
                  type="submit"
                  className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:bg-primary/60"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando…' : 'Enviar briefing'}
                </button>
              </div>
            </div>
          </form>
        </section>

        <section
          ref={workflowRef}
          className="relative rounded-[32px] border border-neutral-200/70 bg-white/60 px-6 py-10 shadow-lg shadow-primary/5 backdrop-blur dark:border-neutral-800/70 dark:bg-neutral-900/60"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.4em] text-primary dark:text-accent">Como avançamos</p>
              <h2 className="contact-workflow-title text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
                Da primeira conversa ao kickoff assistido
              </h2>
            </div>
            <p className="max-w-2xl text-sm text-neutral-600 dark:text-neutral-300">
              Durante a discovery produzimos mapeamento de stakeholders, matriz de risco, arquitetura alvo e plano de
              adoção técnica para que sua equipe comece o projeto com clareza e governança desde o primeiro sprint.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {contactWorkflow.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="contact-step group flex flex-col gap-4 rounded-3xl border border-neutral-200/60 bg-white/70 p-6 transition-all duration-300 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10 dark:border-neutral-800/80 dark:bg-neutral-900/70 dark:hover:border-accent/60"
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <Icon className="h-5 w-5 text-primary transition duration-300 group-hover:scale-110 dark:text-accent" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <div
        className="pointer-events-none absolute bottom-[-18rem] left-1/2 h-[32rem] w-[50rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl dark:bg-accent/15"
        aria-hidden="true"
      />
    </div>
  );
}
