export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: 'web' | 'mobile' | 'software' | 'devops';
  readingTime: string;
  publishedAt: string;
  tags: string[];
};

export const blogPosts: BlogPost[] = [
  {
    id: 'architecture-lighthouse',
    title: 'Arquitetando SPAs React com performance Lighthouse A+',
    slug: 'arquitetando-spas-react-performance-lighthouse',
    excerpt: 'Padrões de hidratação, streaming SSR e edge caching para entregar experiências rápidas e confiáveis.',
    category: 'web',
    readingTime: '8 min',
    publishedAt: '2025-08-12',
    tags: ['React 18', 'Performance', 'CDN']
  },
  {
    id: 'scrolltrigger-gsap',
    title: 'ScrollTrigger e GSAP: animações enterprise sem comprometer performance',
    slug: 'scrolltrigger-gsap-animacoes-enterprise',
    excerpt: 'Tricks avançados com timelines reativas, lazy motion e batching em pages complexas.',
    category: 'web',
    readingTime: '6 min',
    publishedAt: '2025-06-01',
    tags: ['GSAP', 'UX', 'Motion']
  },
  {
    id: 'supabase-rls',
    title: 'Supabase + RLS: segurança zero-trust em poucos passos',
    slug: 'supabase-rls-seguranca-zero-trust',
    excerpt: 'Como modelar políticas e roles para ambientes com dados sensíveis e auditoria em tempo real.',
    category: 'software',
    readingTime: '9 min',
    publishedAt: '2025-04-18',
    tags: ['Supabase', 'Security', 'RLS']
  },
  {
    id: 'observabilidade-otel',
    title: 'OpenTelemetry em escala: métricas, traces e logs conectados',
    slug: 'observabilidade-opentelemetry-escala',
    excerpt: 'Estratégias para instrumentar produtos complexos e criar painéis executivos que conversam com o negócio.',
    category: 'devops',
    readingTime: '7 min',
    publishedAt: '2025-03-02',
    tags: ['Observability', 'SRE', 'Dashboards']
  }
];
