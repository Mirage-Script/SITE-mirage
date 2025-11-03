# Padrões de Animação (GSAP, ScrollTrigger, Lenis)

Este guia define padrões reutilizáveis para garantir consistência, acessibilidade e performance.

## Princípios
- Movimentos sutis por padrão; evitar overshoot agressivo.
- Honrar `prefers-reduced-motion` com transições simples (sem parallax/scrub).
- Evitar jank: sincronizar Lenis com ScrollTrigger e minimizar trabalho no main thread.

## Tokens e Defaults
- Tokens centralizados em `src/lib/animTokens.ts`.
- Defaults de scroll/reveal em `src/lib/scroll.ts`.

## Reveal padrão
- start: `top 80%`, end: `top 50%`, scrub: `1` (desligado se reduced-motion).
- deslocamento vertical e leve escala; duração `lg`.

## Implementação
- Componente de exemplo: `SmoothScrollReveal` usa tokens e defaults.
- Utilitário para Lenis + ScrollTrigger: `bindLenisToScrollTrigger` (opcional nos hooks).

## Acessibilidade
- `useReducedMotion` e `matchMedia('(prefers-reduced-motion: reduce)')`.
- Garantir foco visível e navegação por teclado sem dependência visual da animação.

## Performance
- Orçamentos: JS inicial < 180 KB; dividir por rota; lazy load de cenas pesadas.
- Medir Web Vitals (LCP, CLS, INP) e monitorar FPS para cenários críticos.

---

## Seções Implementadas (Semana 1)

### ✅ HeroSection
- Tokens: `ANIM.duration.lg`, `ANIM.ease.out`, `ANIM.distance.y.lg/sm`
- SplitType com animação por caractere (stagger aleatório)
- Typed.js headlines com fallback textual
- Prefers-reduced-motion: sem parallax, transições simples

### ✅ StatsCounter
- Tokens: `ANIM.duration.md`, `ANIM.ease.out`
- Cleanup local de ScrollTrigger (não mata globais)
- Sem emojis (Heroicons)
- Acessibilidade: aria-live para números

### ✅ TestimonialsCarousel
- Tokens: `ANIM.duration.md`, `ANIM.ease.out`
- Avatares com UserCircleIcon (sem emojis)
- Navegação por teclado (setas, Enter)
- Prefers-reduced-motion: sem scrub

### ✅ ServicesOverview
- Tokens: `ANIM.distance.y.md`, `ANIM.duration.md`, `ANIM.ease.out`
- Stagger com delays adaptativos (0.08s)
- Sem emojis em badges
- Viewport: `ANIM.scroll.start`

### ✅ CaseShowcase
- Tokens: `ANIM.distance.y.md`, `ANIM.duration.md`, `ANIM.ease.out`
- Timeline com stagger (0.15s)
- Sem emojis
- Prefers-reduced-motion: sem hover animations

### ✅ DeliveryPlaybook
- Tokens: `ANIM.distance.y.sm`, `ANIM.duration.md`
- Framer Motion: initial/whileInView/transition
- Sem emojis em outputs
- Prefers-reduced-motion: apenas layout

### ✅ OperationalHighlights
- Tokens: `ANIM.distance.y.sm`, `ANIM.duration.md`
- Framer Motion: y/opacity/duration/ease
- Sem emojis em signals
- Prefers-reduced-motion: apenas layout

### ✅ BlogHighlights
- Tokens: `ANIM.duration.md` para skeleton loading
- Sem emojis em categorias
- Loading state com duração consistente
- Acessibilidade: aria-busy

### ✅ TechMarquee (PixiJS)
- Fallback com `usePerformanceBudget` (FPS < 50 ou CPU restrita)
- Tokens aplicados em duração
- Sem emojis

### ✅ MagneticButton
- Tokens: `ANIM.duration.sm` para spring config
- Hover effects: scale + color + shadow
- Prefers-reduced-motion: desativa magnético
- Acessibilidade: foco visível

---

## Padrão de Uso de Tokens

### Quando usar cada duração:
- `xs` (0.25s): Feedback imediato (hover, press)
- `sm` (0.45s): Transições rápidas (fade, scale)
- `md` (0.8s): Reveals padrão (scroll, stagger)
- `lg` (1.2s): Animações complexas (SplitType, timelines)

### Quando usar cada distância:
- `y.sm` (20px): Deslocamentos sutis (subline, highlights)
- `y.md` (40px): Reveals padrão (cards, sections)
- `y.lg` (60px): Deslocamentos maiores (hero, headlines)

### Exemplo de aplicação:
```tsx
gsap.fromTo(element,
  { y: ANIM.distance.y.md, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: ANIM.duration.md,
    ease: ANIM.ease.out,
    scrollTrigger: { trigger: element, start: ANIM.scroll.start }
  }
);
```

---

## Próximas Semanas

- **Semana 2:** React Query + Recharts (dados e dashboard)
- **Semana 3:** Formulários avançados + Confetti
- **Semana 4:** Performance budgets + Web Vitals
- **Semana 5:** Mouse Follower + Microinterações refinadas
- **Semana 6:** SplitType multi-linhas + Typed.js
- **Semana 7:** R3F/Three.js otimizado + Fallback robusto
- **Semana 8:** Blog/Cases com dados + Admin CRUD

