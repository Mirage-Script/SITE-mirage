// src/data/services.ts (Modificado com 4 Cards e Novos Textos)

// ==================================================================
// DOCUMENTAÇÃO (MODIFICAÇÃO DO TIPO)
// Tornei a propriedade 'investment' opcional (investment?: string)
// para podermos removê-la dos nossos objetos sem causar um erro.
// ==================================================================
export type ServiceCategory = {
  id: string;
  title: string;
  description: string;
  features: string[];
  deliverables: string[];
  investment?: string; // <-- Agora é opcional
  badge?: string;
};

// ==================================================================
// DOCUMENTAÇÃO (MODIFICAÇÃO DOS DADOS)
// Este é o novo array de serviços.
// 1. Contém os 4 cards que definimos.
// 2. O 5º card ("immersive") foi removido.
// 3. Todos os textos foram atualizados para a nossa nova estratégia.
// 4. As propriedades 'investment' foram removidas.
// ==================================================================
export const services: ServiceCategory[] = [
  {
    id: 'discovery',
    title: 'Discovery & Estratégia',
    description:
      'O ponto de partida para o sucesso. Analisamos os seus objetivos de negócio e desenhamos o roadmap técnico completo da sua solução.',
    features: [
      'Workshops de Imersão e Requisitos',
      'Mapeamento da Jornada do Utilizador',
      'Definição de Arquitetura e Stack',
      'Protótipos Navegáveis (UI/UX)',
    ],
    deliverables: ['BLUEPRINT TÉCNICO', 'ROADMAP DO PRODUTO', 'PROTÓTIPO INTERATIVO'],
    badge: 'START RECOMENDADO',
  },
  {
    id: 'web',
    title: 'Desenvolvimento Web',
    description:
      'Criamos soluções web de alta performance, desde e-commerce e plataformas SaaS até landing pages otimizadas, com foco em SEO, escalabilidade e design.',
    features: [
      'Aplicações (React, Next.js, TypeScript)',
      'Design de Alto Impacto (GSAP & Motion)',
      'Integrações com APIs e CMS (Supabase, etc.)',
      'Otimização de Performance (Core Web Vitals)',
    ],
    deliverables: ['PLATAFORMA WEB COMPLETA', 'PLAYBOOKS DE DEVOPS', 'TESTES AUTOMATIZADOS'],
    badge: 'MAIS SOLICITADO',
  },
  {
    id: 'mobile',
    title: 'Desenvolvimento Mobile',
    description:
      'Desenvolvemos aplicações nativas (iOS/Android) e híbridas (React Native/Flutter) focadas na experiência do utilizador, performance e arquitetura offline-first.',
    features: [
      'Nativo (Swift, Kotlin) & Híbrido (React Native)',
      'Funcionalidades Offline-first e Push',
      'Análise e Monitoramento em Tempo Real',
      'Performance Mobile Otimizada',
    ],
    deliverables: ['PLAYBOOK DE RELEASE (STORES)', 'TESTES INSTRUMENTADOS', 'DOCUMENTAÇÃO TÉCNICA'],
  },
  {
    id: 'software',
    title: 'Engenharia de Software',
    description:
      'Para desafios complexos. Desenhamos e modernizamos sistemas internos (ERPs, CRMs), arquiteturas de microsserviços e automações seguras.',
    features: [
      'Arquitetura de Microsserviços & APIs',
      'Modernização de Código (Legacy)',
      'Governança de Dados com Auditoria',
      'Automação de Processos e Orquestração',
    ],
    deliverables: ['GUIA DE OPERAÇÃO', 'RUNBOOKS DE INCIDENTES', 'TREINAMENTOS HANDS-ON'],
    badge: 'SOLUÇÕES ROBUSTAS', // Adicionei este selo que definimos
  },
];