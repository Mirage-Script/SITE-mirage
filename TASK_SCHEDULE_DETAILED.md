# MIRAGE · Task Schedule Detalhado (Semanas 1–12+)

Cronograma completo com subtarefas, referências, critérios de aceite e dependências.

---

## SEMANA 1 · Consolidação de Padrões GSAP/ScrollTrigger e Remoção de Emojis

Objetivo: Padronizar todas as animações com tokens centralizados, remover emojis, garantir acessibilidade e degrade por prefers-reduced-motion.

### Subtarefas

#### 1.1 HeroSection
- Aplicar tokens (ANIM.duration.lg, ANIM.ease.out, ANIM.distance.y.lg)
- Remover emojis de badges/labels
- Garantir SplitType/Typed.js com fallback textual
- Testar prefers-reduced-motion (sem parallax, transições simples)
- Referências: GSAP ScrollTrigger docs, Sheryians hero animations
- Critério de aceite: Hero anima sem jank; reduced-motion desativa parallax; sem emojis

#### 1.2 TechMarquee (PixiJS)
- Sincronizar PixiJS com ScrollTrigger/Lenis
- Aplicar tokens de duração/ease
- Garantir fallback estático em dispositivos restritos
- Testar FPS em mobile
- Referências: PixiJS docs, GSAP + PixiJS patterns
- Critério de aceite: Marquee suave; FPS > 50 em mobile; fallback funciona

#### 1.3 StatsCounter
- Aplicar tokens de duração (md/lg)
- Remover emojis (já feito, validar)
- Garantir cleanup de ScrollTrigger local
- Testar acessibilidade (aria-live para números)
- Referências: GSAP counter patterns, Awwwards number animations
- Critério de aceite: Contadores animam com tokens; cleanup correto; acessível

#### 1.4 TestimonialsCarousel
- Aplicar tokens de duração/ease
- Remover emojis de avatares (já feito, validar)
- Garantir navegação por teclado (setas, Enter)
- Testar reduced-motion (sem scrub, transições simples)
- Referências: Framer Motion carousel patterns, GSAP stagger
- Critério de aceite: Carousel acessível; reduced-motion funciona; sem emojis

#### 1.5 ServicesOverview
- Aplicar tokens em fromTo (y, opacity, duration, ease)
- Remover emojis de badges
- Garantir stagger com delays adaptativos
- Testar viewport (start/end com tokens)
- Referências: GSAP stagger docs, Awwwards card reveals
- Critério de aceite: Cards revelam com padrão; stagger consistente; sem emojis

#### 1.6 CaseShowcase
- Aplicar tokens em timeline (duration, ease, stagger)
- Remover emojis de labels
- Garantir whileHover com Framer Motion (sem conflito com GSAP)
- Testar reduced-motion (sem hover animations)
- Referências: Framer Motion + GSAP integration, Awwwards case studies
- Critério de aceite: Cases revelam com timeline; hover suave; reduced-motion funciona

#### 1.7 BlogHighlights
- Aplicar tokens em skeleton loading
- Remover emojis de categorias
- Garantir loading state com duração consistente
- Testar acessibilidade (aria-busy, aria-label)
- Referências: React Loading Skeleton docs, Awwwards blog patterns
- Critério de aceite: Skeleton anima com tokens; aria-busy funciona; sem emojis

#### 1.8 DeliveryPlaybook
- Aplicar tokens em Framer Motion (initial, whileInView, transition)
- Remover emojis de outputs
- Garantir stagger com delays
- Testar reduced-motion (sem animações, apenas layout)
- Referências: Framer Motion docs, GSAP + Framer Motion patterns
- Critério de aceite: Playbook anima com tokens; reduced-motion funciona; sem emojis

#### 1.9 OperationalHighlights
- Aplicar tokens em Framer Motion (y, opacity, duration, ease)
- Remover emojis de signals
- Garantir viewport com amount consistente
- Testar reduced-motion
- Referências: Framer Motion viewport docs, Awwwards highlights
- Critério de aceite: Highlights revelam com tokens; reduced-motion funciona; sem emojis

#### 1.10 MagneticButton e Microinterações
- Refinar MagneticButton com tokens de ease/duration
- Criar padrão de hover effects (scale, color, shadow)
- Garantir acessibilidade (foco visível, keyboard nav)
- Testar em desktop e mobile
- Referências: Awwwards button interactions, GSAP easing, Framer Motion
- Critério de aceite: Botões magnéticos suaves; foco visível; sem jank

