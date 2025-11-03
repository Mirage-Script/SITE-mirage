# MIRAGE · Task Schedule

Este cronograma detalhado cobre planejamento por semanas (e extensões) para levar o site a nível enterprise, com foco em animações consistentes, performance, acessibilidade e dados.

## Semana 1 · Fundamentos GSAP/ScrollTrigger e Degradação Acessível

Objetivo
- Padronizar padrões de scroll (pinning, scrub, parallax leve), sincronizar com Lenis e garantir degrade por `prefers-reduced-motion`.

Tarefas
- Auditar animações atuais; remover jank e ajustar thresholds (start/end/scrub).
- Criar util de sincronização Lenis + ScrollTrigger e defaults centralizados.
- Definir contratos de animação (easing, durações, delays) e tokens.
- Refatorar componentes de reveal para usar tokens/defaults.
- Testes de regressão visual para estados degradados.

Entregáveis
- docs/anims.md com princípios e padrões.
- src/lib/animTokens.ts e src/lib/scroll.ts com defaults.
- SmoothScrollReveal migrado a tokens/defaults.

Critérios de aceite
- `prefers-reduced-motion` desativa parallax/scrub e usa transições simples.
- Animações sem jank perceptível em 60fps no desktop e dispositivos medianos.

## Semana 2 · Dados e Dashboard (React Query + Supabase + Recharts)

Objetivo
- Entregar camada de cache e painel com KPIs e séries temporais.

Tarefas
- Integrar React Query sobre `supabase-js` (queries, invalidations, suspense-ready).
- Admin: KPIs, séries temporais e distribuição por categoria com Recharts.
- Estados: loading/empty/error consistentes, tabela virtualizada se necessário.

Entregáveis
- Hooks de dados com cache e invalidação.
- Admin com gráficos e filtros básicos.

Critérios de aceite
- Requisições consolidadas via cache com invalidations explícitas.
- Gráficos responsivos e acessíveis (descrições/títulos legíveis por leitor de tela).

## Semana 3 · Formulários e Celebrations (UX Completa)

Objetivo
- Melhorar fluxo de contato e reforçar senso de conquista controlado.

Tarefas
- Campos avançados: React Select, DatePicker, Input Mask; validação Zod + RHF.
- Confetti controlado (1x por conversão/sessão), respeitando `prefers-reduced-motion`.
- Acessibilidade: navegação por teclado, foco visível, validação ARIA.

Entregáveis
- ContactForm com campos avançados e feedback celebratório.
- Testes de integração do fluxo.

Critérios de aceite
- Submissão com mensagens claras; erros localizados.
- Confetti não bloqueia interação; desabilitado sob reduced-motion.

## Semana 4 · Performance, Observabilidade e DX

Objetivo
- Garantir budgets, observar métricas e fortalecer a DX/CI.

Tarefas
- Orçamentos: JS inicial < 180 KB; CSS crítico; imagens responsivas (AVIF/WebP/srcset).
- Code splitting por rota/área; prefetch prudente.
- Web Vitals + monitor de FPS; logs de jank; relatório semanal.
- CI: lint/type-check/test + verificação de tamanho de bundle.

Entregáveis
- Relatório de performance e configuração de métricas contínuas.
- Pipeline CI com gates de qualidade.

Critérios de aceite
- LCP < 2.5s em rede 4G boa, CLS < 0.1, INP < 200ms.
- Build mantido dentro do budget; sem regressão de Vitals.

## Semana 5 · Cursor Avançado e Microinterações

Objetivo
- Refinar a percepção de qualidade através de feedbacks sutis e cursor avançado.

Tarefas
- Mouse Follower com estados (links, mídia, drag, "magnético").
- Microinterações consistentes em botões, cards e navegação.
- Degrade garantido: desativar cursor customizado quando necessário; teclado primeiro.

Entregáveis
- Cursor nas páginas selecionadas e catálogo de microinterações.

Critérios de aceite
- Sem interferir em foco/teclado; sem jank perceptível.

## Semana 6 · Tipografia e Narrativa Visual

Objetivo
- Sequências tipográficas multi-linhas com ênfase editorial.

Tarefas
- Sequências SplitType multi-linhas; atrasos adaptativos ao viewport.
- Fallback textual sem FOUT/FOIT; carregamento de fontes otimizado.

Entregáveis
- Headlines e seções chave com tipografia avançada.

Critérios de aceite
- Leitura sem layout shift; contraste e legibilidade preservados.

## Semana 7 · Cena R3F/Three.js e Fallbacks

Objetivo
- Consolidar a hero imersiva e garantir fallback robusto.

Tarefas
- Ajustes de materiais, pós-processamento leve e texturas otimizadas.
- Fallback estático em dispositivos modestos (via performance budget/hints).

Entregáveis
- Cena R3F com preset leve e fallback sólido.

Critérios de aceite
- FPS mínimo estável quando ativo; queda suave para fallback quando necessário.

## Semana 8 · Conteúdo Editorial e CMS

Objetivo
- Aplicar os padrões de dados a blog e cases com fluxo editorial claro.

Tarefas
- Listas e detalhes com estados (skeleton/empty/error) consistentes.
- Modo Admin para criação/edição básica.

Entregáveis
- Blog/cases integrados; admin com fluxo simples.

Critérios de aceite
- Conteúdo versão publicada visível publicamente; edição controlada.

## Extensões (Semanas 9–12)

- E2E/visual regressions guiados (onde fizer sentido) com limites enxutos.
- SEO técnico: metatags, OpenGraph, structured data, sitemaps.
- Internacionalização, se necessário.
- Edge Functions para rotinas de backend (opcional).

## Continuidade

- Revisar backlog semanalmente com stakeholders.
- Manter README e `docs/task-list.md` sincronizados.
- Executar `npm run lint`, `npm run type-check` e `npm run test` ao fechar cada ciclo.
