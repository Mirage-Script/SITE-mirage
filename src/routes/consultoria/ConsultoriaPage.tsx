import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { 
  LightBulbIcon,
  MapIcon,
  CodeBracketIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  PresentationChartLineIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';

import { Button } from '@/components/ui/Button';

export default function ConsultoriaPage() {
  const navigate = useNavigate();

  const methodology = [
    {
      step: '01',
      title: 'Análise & Planejamento',
      description: 'Mergulhamos no seu negócio para identificar gargalos, ineficiências e oportunidades de digitalização de processos operacionais.',
      icon: LightBulbIcon,
    },
    {
      step: '02',
      title: 'Roadmap Técnico',
      description: 'Desenhamos a arquitetura de soluções ideais, escolhendo as tecnologias certas que se alinhem com seus objetivos de longo prazo.',
      icon: MapIcon,
    },
    {
      step: '03',
      title: 'Implementação',
      description: 'Nossa equipe de engenharia desenvolve, integra e faz o deploy seguro das novas ferramentas no ambiente da sua empresa.',
      icon: CodeBracketIcon,
    },
    {
      step: '04',
      title: 'Treinamento de Time',
      description: 'Capacitamos sua equipe para utilizar ao máximo as novas plataformas, garantindo adoção real e cultura digital efetiva.',
      icon: UserGroupIcon,
    }
  ];

  const outcomes = [
    {
      title: 'Aumento de Eficiência',
      description: 'Automatização de tarefas repetitivas e eliminação de processos manuais sujeitos a erro.',
      icon: ArrowTrendingUpIcon
    },
    {
      title: 'Decisões Baseadas em Dados',
      description: 'Implementação de dashboards e cultura orientada a métricas confiáveis e tempo real.',
      icon: PresentationChartLineIcon
    },
    {
      title: 'Vantagem Competitiva',
      description: 'Agilidade organizacional para responder mais rápido às necessidades do mercado moderno.',
      icon: CheckBadgeIcon
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      <Helmet>
        <title>Consultoria de Transformação Digital · MIRAGE</title>
        <meta
          name="description"
          content="Modernize sua operação com diagnóstico, estratégia e implementação de soluções digitais ponta a ponta."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-neutral-50 to-neutral-200 px-6 py-24 sm:px-12 sm:py-32 lg:px-16 dark:from-neutral-900 dark:to-neutral-950 border border-neutral-200 dark:border-neutral-800">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-6">
              Consultoria Estratégica
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-6xl mb-6">
              Modernize Sua <span className="text-primary italic">Operação</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600 dark:text-neutral-400 mb-10 leading-relaxed">
              Diagnosticamos, planejamos e implementamos a evolução tecnológica da sua empresa. Da ideação ao go-live, guiamos o seu crescimento no ambiente digital.
            </p>
            
            <div className="flex justify-center">
              <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/20" onClick={() => navigate('/contato')}>
                Agendar Diagnóstico Gratuito
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Methodology Tracker */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
            Nossa Metodologia
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Um processo claro e estruturado para garantir que a tecnologia implementada resolva problemas reais do seu negócio.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {methodology.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative overflow-hidden rounded-3xl border border-neutral-100 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:border-accent/40 dark:hover:shadow-accent/5"
            >
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-gradient-to-br from-primary/0 via-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:via-accent/5" aria-hidden="true" />
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-lg shadow-primary/30 dark:bg-accent dark:shadow-accent/30">
                {item.step}
              </div>
              <div className="mt-4 mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20 dark:bg-accent/10 dark:text-accent dark:group-hover:bg-accent/20">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-neutral-900 transition-colors group-hover:text-primary dark:text-neutral-100 dark:group-hover:text-accent">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-5xl border-t border-neutral-200 dark:border-neutral-800" />

      {/* Expected Outcomes */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center mb-12">
           <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
             O que esperar da transformação
           </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {outcomes.map((outcome, i) => (
            <motion.div
              key={outcome.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative flex flex-col items-center overflow-hidden rounded-3xl border border-neutral-200/50 bg-white/50 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-lg hover:shadow-primary/5 dark:border-neutral-800/50 dark:bg-neutral-800/30 dark:hover:border-accent/30 dark:hover:bg-neutral-800/80 dark:hover:shadow-accent/5"
            >
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-gradient-to-br from-primary/0 via-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:via-accent/5" aria-hidden="true" />
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:bg-primary/10 dark:bg-accent/5 dark:group-hover:bg-accent/10">
                <outcome.icon className="h-8 w-8 text-primary/80 transition-colors group-hover:text-primary dark:text-accent/80 dark:group-hover:text-accent" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-neutral-900 transition-colors group-hover:text-primary dark:text-neutral-100 dark:group-hover:text-accent">
                {outcome.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {outcome.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="rounded-[2.5rem] bg-primary px-8 py-16 text-center sm:px-16 flex flex-col items-center justify-center relative overflow-hidden">
          <h2 className="text-3xl font-bold text-white mb-6 relative z-10">
            Pronto para dar o próximo passo?
          </h2>
          <p className="text-primary-foreground/90 max-w-2xl mb-10 text-lg relative z-10">
            A transformação digital não é sobre tecnologia, é sobre estratégia. Converse com um especialista para entender o cenário da sua operação.
          </p>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-white text-primary border-none hover:bg-neutral-100 h-12 px-8 text-base shadow-xl relative z-10"
            onClick={() => navigate('/contato')}
          >
            Agendar Reunião de Consultoria
          </Button>
        </div>
      </section>
    </div>
  );
}
