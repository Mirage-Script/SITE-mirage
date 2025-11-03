# MIRAGE · Task Schedule

## Semana 1 · Tipografia e Microinterações

- **Objetivo**: Elevar headlines com animações tipográficas cinematográficas.
- **Tarefas**:
  - Integrar SplitType/TextScramble no Hero e CTAs críticos.
  - Garantir fallback acessível quando `prefers-reduced-motion` estiver ativo.
  - Criar testes de regressão visual (Jest DOM snapshots) para validar estados degradados.
- **Entregáveis**:
  - `HeroSection.tsx` atualizado com novas animações.
  - Documentação de uso na seção "Destaques" do README.

## Semana 2 · Imersão Visual

- **Objetivo**: Entregar hero imersivo e marquee com partículas reativas.
- **Tarefas**:
  - Prototipar cena Three.js/React Three Fiber com fallback estático.
  - Implementar partículas PixiJS no marquee técnico sincronizado com scroll.
  - Otimizar performance (suspense/lazy e medição de FPS).
- **Entregáveis**:
  - `HeroSection.tsx` com versão R3F + fallback.
  - Novo utilitário de monitoramento de performance em `src/lib/metrics`.
  - **Status**: ✅ Hero imersivo + PixiJS marquee entregues com monitor de performance ativo.

## Semana 3 · Feedback e Celebrations

- **Objetivo**: Fortalecer sensação de conquista em conversões.
- **Tarefas**:
  - Integrar React Confetti após submissão bem-sucedida de formulários.
  - Adicionar campos avançados (React Select, DatePicker, Input Mask) no fluxo de contato.
  - Garantir testes de acessibilidade (axe) e UX de teclado.
- **Entregáveis**:
  - `ContactForm.tsx` expandido com novos campos e feedback celebratório.
  - Storybook ou docs curtas demonstrando estados do formulário.

## Semana 4 · Dados e Estado Reativo

- **Objetivo**: Conectar Supabase em tempo real e dashboards de liderança.
- **Tarefas**:
  - Mapear fetch assíncrono com React Query ou SWR para dados editoriais.
  - Introduzir Recharts no dashboard administrativo para indicadores executivos.
  - Avaliar Zustand/Jotai para orquestrar estados de animação/dados.
- **Entregáveis**:
  - `AdminDashboard.tsx` com gráficos e camadas reativas.
  - Hook compartilhado (`src/hooks/useSupabaseQuery.ts`) com cache e suspense-ready.

## Continuidade

- Reavaliar backlog ao final de cada semana, incorporando insights de stakeholders.
- Manter README e `docs/task-list.md` sincronizados com o progresso.
- Rodar `npm run lint`, `npm run type-check` e `npm run test` ao concluir cada ciclo semanal.
