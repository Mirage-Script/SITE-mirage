// src/components/sections/PricingComparison.tsx - Tabela comparativa de planos

import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/Button';
import { pricingPlans, type PricingPlan } from '@/data/pricing';

interface PricingComparisonProps {
  onSelectPlan?: (planId: string) => void;
}

export function PricingComparison({ onSelectPlan }: PricingComparisonProps) {
  return (
    <section className="space-y-12">
      <div className="text-center space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-primary">Planos Flexíveis</p>
        <h2 className="text-4xl font-semibold text-neutral-900 dark:text-neutral-50">
          Escolha o plano certo para seu projeto
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
          Todos os planos incluem suporte técnico, documentação e atualizações de segurança. Upgrade ou downgrade
          quando quiser.
        </p>
      </div>

      {/* Cards de Preço */}
      <div className="grid gap-8 md:grid-cols-3">
        {pricingPlans.map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className={`group relative overflow-hidden rounded-[2rem] border p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
              plan.highlighted
                ? 'border-primary bg-primary/5 ring-2 ring-primary/20 shadow-lg dark:border-accent dark:bg-accent/5 dark:ring-accent/20 hover:shadow-primary/20'
                : 'border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900/60 hover:border-primary/40 dark:hover:border-accent/40 hover:shadow-primary/5 dark:hover:shadow-accent/5'
            }`}
          >
            {/* Hover Gradient Overlay */}
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-gradient-to-br from-primary/0 via-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:via-accent/5" aria-hidden="true" />
            {plan.badge && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                {plan.badge}
              </div>
            )}

            <div className="space-y-6">
              {/* Título */}
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{plan.name}</h3>
                {plan.subtitle && (
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{plan.subtitle}</p>
                )}
              </div>

              {/* Preço */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
                    R$ {plan.monthly.toLocaleString('pt-BR')}
                  </span>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">/mês</span>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Setup: <span className="font-semibold">R$ {plan.setup.toLocaleString('pt-BR')}</span>
                </p>
                {plan.yearCost && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-500">
                    Ano 1: R$ {plan.yearCost.toLocaleString('pt-BR')}
                  </p>
                )}
              </div>

              {/* Descrição */}
              <p className="text-sm text-neutral-600 dark:text-neutral-300">{plan.description}</p>

              {/* CTA */}
              <Button
                variant={plan.highlighted ? 'primary' : 'outline'}
                className="w-full justify-center"
                onClick={() => onSelectPlan?.(plan.id)}
              >
                {plan.cta}
              </Button>

              {/* Features */}
              <div className="space-y-3 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                {plan.features.map((feature) => (
                  <div key={feature.name} className="flex items-start gap-3 text-sm">
                    {feature.included ? (
                      <CheckIcon className="h-5 w-5 text-primary dark:text-accent flex-shrink-0 mt-0.5" />
                    ) : (
                      <XMarkIcon className="h-5 w-5 text-neutral-300 dark:text-neutral-700 flex-shrink-0 mt-0.5" />
                    )}
                    <span
                      className={
                        feature.included
                          ? 'text-neutral-700 dark:text-neutral-200'
                          : 'text-neutral-400 dark:text-neutral-500'
                      }
                    >
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Support Level */}
              <div className="rounded-lg bg-neutral-50 dark:bg-neutral-800/50 p-3">
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400">Suporte</p>
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-1">{plan.supportLevel}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comparativo Detalhado */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-16 rounded-[2rem] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 overflow-x-auto"
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800">
              <th className="text-left p-6 font-semibold text-neutral-900 dark:text-neutral-100 sticky left-0 bg-white dark:bg-neutral-900">
                Recurso
              </th>
              {pricingPlans.map((plan) => (
                <th
                  key={plan.id}
                  className="text-center p-6 font-semibold text-neutral-900 dark:text-neutral-100 min-w-[180px]"
                >
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {[
              'Análise & Planejamento',
              'Desenvolvimento Web',
              'Desenvolvimento Mobile',
              'Design Customizado',
              'Testes Automatizados',
              'Documentação Viva',
              'Suporte Prioritário',
              'Desenvolvimento Contínuo',
              'Reunião Mensal',
              'Programa Afiliados',
            ].map((feature) => {
              const getFeatureStatus = (plan: PricingPlan): string | null => {
                const feat = plan.features.find((f) => f.name.includes(feature.split(' ')[0]));
                if (feature === 'Programa Afiliados') {
                  return plan.id === 'enterprise' ? 'Sim (30%)' : null;
                }
                if (feature === 'Reunião Mensal') {
                  return plan.id === 'enterprise' ? '1/mês' : plan.id === 'professional' ? 'Sob demanda' : null;
                }
                if (feature === 'Desenvolvimento Contínuo') {
                  if (plan.id === 'starter') return null;
                  if (plan.id === 'professional') return '4h/mês';
                  if (plan.id === 'enterprise') return '16h/mês';
                }
                return feat?.included ? 'Incluído' : null;
              };

              return (
                <tr key={feature}>
                  <td className="text-left p-6 text-neutral-700 dark:text-neutral-300 font-medium sticky left-0 bg-white dark:bg-neutral-900">
                    {feature}
                  </td>
                  {pricingPlans.map((plan) => {
                    const status = getFeatureStatus(plan);
                    return (
                      <td key={`${plan.id}-${feature}`} className="text-center p-6">
                        {status ? (
                          <div className="flex items-center justify-center gap-2">
                            <CheckIcon className="h-5 w-5 text-primary dark:text-accent" />
                            {status !== 'Incluído' && (
                              <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                                {status}
                              </span>
                            )}
                          </div>
                        ) : (
                          <XMarkIcon className="h-5 w-5 text-neutral-300 dark:text-neutral-700 mx-auto" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>
    </section>
  );
}