#### 1.11 Testes de Regressão Visual
- Criar snapshots de componentes com/sem reduced-motion
- Testar em viewport mobile/tablet/desktop
- Validar FPS em seções críticas
- Referências: Jest snapshots, Testing Library
- Critério de aceite: Snapshots passam; FPS > 50 em mobile; sem regressões

#### 1.12 Documentação e Guia de Padrões
- Atualizar docs/anims.md com exemplos de cada seção
- Criar guia de uso de tokens (quando usar md vs lg, etc.)
- Documentar padrões de reduced-motion
- Referências: GSAP docs, Framer Motion docs
- Critério de aceite: Documentação clara; exemplos funcionam; fácil para novos devs

### Entregáveis Semana 1
- Todas as seções com tokens aplicados
- Sem emojis em lugar algum (UI)
- Documentação de padrões atualizada
- Testes de regressão visual passando
- Build sem warnings; type-check passando

### Referências Semana 1
- GSAP ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- GSAP Showcase: https://gsap.com/showcase/
- Awwwards GSAP: https://www.awwwards.com/websites/gsap/
- Sheryians ScrollTrigger: https://www.youtube.com/watch?v=ouq6ks1zVAs
- Framer Motion: https://www.framer.com/motion/
- React Loading Skeleton: https://www.npmjs.com/package/react-loading-skeleton

---

## SEMANA 2 · Dados e Dashboard (React Query + Supabase + Recharts)

Objetivo: Camada de cache com React Query, painel admin com KPIs e séries temporais.

### Subtarefas

#### 2.1 Instalar Dependências
- npm i @tanstack/react-query recharts
- Validar versões compatíveis com React 18
- Atualizar package.json e lock file
- Referências: React Query docs, Recharts docs
- Critério de aceite: Dependências instaladas; build sem erros

#### 2.2 Configurar QueryClient e Providers
- Criar src/lib/queryClient.ts com configuração padrão
- Criar QueryClientProvider em src/providers/QueryProvider.tsx
- Integrar em src/index.tsx
- Configurar retry logic, staleTime, cacheTime
- Referências: React Query setup docs
- Critério de aceite: QueryClient funciona; providers integrados; sem erros

#### 2.3 Criar Hooks de Dados com Cache
- useContacts: fetch de contacts com cache/invalidation
- useNewsletter: fetch de newsletter_subscribers
- useBlogPosts: fetch de blog_posts (publicados)
- useCases: fetch de cases (publicados)
- useServices: fetch de services (publicados)
- Cada hook com: loading, error, data, refetch
- Referências: React Query hooks docs, Supabase client docs
- Critério de aceite: Hooks funcionam; cache funciona; invalidations funcionam

#### 2.4 Admin Dashboard com Gráficos Recharts
- KPI cards: total de contatos, newsletter subscribers, blog posts, cases
- Série temporal: contatos por dia (últimos 30 dias)
- Distribuição: contatos por serviço de interesse
- Distribuição: newsletter subscribers por período
- Estados: loading (skeleton), empty, error
- Referências: Recharts examples, Awwwards dashboards
- Critério de aceite: Gráficos renderizam; dados carregam; estados funcionam

#### 2.5 Integrar Dados Públicos em Seções
- BlogHighlights: carregar posts do Supabase (com fallback estático)
- CaseShowcase: carregar cases do Supabase (com fallback estático)
- ServicesOverview: carregar services do Supabase (com fallback estático)
- Cada seção com: loading skeleton, error message, empty state
- Referências: React Query + Supabase patterns
- Critério de aceite: Dados carregam; fallback funciona; sem jank

#### 2.6 Invalidações e Refetch
- Criar função para invalidar queries após submissão de contato
- Criar função para invalidar queries após opt-in de newsletter
- Testar invalidação em tempo real
- Referências: React Query invalidation docs
- Critério de aceite: Invalidações funcionam; dados atualizam em tempo real

#### 2.7 Testes de Dados e Cache
- Testar cache com múltiplas requisições
- Testar erro de rede (fallback)
- Testar loading states
- Testar invalidação
- Referências: React Query testing docs, Testing Library
- Critério de aceite: Testes passam; cache funciona; fallback robusto

