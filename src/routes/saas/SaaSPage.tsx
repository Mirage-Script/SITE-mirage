import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { 
  ServerStackIcon, 
  ShieldCheckIcon, 
  ChartBarIcon, 
  CurrencyDollarIcon,
  CircleStackIcon,
  CogIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

import { Button } from '@/components/ui/Button';

export default function SaaSPage() {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Arquitetura Enterprise',
      description: 'Construída para alta disponibilidade e tolerância a falhas, garantindo que sua aplicação esteja sempre no ar.',
      icon: ServerStackIcon,
    },
    {
      title: 'Segurança e Conformidade',
      description: 'Dados isolados por tenant (Multi-tenant), criptografia de ponta a ponta e auditoria completa de acessos.',
      icon: ShieldCheckIcon,
    },
    {
      title: 'Analytics Integrada',
      description: 'Painéis administrativos completos com métricas em tempo real sobre uso, receita e comportamento dos usuários.',
      icon: ChartBarIcon,
    },
    {
      title: 'Pagamentos Recorrentes',
      description: 'Gestão de assinaturas, integrações com principais gateways de pagamento e faturamento automatizado.',
      icon: CurrencyDollarIcon,
    },
    {
      title: 'Banco de Dados Otimizado',
      description: 'Modelagem de dados flexível e escalável, utilizando as melhores práticas para performance e organização.',
      icon: CircleStackIcon,
    },
    {
      title: 'Customização Completa',
      description: 'Adapte a aparência, fluxos e integrações de acordo com a regra de negócio exclusiva da sua empresa.',
      icon: CogIcon,
    }
  ];

  const benefits = [
    'Time to Market reduzido',
    'Escalonamento sob demanda',
    'Infraestrutura gerenciada pela MIRAGE',
    'Update contínuo de segurança',
    'Suporte técnico dedicado',
    'APIs documentadas e prontas para uso'
  ];

  return (
    <div className="space-y-20 pb-20">
      <Helmet>
        <title>Software as a Service (SaaS) · MIRAGE</title>
        <meta
          name="description"
          content="Desenvolva sua própria plataforma SaaS escalável. Arquitetura robusta, multi-tenant e painel administrativo inclusos."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-neutral-900 px-6 py-24 sm:px-12 sm:py-32 lg:px-16 dark:bg-black">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-flex items-center rounded-full bg-primary/20 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-primary border border-primary/30 blur-[0.3px] mb-8">
              Plataforma Escalável
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl mb-6">
              O Motor do Seu Próximo <span className="text-primary">Grande Produto</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-neutral-300 mb-10">
              Desenvolva sua própria solução SaaS com arquitetura robusta, autenticação segura, 
              pagamentos recorrentes e painel administrativo já inclusos desde o primeiro dia.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8" onClick={() => navigate('/contato')}>
                Falar com Especialistas
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-4xl">
            Tudo que um SaaS de sucesso precisa
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Nossa base tecnológica resolve 80% dos desafios de engenharia iniciais, permitindo que você foque inteiramente na regra de negócio e nas vendas.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-neutral-200/60 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:border-accent/40 dark:hover:shadow-accent/5"
            >
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-gradient-to-br from-primary/0 via-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:via-accent/5" aria-hidden="true" />
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20 dark:text-accent dark:bg-accent/10 dark:group-hover:bg-accent/20">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-neutral-900 transition-colors group-hover:text-primary dark:text-neutral-100 dark:group-hover:text-accent">
                {feature.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] bg-neutral-100 dark:bg-neutral-900/80 p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-4xl">
              Foque no seu domínio. Nós cuidamos da tecnologia.
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg">
              Construir uma infraestrutura multi-tenant do zero leva meses de desenvolvimento caro e arriscado. Com a MIRAGE, você salta essa etapa e vai direto para a criação de valor.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {benefits.map((benefit, idx) => (
                <motion.div 
                  key={benefit} 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="flex flex-col gap-2 rounded-2xl border border-neutral-200/50 bg-white/50 p-4 transition-colors hover:border-primary/20 hover:bg-white dark:border-neutral-800/50 dark:bg-neutral-800/30 dark:hover:border-accent/30 dark:hover:bg-neutral-800/80"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircleIcon className="h-5 w-5 text-primary flex-shrink-0 dark:text-accent" />
                  </div>
                  <span className="text-sm font-medium text-neutral-800 dark:text-neutral-300">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
             <div className="aspect-square rounded-3xl bg-neutral-200 dark:bg-black/50 border border-neutral-300 dark:border-neutral-800 relative overflow-hidden flex items-center justify-center">
                {/* Abstract representation of SaaS architecture */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
                <div className="grid grid-cols-2 gap-4 p-8 w-full h-full">
                  <div className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800/80 p-4 shadow-sm animate-pulse-slow">
                     <div className="h-2 w-1/2 bg-neutral-200 dark:bg-neutral-600 rounded mb-4"></div>
                     <div className="space-y-2">
                       <div className="h-8 bg-neutral-100 dark:bg-neutral-700/50 rounded"></div>
                       <div className="h-8 bg-neutral-100 dark:bg-neutral-700/50 rounded"></div>
                     </div>
                  </div>
                  <div className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800/80 p-4 shadow-sm translate-y-8">
                     <div className="h-2 w-2/3 bg-neutral-200 dark:bg-neutral-600 rounded mb-4"></div>
                     <div className="h-24 bg-primary/10 rounded border border-primary/20 flex items-center justify-center">
                        <ChartBarIcon className="h-8 w-8 text-primary/50" />
                     </div>
                  </div>
                  <div className="col-span-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800/80 p-4 shadow-sm flex items-center justify-between">
                     <div className="flex gap-2 items-center">
                        <div className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                        <div className="h-2 w-24 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
                     </div>
                     <div className="h-6 w-16 bg-green-500/20 rounded-full flex items-center justify-center">
                        <div className="h-1.5 w-8 bg-green-500 rounded-full"></div>
                     </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="mx-auto max-w-4xl text-center space-y-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
          Pronto para transformar sua ideia em SaaS?
        </h2>
        <p className="text-neutral-600 dark:text-neutral-300 text-lg max-w-2xl mx-auto">
          Agende uma reunião com nossos arquitetos de software para desenhar a arquitetura ideal do seu novo produto.
        </p>
        <Button size="lg" className="h-12 px-8 text-base" onClick={() => navigate('/contato')}>
          Agendar Reunião Técnica
        </Button>
      </motion.section>
    </div>
  );
}
