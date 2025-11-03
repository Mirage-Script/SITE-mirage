# MIRAGE · Plataforma Digital

Plataforma corporativa focada em apresentar serviços de engenharia web, mobile e software com padrão enterprise-grade. Implementada com React 18, TypeScript, Tailwind CSS, GSAP ScrollTrigger, Framer Motion e integração Supabase.

##  Stack principal

- React 18.3 + React Router 6
- TypeScript 5.6
- Tailwind CSS 3.4 com design tokens personalizados
- Webpack 5 + Babel
- GSAP 3.13 (ScrollTrigger) + Framer Motion
- @use-gesture/react + React Spring para microinterações físicas
- Lenis 1.x para smooth scrolling interoperando com ScrollTrigger
- Shader-doodle para fundos GLSL generativos
- Typed.js para headlines dinâmicas ao estilo premium
- React Hot Toast para feedback instantâneo nos formulários
- React Loading Skeleton para placeholders elegantes
- Supabase client, React Hook Form + Zod
- Jest + Testing Library
- ESLint + Prettier

##  Scripts disponíveis

```bash
npm install          # instala dependências
npm run dev          # inicia webpack-dev-server em http://localhost:3000
npm run build        # build production em dist/
npm run lint         # eslint com regras TS/React
npm run type-check   # validação TypeScript
npm run test         # Jest + Testing Library
npm run format       # Prettier
```

##  Variáveis de ambiente

Configure um arquivo `.env.local` baseado no `.env.example`:

```bash
SUPABASE_URL=
SUPABASE_ANON_KEY=
```

> Caso as variáveis estejam vazias, o formulário de contato apenas exibirá mensagens de simulação.

##  Estrutura

- `src/components` – Layout, navegação, seções reutilizáveis
- `src/routes` – Páginas Home, Serviços, Sobre, Blog, Contato e Admin
- `src/data` – Conteúdo estático (serviços, cases, blog)
- `src/lib` – Utilitários GSAP e Supabase
- `src/providers` – Contexto de tema (light/dark)

### Destaques da Home

- Hero com animações GSAP/A11y, aurora shader-doodle, React Three Fiber e botões magnéticos com text scramble
- Marquee técnico com PixiJS e stack vivo
- Hook `usePerformanceBudget` monitora FPS e aciona fallbacks para experiências em dispositivos restritos
- Serviços + Operação (highlights), Playbook de Delivery, Cases e vitrine de parceiros
- Conteúdo editorial, CTA de contato/Newsletter com toasts animados
- Blog e dashboard admin com loading skeletons e cards animados
- Cursor customizado e reveals suaves com Lenis + GSAP

##  Testes

Execute `npm run test` para rodar Jest. Ajuste ou crie novos testes em `src/**/*.test.tsx` conforme evoluir o projeto.

##  Licença

Projeto proprietário MIRAGE. Todos os direitos reservados.
