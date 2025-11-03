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