### Entregáveis Semana 2
- React Query configurado e integrado
- Hooks de dados com cache/invalidation
- Admin dashboard com gráficos Recharts
- Seções públicas carregando dados do Supabase
- Testes de cache e fallback passando

### Referências Semana 2
- React Query: https://tanstack.com/query/latest
- Recharts: https://recharts.org/
- Supabase JS Client: https://supabase.com/docs/reference/javascript
- React Query + Supabase: https://supabase.com/docs/guides/realtime/extensions/postgres-changes

---

## SEMANA 3 · Formulários e Celebrations (UX Completa)

Objetivo: Campos avançados, validação robusta, confetti controlado, acessibilidade.

### Subtarefas

#### 3.1 Instalar Dependências de Formulários
- npm i react-select react-datepicker react-input-mask zod
- Validar compatibilidade
- Referências: React Select docs, React DatePicker docs, Zod docs
- Critério de aceite: Dependências instaladas; build sem erros

#### 3.2 Refatorar ContactForm com Campos Avançados
- Nome (text input com validação)
- Email (email input com validação)
- Telefone (input mask com validação)
- Empresa (text input)
- Serviço de interesse (React Select com opções)
- Data preferida (React DatePicker)
- Mensagem (textarea com validação)
- Cada campo com: validação Zod, mensagens de erro localizadas, aria-label
- Referências: React Hook Form docs, Zod docs, Awwwards form patterns
- Critério de aceite: Campos funcionam; validação funciona; acessível

#### 3.3 Implementar Validação com Zod + React Hook Form
- Criar schema Zod para ContactForm
- Integrar com useForm de React Hook Form
- Mensagens de erro customizadas
- Validação em tempo real (onChange)
- Referências: React Hook Form docs, Zod docs
- Critério de aceite: Validação funciona; mensagens claras; sem jank

#### 3.4 Confetti Controlado
- npm i react-confetti (ou similar)
- Implementar confetti após submissão bem-sucedida
- Duração: 2-3 segundos
- Respeitar prefers-reduced-motion (desativar)
- 1x por conversão/sessão (usar sessionStorage)
- Referências: React Confetti docs, Awwwards celebrations
- Critério de aceite: Confetti anima; respeita reduced-motion; 1x por sessão

#### 3.5 Toast Notifications
- Usar React Hot Toast (já instalado)
- Success toast após submissão
- Error toast se falhar
- Loading toast durante submissão
- Referências: React Hot Toast docs
- Critério de aceite: Toasts funcionam; mensagens claras

#### 3.6 Acessibilidade do Formulário
- Foco visível em todos os campos
- Navegação por teclado (Tab, Shift+Tab)
- aria-label em campos
- aria-describedby para mensagens de erro
- aria-live para toasts
- Testar com screen reader
- Referências: WCAG 2.1 AA, Axe DevTools
- Critério de aceite: Acessibilidade AA; keyboard nav funciona; screen reader funciona

#### 3.7 Newsletter Opt-in
- Criar campo de opt-in no footer
- Validação de email
- Confetti após opt-in
- Toast de sucesso
- Integrar com Supabase (newsletter_subscribers)
- Referências: Supabase docs, Awwwards newsletter patterns
- Critério de aceite: Opt-in funciona; dados salvam; confetti anima

#### 3.8 Testes de Formulário
- Testar validação (campos obrigatórios, formatos)
- Testar submissão (sucesso, erro)
- Testar acessibilidade (keyboard nav, screen reader)
- Testar confetti (1x por sessão)
- Referências: Testing Library, Jest
- Critério de aceite: Testes passam; cobertura > 80%

### Entregáveis Semana 3
- ContactForm com campos avançados
- Validação Zod + React Hook Form
- Confetti controlado
- Newsletter opt-in
- Acessibilidade AA
- Testes passando

### Referências Semana 3
- React Hook Form: https://react-hook-form.com/
- Zod: https://zod.dev/
- React Select: https://react-select.com/
- React DatePicker: https://reactdatepicker.com/
- React Confetti: https://www.npmjs.com/package/react-confetti
- WCAG 2.1: https://www.w3.org/WAI/WCAG21/quickref/

---

## SEMANA 4 · Performance, Observabilidade e DX

