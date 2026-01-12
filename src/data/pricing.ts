// src/data/pricing.ts - Planos de Serviços MIRAGE

export type PricingPlan = {
  id: string;
  name: string;
  subtitle?: string;
  setup: number; // em BRL
  monthly: number; // em BRL
  yearCost?: number; // custo total ano 1
  badge?: string;
  highlighted?: boolean;
  description: string;
  features: Array<{ name: string; included: boolean }>;
  deliverables: string[];
  supportLevel: string;
  cta: string;
};

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    subtitle: 'Para testar',
    setup: 5000,
    monthly: 799,
    yearCost: 14588,
    description: 'Ideal para pequenos projetos e primeiros clientes. Prototipagem rápida com suporte básico.',
    features: [
      { name: 'Análise & Planejamento (1 semana)', included: true },
      { name: 'Desenvolvimento Web (até 4 semanas)', included: true },
      { name: 'Design (Templates pré-definidos)', included: true },
      { name: 'Testes Básicos', included: true },
      { name: 'Suporte Email (48h)', included: true },
      { name: 'Documentação Técnica', included: true },
      { name: 'Customização Visual Avançada', included: false },
      { name: 'Suporte Prioritário (2h)', included: false },
      { name: 'Desenvolvimento Contínuo (4h/mês)', included: false },
    ],
    deliverables: ['Aplicação Web', 'Documentação Técnica', 'Playbook de Deploy'],
    supportLevel: 'Email (48h)',
    cta: 'Começar com Starter',
  },
  {
    id: 'professional',
    name: 'Professional',
    subtitle: 'Recomendado',
    setup: 9000,
    monthly: 1199,
    yearCost: 23388,
    badge: '⭐ Mais Popular',
    highlighted: true,
    description: 'Perfeito para agências e PMEs. Solução completa com customização e suporte robusto.',
    features: [
      { name: 'Análise & Planejamento (2 semanas)', included: true },
      { name: 'Desenvolvimento Web (até 8 semanas)', included: true },
      { name: 'Desenvolvimento Mobile (React Native)', included: true },
      { name: 'Design Customizado', included: true },
      { name: 'Testes Automatizados', included: true },
      { name: 'Suporte Email + Chat (24h)', included: true },
      { name: 'Desenvolvimento Contínuo (4h/mês)', included: true },
      { name: 'API Customizadas', included: true },
      { name: 'Suporte Prioritário (2h)', included: false },
      { name: 'Reunião Mensal Strategy', included: false },
    ],
    deliverables: ['Aplicação Web + Mobile', 'Playbooks de DevOps', 'Testes Automatizados', 'Documentação Viva'],
    supportLevel: 'Email + Chat (24h)',
    cta: 'Começar com Professional',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    subtitle: 'Para empresas',
    setup: 15000,
    monthly: 2499,
    yearCost: 44988,
    badge: '🚀 Dedicado',
    description: 'Solução premium com suporte dedicado, desenvolvimento contínuo e programa de afiliados.',
    features: [
      { name: 'Análise & Planejamento (4 semanas)', included: true },
      { name: 'Desenvolvimento Full-Stack', included: true },
      { name: 'Web + Mobile + Backend Robusto', included: true },
      { name: 'Design de Alta Performance', included: true },
      { name: 'Testes Completos (Unit + E2E)', included: true },
      { name: 'Suporte Prioritário (2h resposta)', included: true },
      { name: 'Desenvolvimento Contínuo (16h/mês)', included: true },
      { name: 'Reunião Mensal Strategy', included: true },
      { name: 'Integração ERP/CRM', included: true },
      { name: 'Programa de Afiliados (30% comissão)', included: true },
    ],
    deliverables: [
      'Sistema Completo (Web + Mobile + API)',
      'Runbooks de Incidentes',
      'Treinamentos Hands-On',
      'Suporte Dedicado 24/7',
    ],
    supportLevel: 'Dedicado (2h)',
    cta: 'Falar com Especialista',
  },
];

export type Feature = {
  name: string;
  icon?: string;
  description: string;
};

export const pricingFeatures: Feature[] = [
  {
    name: 'Análise & Planejamento',
    description: 'Análise profunda dos requisitos e roadmap técnico',
  },
  {
    name: 'Desenvolvimento Web',
    description: 'React, Next.js, TypeScript, GSAP e Motion',
  },
  {
    name: 'Desenvolvimento Mobile',
    description: 'React Native, iOS nativo, Android nativo',
  },
  {
    name: 'Design Customizado',
    description: 'UI/UX de alto impacto com prototipagem',
  },
  {
    name: 'Testes Automatizados',
    description: 'Unit tests, integration tests, E2E',
  },
  {
    name: 'Suporte Técnico',
    description: 'Email, chat, ou suporte prioritário dedicado',
  },
];

export type FAQ = {
  question: string;
  answer: string;
};

export const pricingFAQ: FAQ[] = [
  {
    question: 'Posso começar com um plano e mudar depois?',
    answer:
      'Sim! Você pode fazer upgrade ou downgrade a qualquer momento. Ajustamos o valor proporcionalmente no próximo ciclo de faturamento.',
  },
  {
    question: 'Há contrato mínimo?',
    answer:
      'Nenhum contrato de longa duração. Você pode cancelar com 30 dias de aviso. Se quiser, oferecemos descontos para compromissos anuais.',
  },
  {
    question: 'O que está incluído no "Desenvolvimento Contínuo"?',
    answer:
      'Horas de desenvolvimento para bugs, melhorias, novas funcionalidades e suporte técnico. Planos menores têm menos horas, Enterprise tem 16h/mês.',
  },
  {
    question: 'Como funciona o programa de afiliados (Enterprise)?',
    answer:
      'Você ganha 30% de comissão por cada cliente que refere. Se trazer 2-3 clientes Professional por mês, a comissão já cobre seu plano!',
  },
  {
    question: 'Posso pedir customizações fora do escopo?',
    answer:
      'Claro. Oferecemos horas adicionais por R$ 250/h. Professional e Enterprise têm horas incluídas para desenvolvimento contínuo.',
  },
  {
    question: 'Incluem reuniões de alinhamento?',
    answer:
      'Starter: nenhuma. Professional: sob demanda. Enterprise: 1 reunião mensal obrigatória + 2 opcionais para alinhamento estratégico.',
  },
];

export type Testimonial = {
  name: string;
  company: string;
  role: string;
  quote: string;
  avatar?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: 'João Silva',
    company: 'Agência XYZ',
    role: 'Fundador',
    quote:
      'Conseguimos implementar a plataforma em 3 semanas. O suporte deles respondeu todas as dúvidas técnicas rapidinho. Voltaria a chamar com certeza.',
  },
  {
    name: 'Maria Santos',
    company: 'E-commerce Plus',
    role: 'Diretora de Produto',
    quote:
      'Desde o primeiro dia ficou claro que sabiam do que estavam falando. Design impecável, código limpo, documentação excelente. Recomendo!',
  },
  {
    name: 'Carlos Oliveira',
    company: 'TechStudio',
    role: 'CTO',
    quote:
      'O plano Enterprise valeu cada centavo. Temos um time dedicado resolvendo problemas e implementando features. Impacto direto nos resultados.',
  },
];
