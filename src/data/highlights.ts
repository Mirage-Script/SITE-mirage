export type CapabilityHighlight = {
  id: string;
  title: string;
  description: string;
  signal: string;
  detail: string;
};

export type DeliveryStage = {
  id: string;
  title: string;
  duration: string;
  focus: string;
  outputs: string[];
};

export const capabilityHighlights: CapabilityHighlight[] = [
  {
    id: 'observability',
    title: 'Observabilidade total',
    description: 'Tracing distribuído, métricas de negócio e alarmes inteligentes com SLOs alinhados ao board.',
    signal: 'Grafana · OpenTelemetry · Kibana',
    detail: 'Health-checks em 47 microserviços e alertas com MTTR < 18min.'
  },
  {
    id: 'operacao',
    title: 'Operação 24/7 com playbooks',
    description: 'Runbooks versionados, respostas automatizadas e squads de prontidão com rotações saudáveis.',
    signal: 'PagerDuty · Incident IO · StatusPage',
    detail: 'Blameless postmortems com backlog de melhorias sempre atualizado.'
  },
  {
    id: 'security',
    title: 'Segurança desde a discovery',
    description: 'Threat modeling, RLS, feature flags com auditoria e scanners contínuos nas pipelines.',
    signal: 'Vault · SonarCloud · OWASP ASVS',
    detail: 'Zero incidentes críticos há 26 meses de operação.'
  },
  {
    id: 'delivery',
    title: 'Delivery previsível',
    description: 'Roadmaps fechados com métricas DORA, sprints com cadência firme e alinhamento com OKRs.',
    signal: 'Jira · Linear · Notion',
    detail: 'Lead time 42% menor que a média do setor.'
  }
];

export const deliveryPlaybook: DeliveryStage[] = [
  {
    id: 'ignite',
    title: 'Ignite · Semanas 0-2',
    duration: 'Semanas 0-2',
    focus: 'Fundamentos técnicos e de negócio',
    outputs: ['Discovery com stakeholders', 'Mapa de integrações e riscos', 'Arquitetura alvo e governança inicial']
  },
  {
    id: 'build',
    title: 'Build · Semanas 3-8',
    duration: 'Semanas 3-8',
    focus: 'Sprints com entregas incrementais e base sólida de testes',
    outputs: ['Design system & bibliotecas reutilizáveis', 'CI/CD com gates automatizados', 'Automação de QA e monitoramento']
  },
  {
    id: 'scale',
    title: 'Scale · Semanas 9-16',
    duration: 'Semanas 9-16',
    focus: 'Escala de performance, segurança e UX',
    outputs: ['Observabilidade 360º', 'Playbooks de operação e incidentes', 'Feature flags e rollout gradual']
  },
  {
    id: 'run',
    title: 'Run · Pós Go-Live',
    duration: 'Pós Go-Live',
    focus: 'Sustentação e otimização contínua',
    outputs: ['SLOs pactuados e revisões trimestrais', 'Roadmap evolutivo com squad dedicado', 'Governança de dados e compliance']
  }
];

export const techMarqueeItems: string[] = [
  'React 18 Concurrent',
  'Supabase Edge Functions',
  'PostgreSQL RLS',
  'GSAP ScrollTrigger',
  'Framer Motion 11',
  'Lenis Smooth Scroll',
  'Motion One',
  'React Router Data APIs',
  'Tailwind CSS 3.4',
  'Turborepo',
  'Playwright Tests',
  'Storybook Visual Tests',
  'Kubernetes GitOps',
  'CI/CD GitHub Actions',
  'Observabilidade OpenTelemetry',
  'Lottie Animations'
];