Objetivo: Budgets de bundle, Web Vitals, CI/CD gates, observabilidade.

### Subtarefas

#### 4.1 Análise de Bundle Atual
- npm run build
- Analisar tamanho de JS/CSS
- Identificar chunks grandes
- Referências: Webpack Bundle Analyzer
- Critério de aceite: Relatório gerado; tamanhos documentados

#### 4.2 Code Splitting por Rota
- Lazy load de rotas (Home, Services, Blog, Admin, Contact)
- Lazy load de componentes pesados (HeroImmersiveCanvas, PixiMarquee)
- Testar com React.lazy e Suspense
- Referências: React code splitting docs, Webpack docs
- Critério de aceite: Chunks separados; lazy loading funciona; sem jank

#### 4.3 Otimização de Imagens
- Converter imagens para AVIF/WebP
- Implementar srcset para responsividade
- Lazy load de imagens (loading="lazy")
- Otimizar tamanho de imagens
- Referências: Web.dev image optimization, Webpack image-webpack-loader
- Critério de aceite: Imagens otimizadas; srcset funciona; LCP < 2.5s

#### 4.4 CSS Crítico
- Identificar CSS crítico (above-the-fold)
- Inline CSS crítico em index.html
- Defer CSS não-crítico
- Referências: Webpack mini-css-extract-plugin, critical
- Critério de aceite: CSS crítico inlined; FCP < 1.8s

#### 4.5 Budgets de Bundle
- JS inicial: < 180 KB (gzipped)
- CSS: < 50 KB (gzipped)
- Imagens: < 500 KB (total)
- Configurar webpack budget analyzer
- Referências: Webpack performance hints, bundle-analyzer
- Critério de aceite: Budgets definidos; build falha se exceder

#### 4.6 Web Vitals e Monitoramento
- Implementar web-vitals library
- Medir LCP, FID, CLS, INP
- Criar dashboard de métricas (opcional: Vercel Analytics)
- Testar em rede 4G boa e 3G lenta
- Referências: Web Vitals docs, Vercel Analytics
- Critério de aceite: Métricas coletadas; LCP < 2.5s, CLS < 0.1, INP < 200ms

#### 4.7 Monitor de FPS e Jank
- Criar utilitário para medir FPS
- Detectar frames < 60fps
- Log de jank em console (dev mode)
- Referências: requestAnimationFrame, performance.now()
- Critério de aceite: FPS monitor funciona; jank detectado

#### 4.8 CI/CD Gates
- Lint: npm run lint (sem erros)
- Type-check: npm run type-check (sem erros)
- Build: npm run build (sem warnings)
- Bundle size: verificar budgets
- Testes: npm run test (cobertura > 70%)
- Configurar GitHub Actions
- Referências: GitHub Actions docs, Husky, lint-staged
- Critério de aceite: CI/CD pipeline funciona; gates bloqueiam PRs ruins

#### 4.9 Relatório de Performance
- Gerar relatório com Lighthouse
- Documentar métricas (LCP, FID, CLS, INP)
- Comparar antes/depois
- Referências: Lighthouse docs
- Critério de aceite: Relatório gerado; métricas documentadas

### Entregáveis Semana 4
- Code splitting implementado
- Imagens otimizadas (AVIF/WebP/srcset)
- CSS crítico inlined
- Budgets de bundle definidos
- Web Vitals coletados
- CI/CD gates configurados
- Relatório de performance

### Referências Semana 4
- Web Vitals: https://web.dev/vitals/
- Webpack: https://webpack.js.org/
- Lighthouse: https://developers.google.com/web/tools/lighthouse
- GitHub Actions: https://github.com/features/actions
- Vercel Analytics: https://vercel.com/analytics

---

## SEMANA 5 · Cursor Avançado e Microinterações

Objetivo: Mouse Follower com estados, microinterações refinadas, degrade garantido.

### Subtarefas

#### 5.1 Implementar Mouse Follower
- npm i mouse-follower (ou criar custom)
- Cursor segue mouse com lag suave
- Respeitar prefers-reduced-motion (desativar)
- Testar em desktop e mobile (desativar em touch)
- Referências: Mouse Follower docs, Awwwards cursor patterns
- Critério de aceite: Cursor segue mouse; suave; sem jank

