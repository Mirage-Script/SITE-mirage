export type ServiceCategory = {
  id: string;
  title: string;
  description: string;
  features: string[];
  deliverables: string[];
  investment: string;
  badge?: string;
};

export const services: ServiceCategory[] = [
  {
    id: 'discovery',
    title: 'Discovery & Estratégia',
    description:
      'Workshops executivos, roadmap orientado por dados e arquitetura alvo para acelerar decisões de negócio com lastro técnico.',
    features: [
      'Mapeamento de usuários, métricas e riscos',
      'Canvas técnico com integrações críticas',
      'Priorização RICE + impacto financeiro',
      'Protótipos navegáveis e testes de usabilidade'
    ],
    deliverables: ['Blueprint técnico', 'Roadmap trimestral', 'Plano de governance & squads'],
    investment: 'A partir de R$ 12k',
    badge: 'Start recomendado'
  },
  {
    id: 'web',
    title: 'Desenvolvimento Web',
    description:
      'Aplicações React, Next.js e TypeScript com foco em escalabilidade, SEO e integrações Supabase, além de microinterações premium.',
    features: [
      'Pipelines CI/CD com observabilidade em tempo real',
      'Design systems acessíveis com Motion One e Storybook',
      'Integrações GraphQL, REST e Webhooks com caching',
      'Auditoria Lighthouse 95+ e Progressive Web Apps'
    ],
    deliverables: ['Arquitetura técnica completa', 'Playbooks de DevOps', 'Testes automatizados (unitários e E2E)'],
    investment: 'A partir de R$ 18k',
    badge: 'Mais solicitado'
  },
  {
    id: 'mobile',
    title: 'Desenvolvimento Mobile',
    description: 'Apps React Native e Flutter com arquitetura offline-first, push notifications e pipelines de publicação.',
    features: [
      'Integração com APIs e SDKs nativos',
      'Analytics e monitoramento em tempo real',
      'Testes em dispositivos físicos e simuladores',
      'Performance mobile otimizada'
    ],
    deliverables: ['Playbook de release store', 'Testes instrumentados', 'Documentação técnica'],
    investment: 'A partir de R$ 22k'
  },
  {
    id: 'software',
    title: 'Engenharia de Software',
    description: 'Soluções desktop, automações e integrações complexas com foco em segurança, observabilidade e RLS.',
    features: [
      'Arquitetura hexagonal e ports & adapters',
      'Automação de processos e orquestração',
      'Governança de dados com auditoria e RLS',
      'Dashboards operacionais e analytics'
    ],
    deliverables: ['Guia de operação', 'Runbooks de incidentes', 'Treinamentos hands-on'],
    investment: 'Sob demanda'
  },
  {
    id: 'immersive',
    title: 'Experiências Imersivas',
    description:
      'Landing pages cinematográficas, motion design e interações 3D com foco em impacto e conversão para campanhas premium.',
    features: [
      'Coreografias com GSAP ScrollTrigger + Lenis',
      'Lottie, Rive e microinterações com Framer Motion',
      'WebGL e Three.js para fundos generativos',
      'Narrativas interativas com áudio e storytelling'
    ],
    deliverables: ['Storyboard interativo', 'Biblioteca de animações reutilizáveis', 'Kit de performance e acessibilidade'],
    investment: 'A partir de R$ 28k',
    badge: 'Experiência premium'
  }
];
