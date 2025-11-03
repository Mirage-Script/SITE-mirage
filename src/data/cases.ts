export type CaseStudy = {
  id: string;
  client: string;
  title: string;
  description: string;
  metrics: { label: string; value: string }[];
  stack: string[];
  quote: string;
  author: string;
  role: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: 'saas-analytics',
    client: 'Atlas Insights',
    title: 'Plataforma SaaS de Analytics em tempo real',
    description:
      'Migração de monólito legado para arquitetura de microsserviços com front-end React e Supabase para autenticação e armazenamento.',
    metrics: [
      { label: 'Time-to-Market', value: '-63%' },
      { label: 'Disponibilidade', value: '99.98%' },
      { label: 'Engajamento', value: '+240%' }
    ],
    stack: ['React 18', 'Supabase', 'PostgreSQL', 'Kubernetes'],
    quote:
      'A MIRAGE entregou engenharia e operação com padrão enterprise. O cuidado com observabilidade e performance foi decisivo.',
    author: 'Paula Reis',
    role: 'CTO · Atlas Insights'
  },
  {
    id: 'fintech-core',
    client: 'CorePay',
    title: 'Core bancário modular com segurança zero-trust',
    description:
      'Projeto de arquitetura, desenvolvimento e implantação de módulos transacionais com foco em governança, observabilidade e RLS.',
    metrics: [
      { label: 'Fraudes evitadas', value: 'R$ 8.4M' },
      { label: 'Cobertura de testes', value: '92%' },
      { label: 'Média de deploys', value: '14/dia' }
    ],
    stack: ['React Native', 'Go', 'Supabase', 'Vault'],
    quote: 'Equipe altamente técnica, com processos maduros. A entrega elevou nosso roadmap em meses.',
    author: 'Fernando Lopes',
    role: 'Head de Engenharia · CorePay'
  },
  {
    id: 'energy-digital-twin',
    client: 'GridWave Energy',
    title: 'Digital twin industrial com edge analytics e IA',
    description:
      'Implementação de gêmeo digital para plantas de energia com ingestão em tempo real, dashboards executivos e alarmes preditivos.',
    metrics: [
      { label: 'Redução de downtime', value: '-71%' },
      { label: 'Alertas preditivos', value: '1.2k/mês' },
      { label: 'Retorno em CAPEX', value: '+18%' }
    ],
    stack: ['React 18', 'Supabase Edge', 'TensorFlow', 'Grafana'],
    quote:
      'A MIRAGE entregou uma stack robusta que conecta operação, dados e negócio com precisão impressionante.',
    author: 'Larissa Mendonça',
    role: 'Diretora de Operações · GridWave'
  }
];