#### 5.2 Estados do Cursor
- Estado padrão: círculo pequeno
- Estado link: aumenta, muda cor
- Estado mídia: aumenta, muda cor
- Estado drag: muda ícone
- Estado magnético: atrai para botão
- Implementar com data-attributes
- Referências: Awwwards hover patterns, GSAP easing
- Critério de aceite: Estados funcionam; transições suaves

#### 5.3 Microinterações em Botões
- Hover: scale + color + shadow
- Press: scale menor + feedback
- Focus: outline visível
- Disabled: opacity reduzida
- Usar tokens de ease/duration
- Referências: Awwwards button interactions, Framer Motion
- Critério de aceite: Microinterações suaves; acessível

#### 5.4 Microinterações em Cards
- Hover: translate Y + shadow
- Focus: outline visível
- Usar tokens de ease/duration
- Referências: Awwwards card patterns
- Critério de aceite: Cards interativos; suaves

#### 5.5 Microinterações em Links
- Hover: underline anima
- Focus: outline visível
- Usar tokens de ease/duration
- Referências: Awwwards link patterns
- Critério de aceite: Links interativos; suaves

#### 5.6 Degrade para Dispositivos Restritos
- Desativar cursor customizado em touch
- Desativar hover effects em mobile
- Usar media queries (hover: hover)
- Referências: CSS media queries, Awwwards responsive patterns
- Critério de aceite: Degrade funciona; mobile sem jank

#### 5.7 Testes de Microinterações
- Testar em desktop (mouse)
- Testar em mobile (touch)
- Testar com reduced-motion
- Testar acessibilidade (keyboard nav)
- Referências: Testing Library, Jest
- Critério de aceite: Testes passam; sem regressões

### Entregáveis Semana 5
- Mouse Follower implementado
- Estados do cursor funcionando
- Microinterações em botões, cards, links
- Degrade para dispositivos restritos
- Testes passando

### Referências Semana 5
- Mouse Follower: https://www.npmjs.com/package/mouse-follower
- Awwwards Interactions: https://www.awwwards.com/inspiration/hover-animations
- GSAP Easing: https://gsap.com/docs/v3/Eases/
- CSS Media Queries: https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries

---

## SEMANA 6 · Tipografia Avançada

Objetivo: SplitType multi-linhas, Typed.js headlines, fallback sem FOUT/FOIT.

### Subtarefas

#### 6.1 Implementar SplitType Multi-linhas
- npm i split-type (já pode estar instalado)
- Aplicar em headlines principais
- Animar por linha com atraso adaptativo
- Fallback textual sem FOUT/FOIT
- Referências: SplitType docs, Sheryians tutorials
- Critério de aceite: SplitType anima; fallback funciona; sem FOUT/FOIT

#### 6.2 Implementar Typed.js Headlines
- npm i typed.js (já pode estar instalado)
- Headlines dinâmicas em Hero
- Fallback textual
- Respeitar prefers-reduced-motion
- Referências: Typed.js docs
- Critério de aceite: Headlines digitam; fallback funciona; reduced-motion funciona

#### 6.3 Otimizar Carregamento de Fontes
- Usar font-display: swap
- Preload de fontes críticas
- Subset de fontes (apenas caracteres usados)
- Referências: Web.dev font optimization
- Critério de aceite: Fontes carregam rápido; sem FOUT/FOIT

#### 6.4 Acessibilidade de Tipografia
- Garantir contraste (WCAG AA)
- Tamanho mínimo de fonte (16px em mobile)
- Line-height adequado (1.5+)
- Testar com screen reader
- Referências: WCAG 2.1 AA, Axe DevTools
- Critério de aceite: Acessibilidade AA; screen reader funciona

#### 6.5 Testes de Tipografia
- Testar SplitType em diferentes viewports
- Testar Typed.js em diferentes velocidades
- Testar fallback sem JS
- Testar com reduced-motion
- Referências: Testing Library, Jest
- Critério de aceite: Testes passam; sem regressões

### Entregáveis Semana 6
- SplitType multi-linhas implementado
- Typed.js headlines funcionando
- Fontes otimizadas
- Acessibilidade AA
- Testes passando

### Referências Semana 6
- SplitType: https://www.npmjs.com/package/split-type
- Typed.js: https://github.com/mattboldt/typed.js
- Web.dev Font Optimization: https://web.dev/optimize-webfont-loading/
- WCAG 2.1: https://www.w3.org/WAI/WCAG21/quickref/

