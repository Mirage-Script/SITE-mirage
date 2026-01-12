import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, CpuChipIcon, SparklesIcon } from '@heroicons/react/24/outline';

import { Button } from '@/components/ui/Button';
import { services } from '@/data/services';

export default function ServicesPage() {
  const navigate = useNavigate();

  const products = [
    {
      id: 'ecommerce',
      icon: ShoppingCartIcon,
      title: 'White Label E-commerce',
      subtitle: 'Plataforma para Produtos Personalizados',
      description: 'Venda camisetas, canecas, ecobags com sua marca. Solução completa: catálogo, pagamentos, frete. Pronto em 2 semanas.',
      highlights: ['100% White Label', 'B2B + B2C', '99% Uptime', 'Setup: 2 semanas'],
      cta: 'Ver Detalhes',
      route: '/ecommerce'
    },
    {
      id: 'saas',
      icon: CpuChipIcon,
      title: 'Software as a Service (SaaS)',
      subtitle: 'Plataforma Escalável e Customizável',
      description: 'Desenvolva sua própria SaaS com arquitetura robusta, autenticação, pagamentos recorrentes e painel administrativo inclusos.',
      highlights: ['Arquitetura Enterprise', 'Multi-tenant', 'Analytics Integrada', 'Suporte dedicado'],
      cta: 'Saber Mais',
      route: '/saas'
    },
    {
      id: 'consultoria',
      icon: SparklesIcon,
      title: 'Consultoria de Transformação Digital',
      subtitle: 'Modernize Sua Operação',
      description: 'Diagnóstico, estratégia e implementação de soluções digitais. Da ideação ao go-live, acompanhamos seu crescimento.',
      highlights: ['Análise & Planejamento', 'Roadmap Técnico', 'Implementação', 'Treinamento de Time'],
      cta: 'Agendar Reunião',
      route: '/consultoria'
    },
  ];

  return (
    <div className="space-y-20">
      <Helmet>
        <title>Serviços e Produtos · MIRAGE</title>
        <meta
          name="description"
          content="Plataforma White Label de E-commerce, SaaS customizado e Consultoria de Transformação Digital." />
      </Helmet>

      {/* Header */}
      <motion.header 
        className="max-w-4xl space-y-4"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs uppercase tracking-[0.4em] text-primary">Soluções MIRAGE</p>
        <h1 className="text-4xl font-semibold text-neutral-900 dark:text-neutral-50">
          Escolha a solução ideal para seu projeto
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-2xl">
          Oferecemos produtos digitais prontos para usar ou completamente customizados. Clique em cada um para conhecer mais detalhes, pricing e começar.
        </p>
      </motion.header>

      {/* Product Cards Gallery */}
      <section className="space-y-8">
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.id}
                className="group relative rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-900 hover:border-primary/30 dark:hover:border-accent/30 flex flex-col h-full"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Icon */}
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-7 w-7 text-primary" />
                </div>

                {/* Content */}
                <div className="space-y-4 flex-grow">
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                      {product.title}
                    </h2>
                    <p className="text-sm text-primary font-semibold">{product.subtitle}</p>
                  </div>

                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    {product.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <motion.div 
                  className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Button
                    onClick={() => navigate(product.route)}
                    className="w-full justify-center"
                  >
                    {product.cta}
                  </Button>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-neutral-200 dark:border-neutral-800" />

      {/* TRADITIONAL SERVICES SECTION */}
      <div className="space-y-12">
        <header className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">Serviços Sob Demanda</p>
          <h2 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-50">
            Desenvolvimento e Consultoria Customizados
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            Precisa de algo específico? Oferecemos desenvolvimento sob demanda com arquitetura enterprise, entrega em fases e suporte dedicado.
          </p>
        </header>

        <section className="space-y-10">
          {services.map((service) => (
            <motion.article
              key={service.id}
              className="rounded-[2.5rem] border border-neutral-200 bg-white p-10 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
                <div className="max-w-2xl space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                      {service.title}
                    </span>
                    {service.badge && (
                      <span className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white dark:bg-neutral-100 dark:text-neutral-900">
                        {service.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">{service.description}</p>

                  <ul className="grid gap-3 text-sm text-neutral-600 dark:text-neutral-300 md:grid-cols-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <aside className="flex flex-col justify-between gap-6 rounded-3xl border border-neutral-200 bg-neutral-50/70 p-6 text-sm text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800/40 dark:text-neutral-200">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-500">Deliverables</h3>
                    <ul className="mt-3 space-y-2">
                      {service.deliverables.map((deliverable) => (
                        <li key={deliverable}>{deliverable}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t border-neutral-200 pt-4 text-xs uppercase tracking-[0.4em] text-neutral-500 dark:border-neutral-700">
                    Investimento
                    <p className="mt-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">{service.investment}</p>
                  </div>
                  <Button variant="outline" className="justify-center">
                    Solicitar escopo detalhado
                  </Button>
                </aside>
              </div>
            </motion.article>
          ))}
        </section>
      </div>
    </div>
  );
}
