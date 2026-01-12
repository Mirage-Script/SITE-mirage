import { motion } from 'framer-motion';
import { SparklesIcon, UsersIcon, BuildingStorefrontIcon, CubeIcon } from '@heroicons/react/24/outline';

export function EcommerceAudience() {
  const audiences = [
    {
      icon: BuildingStorefrontIcon,
      title: 'Agências de Publicidade',
      description: 'Revenda a plataforma com sua marca e amplie seu portfólio de soluções digitais.'
    },
    {
      icon: SparklesIcon,
      title: 'Franquias e Redes',
      description: 'Lance lojas online rapidamente para todas as unidades com branding unificado.'
    },
    {
      icon: CubeIcon,
      title: 'Fabricantes de Personalizados',
      description: 'Venda diretamente para o consumidor final (D2C) sem intermediários.'
    },
    {
      icon: UsersIcon,
      title: 'Distribuidoras e Atacadistas',
      description: 'Canal B2B+B2C para vender produtos sem complexidade técnica.'
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section className="space-y-12">
      <motion.div className="max-w-2xl space-y-4" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
          Ideal para
        </h2>
        <p className="text-neutral-600 dark:text-neutral-300">
          A plataforma foi desenvolvida para empresas que querem vender produtos personalizados rapidamente, sem investir meses em desenvolvimento.
        </p>
      </motion.div>

      <motion.div
        className="grid gap-8 md:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {audiences.map((audience) => {
          const Icon = audience.icon;
          return (
            <motion.div
              key={audience.title}
              className="space-y-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-8 dark:border-neutral-800 dark:bg-neutral-900"
              variants={itemVariants}
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">{audience.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400">{audience.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