---

## SEMANA 7 · Cena R3F/Three.js e Fallbacks

Objetivo: Consolidar hero imersiva, garantir fallback robusto, performance budget para 3D.

### Subtarefas

#### 7.1 Auditar Cena R3F Atual
- Revisar HeroImmersiveCanvas
- Medir FPS em desktop/mobile
- Identificar gargalos
- Referências: Three.js performance tips, R3F docs
- Critério de aceite: Auditoria completa; gargalos identificados

#### 7.2 Otimizar Materiais e Texturas
- Usar materiais simples (MeshStandardMaterial)
- Reduzir resolução de texturas
- Usar baked lighting quando possível
- Referências: Three.js material docs, R3F examples
- Critério de aceite: FPS > 50 em mobile; materiais otimizados

#### 7.3 Pós-processamento Leve
- Usar EffectComposer com efeitos leves
- Bloom leve (se necessário)
- Tone mapping
- Referências: Three.js postprocessing, R3F examples
- Critério de aceite: Efeitos visuais; FPS > 50

#### 7.4 Fallback Estático Robusto
- Criar imagem estática de fallback
- Detectar performance budget (GPU, CPU)
- Usar fallback em dispositivos restritos
- Testar em mobile/tablet
- Referências: Performance budget detection, Awwwards fallbacks
- Critério de aceite: Fallback funciona; transição suave

#### 7.5 Performance Budget para 3D
- JS para R3F: < 100 KB (gzipped)
- Texturas: < 200 KB (total)
- Configurar webpack budget
- Referências: Webpack performance hints
- Critério de aceite: Budget definido; build falha se exceder

#### 7.6 Testes de 3D
- Testar em desktop (Chrome, Firefox, Safari)
- Testar em mobile (iOS, Android)
- Testar com reduced-motion
- Testar fallback
- Referências: Testing Library, Jest
- Critério de aceite: Testes passam; sem regressões

### Entregáveis Semana 7
- Cena R3F otimizada
- Materiais e texturas otimizados
- Fallback estático robusto
- Performance budget para 3D
- Testes passando

### Referências Semana 7
- Three.js: https://threejs.org/
- React Three Fiber: https://docs.pmnd.rs/react-three-fiber/
- Three.js Performance: https://threejs.org/manual/#en/optimize
- R3F Examples: https://github.com/pmndrs/react-three-fiber/tree/master/examples

---

## SEMANA 8 · Conteúdo Editorial e CMS

Objetivo: Blog/cases integrados com dados, admin com fluxo de criação/edição, estados consistentes.

### Subtarefas

#### 8.1 Página de Blog
- Listar posts com paginação
- Filtrar por categoria
- Buscar por título/tags
- Carregar dados do Supabase (com React Query)
- Estados: loading (skeleton), empty, error
- Referências: React Query docs, Supabase docs
- Critério de aceite: Blog funciona; dados carregam; estados funcionam

#### 8.2 Página de Detalhe de Post
- Exibir post completo
- Navegação anterior/próximo
- Comentários (opcional)
- Carregar dados do Supabase
- Estados: loading, error
- Referências: React Router docs, Supabase docs
- Critério de aceite: Detalhe funciona; dados carregam; navegação funciona

#### 8.3 Página de Cases
- Listar cases com paginação
- Filtrar por indústria/tecnologia
- Buscar por título
- Carregar dados do Supabase
- Estados: loading, empty, error
- Referências: React Query docs, Supabase docs
- Critério de aceite: Cases funciona; dados carregam; estados funcionam

#### 8.4 Página de Detalhe de Case
- Exibir case completo
- Galeria de imagens
- Navegação anterior/próximo
- Carregar dados do Supabase
- Estados: loading, error
- Referências: React Router docs, Supabase docs
- Critério de aceite: Detalhe funciona; galeria funciona; navegação funciona

#### 8.5 Admin: Criar Post
- Formulário com campos: título, slug, excerpt, content, category, tags, featured_image
- Validação com Zod
- Upload de imagem (Supabase Storage)
- Salvar em Supabase
- Toast de sucesso/erro
- Referências: React Hook Form docs, Supabase Storage docs
- Critério de aceite: Formulário funciona; dados salvam; imagem faz upload

