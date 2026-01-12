import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/solid';

export function EcommerceFeatures() {
  const features = [
    {
      title: '100% White Label',
      description: 'Sua marca, suas cores, seu logo. Cliente nunca vê MIRAGE'
    },
    {
      title: 'B2B + B2C Integrado',
      description: 'Venda para empresas e consumidores finais no mesmo sistema'
    },
    {
      title: 'Pagamentos Completos',
      description: 'Stripe, Mercado Pago, PIX. Automático e seguro'
    },
    {
      title: 'Frete Automatizado',
      description: 'Integração com Melhor Envio. Cotação em tempo real'
    },
    {
      title: 'Painel Admin Completo',
      description: 'Gerencie catálogo, pedidos, clientes e relatórios'
    },
    {
      title: 'Preços Dinâmicos',
      description: 'Automatize variações por tamanho, cor e quantidade'
    },
    {
      title: 'Suporte Dedicado',
      description: 'Time técnico à disposição 24/7 para sua loja'
    },
    {
      title: '99% Uptime Garantido',
      description: 'Infraestrutura escalável em Vercel + Supabase'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section className="space-y-12">
      <motion.div className="max-w-2xl space-y-4" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
          Tudo que você precisa, em um único lugar
        </h2>
        <p className="text-neutral-600 dark:text-neutral-300">
          Plataforma completa com todas as funcionalidades essenciais para vender produtos personalizados online.
        </p>
      </motion.div>

      <motion.div 
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900"
            variants={itemVariants}
          >
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <CheckIcon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-50">{feature.title}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
