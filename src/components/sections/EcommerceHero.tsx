import { motion } from 'framer-motion';
import { ShoppingCartIcon, SparklesIcon } from '@heroicons/react/24/outline';

import { Button } from '../ui/Button';

export function EcommerceHero() {
  return (
    <section className="relative space-y-8">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      {/* Header */}
      <motion.div className="max-w-3xl space-y-6" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
          <ShoppingCartIcon className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Produto Principal</span>
        </div>

        <h1 className="text-5xl font-bold text-neutral-900 dark:text-neutral-50">
          Plataforma White Label de E-commerce para Produtos Personalizados
        </h1>

        <p className="text-lg text-neutral-600 dark:text-neutral-300">
          Venda camisetas, canecas, ecobags e muito mais com <strong>sua própria marca</strong>. Solução completa: do catálogo ao checkout. <strong>Pronto em 2 semanas.</strong>
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 pt-4">
          <Button size="lg" className="gap-2">
            <SparklesIcon className="h-5 w-5" />
            Ver Planos
          </Button>
          <Button size="lg" variant="outline">
            Agendar Demo
          </Button>
        </div>
      </motion.div>

      {/* Key stats */}
      <motion.div className="grid gap-6 sm:grid-cols-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
        {[
          { label: 'Tempo de Setup', value: '2 semanas' },
          { label: 'Taxa de Uptime', value: '99%+' },
          { label: 'Empresas usando', value: '50+' }
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-600 dark:text-neutral-400">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-neutral-900 dark:text-neutral-50">{stat.value}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
