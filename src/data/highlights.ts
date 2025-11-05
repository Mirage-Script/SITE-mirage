// src/data/highlights.ts (MODIFICADO - Novos textos do Playbook)

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

// ==================================================================
// DOCUMENTAÇÃO: Este array (capabilityHighlights) NÃO foi modificado.
// Ele ainda é usado pelo ficheiro OperationalHighlights.tsx (agora com o seu logo).
// ==================================================================
export const capabilityHighlights: CapabilityHighlight[] = [
  {
    id: 'observability',
    title: 'Observabilidade total',
    description: 'Tracing distribuído, métricas de negócio e alarmes inteligentes com SLOs alinhados ao board.',
    signal: 'Grafana · OpenTelemetry · Kibana',
    detail: 'Health-checks em 47 microserviços e alertas com MTTR < 18min.',
  },
  {
    id: 'operacao',
    title: 'Operação 24/7 com playbooks',
    description: 'Runbooks versionados, respostas automatizadas e squads de prontidão com rotações saudáveis.',
    signal: 'PagerDuty · Incident IO · StatusPage',
    detail: 'Blameless postmortems com backlog de melhorias sempre atualizado.',
  },
  {
    id: 'security',
    title: 'Segurança desde a discovery',
    description: 'Threat modeling, RLS, feature flags com auditoria e scanners contínuos nas pipelines.',
    signal: 'Vault · SonarCloud · OWASP ASVS',
    detail: 'Zero incidentes críticos há 26 meses de operação.',
  },
  {
    id: 'delivery',
    title: 'Delivery previsível',
    description: 'Roadmaps fechados com métricas DORA, sprints com cadência firme e alinhamento com OKRs.',
    signal: 'Jira · Linear · Notion',
    detail: 'Lead time 42% menor que a média do setor.',
  },
];

// ==================================================================
// DOCUMENTAÇÃO (MODIFICAÇÃO)
//
// O array 'deliveryPlaybook' foi totalmente reescrito com os
// novos textos focados no cliente (Nossa Estratégia de "Timeline").
// ==================================================================
export const deliveryPlaybook: DeliveryStage[] = [
  {
    id: 'ignite',
    title: '1. Descoberta e Estratégia',
    duration: 'Semanas 0-2',
    focus: 'Entendemos a fundo o seu negócio e os seus objetivos.',
    outputs: [
      'Alinhamento de objetivos de negócio com a tecnologia.',
      'Mapeamento de riscos e oportunidades.',
      'Arquitetura técnica e roadmap inicial do projeto.',
    ],
  },
  {
    id: 'build',
    title: '2. Construção e Validação',
    duration: 'Semanas 3-8',
    focus: 'Construímos o seu produto em ciclos rápidos e visíveis.',
    outputs: [
      'Entregas semanais de software funcional para você testar.',
      'Código limpo, testado e pronto para escalar.',
      'Automação total do processo de entrega (CI/CD).',
    ],
  },
  {
    id: 'scale',
    title: '3. Lançamento e Performance',
    duration: 'Semanas 9-16',
    focus: 'Preparamos o seu produto para o mundo real e para o crescimento.',
    outputs: [
      'Testes de carga, performance e segurança.',
      'Monitoramento completo para otimizar a experiência do utilizador.',
      'Lançamento controlado e gradual (rollout).',
    ],
  },
  {
    id: 'run',
    title: '4. Evolução e Suporte',
    duration: 'Pós Lançamento',
    focus: 'O nosso trabalho continua para garantir a estabilidade e evolução.',
    outputs: [
      'Suporte técnico contínuo para garantir a estabilidade.',
      'Plano de evolução com novas features baseadas em dados.',
      'Relatórios de performance e otimizações.',
    ],
  },
];

// DOCUMENTAÇÃO: Este array (techMarqueeItems) NÃO foi modificado.
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
  'Lottie Animations',
];