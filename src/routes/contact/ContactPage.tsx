import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { supabase } from '@/lib/supabaseClient';

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

  async function onSubmit(values: ContactValues) {
    setErrorMessage(null);
    setIsSuccess(false);

    try {
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
      console.error(error);
      setErrorMessage('Não foi possível enviar o formulário. Recarregue a página ou use o e-mail contato@mirage.dev.');
    }
  }

  return (
    <div className="space-y-16">
      <Helmet>
        <title>Contato · MIRAGE</title>
        <meta name="description" content="Solicite uma discovery call com a equipe MIRAGE." />
      </Helmet>

      <section className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">Discovery call</p>
          <h1 className="text-4xl font-semibold text-neutral-900 dark:text-neutral-50">
            Vamos mapear seu desafio e priorizar entregas com alto impacto.
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            Compartilhe contexto sobre produto, área e métricas. Retornaremos em até 12 horas úteis com uma agenda
            inteligente e materiais prévios.
          </p>

          <div className="grid gap-4 text-sm text-neutral-700 dark:text-neutral-200">
            <div>
              <span className="text-xs uppercase tracking-[0.4em] text-neutral-500">E-mail</span>
              <p className="mt-1">contato@mirage.dev</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.4em] text-neutral-500">Telefone</span>
              <p className="mt-1">+55 (61) 99999-9999</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.4em] text-neutral-500">Cidades</span>
              <p className="mt-1">Brasília · São Paulo · Lisboa</p>
            </div>
          </div>
        </div>

        <form
          className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="grid gap-4">
            <div>
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

            <div>
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

            <div>
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

            <div>
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

            <div>
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

            {errorMessage && <div className="rounded-2xl bg-red-100 px-4 py-3 text-xs text-red-700">{errorMessage}</div>}
            {isSuccess && (
              <div className="rounded-2xl bg-primary/10 px-4 py-3 text-xs text-primary">
                Mensagem enviada com sucesso! Retornaremos em breve.
              </div>
            )}

            <button
              type="submit"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando…' : 'Enviar briefing'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
