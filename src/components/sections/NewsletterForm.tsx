import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

const newsletterSchema = z.object({
  email: z.string().email({ message: 'Informe um e-mail válido' })
});

type NewsletterValues = z.infer<typeof newsletterSchema>;

export function NewsletterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: '' }
  });

  async function onSubmit(values: NewsletterValues) {
    // TODO: integrate with Supabase or marketing platform
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.info('Newsletter subscriber', values);
    toast.success('Assinatura confirmada! Você receberá o próximo briefing MIRAGE.');
    reset();
  }

  return (
    <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/40">
      <h4 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">Newsletter técnica</h4>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
        Insights sobre arquitetura, GSAP ScrollTrigger, Supabase e práticas enterprise sem spam.
      </p>
      <form className="mt-4 space-y-3" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-200" htmlFor="newsletter-email">
            E-mail corporativo
          </label>
          <input
            id="newsletter-email"
            type="email"
            autoComplete="email"
            className={clsx(
              'mt-2 w-full rounded-full border px-4 py-2.5 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40',
              'dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100'
            )}
            placeholder="team@empresa.com"
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500" aria-live="polite">
              {errors.email.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando…' : 'Receber briefing'}
        </button>
      </form>
      <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
        Atualizações mensais, com cancelamento a qualquer momento.
      </p>
    </div>
  );
}
