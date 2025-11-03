# MIRAGE · Backlog Priorizado e Referências

## Concluído (baseline de experiência)
- [x] Hero imersiva com Three.js + React Three Fiber e fallback estático (performance budget e degrade).
- [x] Partículas com PixiJS no marquee técnico (overlay responsivo sincronizado com scroll).
- [x] Tipografia avançada com SplitType/TextScramble aplicada a Hero e CTAs.
- [x] Skeleton loaders contextuais com React Loading Skeleton (Blog e Admin).

## Backlog priorizado

### Animações e Interações (GSAP/ScrollTrigger)
- [ ] Celebrations após conversões (Confetti controlado por estado; respeitar `prefers-reduced-motion`).
  - [ ] Mostrar 1x por sessão/conversão e encerrar em < 3s;
  - [ ] Cobrir submit de contato e opt-in de newsletter.
- [ ] Cursor avançado (Mouse Follower) em páginas selecionadas com estados: link, mídia, drag e “magnetic”.
  - [ ] Garantir foco/teclado e degrade sem cursor customizado quando necessário.
- [ ] Padrões ScrollTrigger: pinning, scrub reveal, parallax leve e sequência de steps.
  - [ ] Sincronizar com Lenis; desacoplar animações do main thread quando possível.
- [ ] Microinterações refinadas: MagneticButton (inércia), hover-lag, press states e easing consistente.

### Tipografia e Conteúdo Editorial
- [ ] Sequências SplitType multi-linhas com atraso adaptativo; fallback textual sem FOUT/FOIT.
- [ ] Headlines dinâmicas com Typed.js com acessibilidade (aria-live="polite").

### Dados e Dashboard (Supabase)
- [ ] Integrar camada de cache com React Query (ou SWR) sobre `supabase-js`.
  - [ ] Queries: posts (publicados), serviços, cases, newsletter_subscribers (contagem), contatos (admin).
  - [ ] Invalidations por evento de criação/edição.
- [ ] Dashboard executivo (Admin) com Recharts: KPIs, séries temporais e distribuição por categoria.
  - [ ] Virtualização de tabela se > 1k linhas; loading states e empty states padronizados.

### Formulários e UX
- [ ] Campos avançados no contato: Select (React Select), DatePicker, Input Mask e validação com Zod/Hook Form.
  - [ ] Mensagens de erro localizadas; máscaras para telefone/documento; keyboard-first UX.

### Acessibilidade e Qualidade
- [ ] Auditoria com axe e keyboard nav: foco visível, skip links, ordem de tabulação.
- [ ] `prefers-reduced-motion`: desativar parallax/scrub; oferecer transições simples.
- [ ] Testes de regressão visual e de interação (Testing Library + Jest DOM snapshots controlados).

### Performance e Observabilidade
- [ ] Budget de bundle: JS inicial < 180 KB; CSS crítico inline; images responsivas (srcset/avif/webp).
- [ ] Code splitting por rota/área; prefetch prudente; compressão e cache no CDN.
- [ ] Métricas Web Vitals (LCP/FID/CLS/INP) + monitor de FPS; logs de “scroll jank” e quedas de FPS.

### DevEx e CI/CD
- [ ] Lint/type-check no CI; verificação de tamanhos (bundle analyzer) e limites de orçamento.
- [ ] Husky + lint-staged; convenções de commit e PR templates.

## Critérios de aceite gerais
- [ ] Acessibilidade AA (WCAG 2.1) para fluxos críticos.
- [ ] Degradação funcional quando animações estiverem desabilitadas.
- [ ] Sem regressão de performance considerando o budget definido.
- [ ] Testes unitários mínimos para interações críticas e carregamento de dados.

## Referências e inspiração (GSAP/ScrollTrigger/Three.js)

### Plataformas de showcases
- Awwwards GSAP: https://www.awwwards.com/websites/gsap/
- Awwwards ScrollTrigger (inspiração): https://www.awwwards.com/inspiration/scrolltrigger-and-hover-animations-sprocket-studio
- Awwwards Three.js: https://www.awwwards.com/websites/three-js/
- GSAP Showcase: https://gsap.com/showcase/
- GSAP Demos: https://gsap.com/demos/
- Made With GSAP: https://madewithgsap.com

### Tutoriais e vídeos avançados
- Sheryians – ScrollTrigger avançado: https://www.youtube.com/watch?v=ouq6ks1zVAs
- GSAP ScrollTrigger 3D (rebuild): https://www.youtube.com/live/aAGypqJd818
- Three.js + React (portfólio 3D): https://www.youtube.com/watch?v=KGCMSaEWPVs
- 3D portfolio end-to-end: https://www.youtube.com/watch?v=kt0FrkQgw8w

### Repositórios GitHub
- Tópicos GSAP: https://github.com/topics/gsap
- GSAP Animations (coleção): https://github.com/RanitManik/GSAP-Animations
- GSAP starter (workshop): https://github.com/JavaScript-Mastery-Pro/gsap-cc-starter
- GSAP oficial: https://github.com/greensock/GSAP
- Three.js exemplos: https://threejs.org/examples/
- Tópicos GSAP + animações: https://github.com/topics/gsap-animation

### Sites e portfolios de referência
- Apple iPhone 15 Pro (GSAP + Three.js), Brain Bakery, Bubka, Louis Ansa, Limnia, Waaark, Otherlife, Sprocket Studio.

### Code examples e galleries
- CodePen GSAP: https://codepen.io/collection/gsap
- GreenSock no CodePen: https://codepen.io/GreenSock
- Coleções curadas (GSAP Forums): https://gsap.com/community/forums/topic/32378-curated-collection-of-gsap-examples-for-inspiration-with-code/
- Webflow showcases GSAP: https://webflow.com/made-in-webflow/gsap%20animation
- R3F examples (pmndrs marketplace): https://market.pmnd.rs/
- Sketchfab (modelos 3D): https://sketchfab.com

### Animações específicas
- Texto/Tipografia: SplitType, Typed.js, TextScramble
- Scroll/Interações: Lenis (smooth), Mouse Follower, padrões de pinning/reveal
- Canvas/WebGL: PixiJS, shader-doodle, React Three Fiber

### Prioridade de estudo
1) Awwwards GSAP collection (padrões); 2) GSAP Showcase (casos enterprise);
3) Sheryians/GSAP 3D; 4) Abordagem Bruno Simon (R3F storytelling);
5) Tópicos GSAP no GitHub (referências de código).