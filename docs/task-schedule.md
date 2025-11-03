# MIRAGE · Task Schedule

## Semana 1 · Fundamentos GSAP/ScrollTrigger e Degradação Acessível

- Objetivo: padronizar padrões de scroll (pinning, scrub, parallax leve), sincronizar com Lenis e garantir degrade por `prefers-reduced-motion`.
- Tarefas:
  - Auditar animações atuais; remover jank e ajustar thresholds.
  - Criar util de sincronização Lenis + ScrollTrigger.
  - Definir contratos de animação (easing, durações, delays) e tokens.
  - Testes de regressão visual para estados degradados.
- Entregáveis:
  - Guia curto de padrões GSAP (docs/anims.md).
  - Tokens de animação (theme/tokens).

## Semana 2 · Dados e Dashboard (React Query + Supabase + Recharts)

- Objetivo: camada de cache para dados públicos/admin e painel com métricas.
- Tarefas:
  - Integrar React Query sobre `supabase-js` (queries, invalidations, suspense-ready).
  - Painel Admin: KPIs e séries temporais com Recharts; loading/empty/error states.
  - Rotas/serviços: contagem de posts/serviços/cases e eventos de conversão.
- Entregáveis:
  - Hook compartilhado para dados.
  - Admin com gráficos e filtros básicos.

## Semana 3 · Formulários e Celebrations (UX Completa)

- Objetivo: melhorar o fluxo de contato e reforçar senso de conquista.
- Tarefas:
  - Campos avançados: React Select, DatePicker, Input Mask; Zod + RHF; mensagens localizadas.
  - Confetti controlado (1x por conversão/sessão), respeitando `prefers-reduced-motion`.
  - Acessibilidade: navegação por teclado, foco visível, validação ARIA.
- Entregáveis:
  - ContactForm com campos avançados e feedback celebratório.
  - Testes de integração do fluxo.

## Semana 4 · Performance, Observabilidade e DX

- Objetivo: garantir budgets e visibilidade contínua de qualidade.
- Tarefas:
  - Orçamentos: JS inicial < 180 KB; CSS crítico; imagens responsivas (avif/webp/srcset).
  - Code splitting por rota/área; prefetch prudente.
  - Web Vitals + monitor de FPS; logs de jank; relatório semanal.
  - CI: lint/type-check/test + verifica tamanho de bundle.
- Entregáveis:
  - Relatório de performance e configuração de métricas contínuas.
  - Pipeline CI com gates de qualidade.

## Extensões (Opcional · Semanas 5–6)

- Cursor avançado (Mouse Follower) em páginas selecionadas; estados para links/mídia/drag.
- Sequências tipográficas multi-linhas; fallback sem FOUT/FOIT.
- Orquestração de estado reativo com Zustand/Jotai para cenas mais complexas.

## Continuidade

- Revisar backlog semanalmente com stakeholders.
- Manter README e `docs/task-list.md` sincronizados.
- Executar `npm run lint`, `npm run type-check` e `npm run test` ao fechar cada ciclo.