#### 8.6 Admin: Editar Post
- Carregar post existente
- Formulário pré-preenchido
- Atualizar em Supabase
- Toast de sucesso/erro
- Referências: React Hook Form docs, Supabase docs
- Critério de aceite: Formulário funciona; dados atualizam

#### 8.7 Admin: Deletar Post
- Confirmação de deleção
- Deletar em Supabase
- Invalidar cache
- Toast de sucesso/erro
- Referências: Supabase docs, React Query invalidation
- Critério de aceite: Deleção funciona; cache invalida

#### 8.8 Admin: Criar/Editar/Deletar Case
- Mesmos passos que posts
- Campos adicionais: client_name, industry, technologies, results, gallery_images
- Referências: React Hook Form docs, Supabase docs
- Critério de aceite: CRUD funciona; dados salvam

#### 8.9 Testes de Editorial
- Testar CRUD de posts
- Testar CRUD de cases
- Testar paginação
- Testar filtros
- Testar busca
- Referências: Testing Library, Jest
- Critério de aceite: Testes passam; cobertura > 80%

### Entregáveis Semana 8
- Página de blog com paginação/filtros
- Página de detalhe de post
- Página de cases com paginação/filtros
- Página de detalhe de case
- Admin com CRUD de posts
- Admin com CRUD de cases
- Testes passando

### Referências Semana 8
- React Router: https://reactrouter.com/
- Supabase: https://supabase.com/docs
- React Query: https://tanstack.com/query/latest
- React Hook Form: https://react-hook-form.com/

---

## SEMANAS 9–12 · Extensões e Refinamentos

### Semana 9 · Testes E2E e Regressão Visual
- Implementar Playwright para testes E2E
- Testar fluxos críticos (contato, newsletter, admin)
- Testes de regressão visual com Percy/Chromatic
- Referências: Playwright docs, Percy docs

### Semana 10 · SEO Técnico
- Metatags (title, description, og:image, etc.)
- Structured data (JSON-LD)
- Sitemaps
- Robots.txt
- Canonical tags
- Referências: Web.dev SEO, Schema.org

### Semana 11 · Internacionalização (i18n)
- npm i i18next react-i18next
- Traduzir conteúdo para EN/PT
- Seletor de idioma
- Referências: i18next docs, react-i18next docs

### Semana 12 · Edge Functions e Webhooks
- Criar Edge Functions no Supabase para lógica backend
- Webhooks para notificações (email, Slack)
- Referências: Supabase Edge Functions docs

---

## Dependências Críticas

- Semana 1: Nenhuma (já temos tudo)
- Semana 2: @tanstack/react-query, recharts
- Semana 3: react-select, react-datepicker, react-input-mask, zod, react-confetti
- Semana 4: Nenhuma (webpack já instalado)
- Semana 5: mouse-follower (opcional)
- Semana 6: split-type, typed.js (já podem estar instalados)
- Semana 7: Nenhuma (R3F já instalado)
- Semana 8: Nenhuma (Supabase já instalado)
- Semana 9: @playwright/test
- Semana 10: Nenhuma
- Semana 11: i18next, react-i18next
- Semana 12: Nenhuma

---

## Critérios de Aceite Globais

- Sem emojis em lugar algum (UI)
- Acessibilidade WCAG 2.1 AA para fluxos críticos
- prefers-reduced-motion respeitado em tudo
- Sem jank perceptível (FPS > 50 em mobile)
- Type-check passando (npm run type-check)
- Lint passando (npm run lint)
- Build sem warnings
- Testes com cobertura > 70%
- Performance budgets respeitados

---

## Referências Gerais

- GSAP: https://gsap.com/
- Framer Motion: https://www.framer.com/motion/
- React: https://react.dev/
- TypeScript: https://www.typescriptlang.org/
- Tailwind CSS: https://tailwindcss.com/
- Supabase: https://supabase.com/
- Web.dev: https://web.dev/
- Awwwards: https://www.awwwards.com/
- MDN: https://developer.mozilla.org/

---

## Próximos Passos Imediatos

1. Começar Semana 1: Aplicar tokens em todas as seções
2. Remover emojis restantes
3. Garantir prefers-reduced-motion em tudo
4. Fazer commits incrementais
5. Testar em desktop/mobile/tablet
6. Documentar padrões
7. Preparar Semana 2 (instalar dependências)

