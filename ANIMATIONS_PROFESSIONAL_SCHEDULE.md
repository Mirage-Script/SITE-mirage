# MIRAGE · Animações Profissionais (Nível 400K+) · Task Schedule

Cronograma completo para implementar animações de nível profissional, inspiradas em sites premium como Lusion, Mana, KPR, Wix Studio, Mammut, Chugi Yoo, Prometheus Fuels, Synchronized, Pioneer, Noomo, Crescente e Awwwards.

---

## 📦 Bibliotecas a Instalar

```bash
# GSAP (core + plugins)
npm i gsap

# Smooth scroll
npm i lenis

# Text animations
npm i split-type typed.js

# 3D
npm i three @react-three/fiber @react-three/drei

# Canvas 2D
npm i pixi.js

# Physics-based animations
npm i @react-spring/web @use-gesture/react

# Utilities
npm i clsx classnames

# Cursor
npm i mouse-follower

# SVG animations
npm i framer-motion
```

---

## SEMANA 1 · Scroll-Triggered Text Animations (Nível Lusion/KPR)

Objetivo: Implementar animações de texto avançadas com ScrollTrigger, SplitType e efeitos de parallax.

### 1.1 SplitType Multi-Level Animations
- Implementar SplitType com 3 níveis: lines, words, chars
- Animar cada nível com delays diferentes
- Blur effect em scroll (filter: blur)
- Opacity fade in/out
- Referência: Lusion (text reveals), KPR (staggered text)
- Critério: Texto anima suavemente; sem jank; blur effect funciona

### 1.2 Parallax de Texto com ScrollTrigger
- Diferentes velocidades de scroll para diferentes elementos
- Y-offset baseado em scroll position
- Opacity parallax (fade em velocidades diferentes)
- Referência: Mana (parallax text), Prometheus Fuels
- Critério: Parallax suave; velocidades diferentes; sem jank

### 1.3 Typed.js com Scroll Trigger
- Headlines que digitam ao entrar em viewport
- Backspace e redigitação
- Fallback textual
- Referência: KPR (dynamic headlines)
- Critério: Headlines digitam; fallback funciona; sem jank

### 1.4 Text Scramble Effect
- Efeito matrix/glitch em hover
- Transição suave entre estados
- Referência: Synchronized (text effects)
- Critério: Scramble anima; transição suave; acessível

### 1.5 Gradient Text Animations
- Animated gradients em texto
- Gradient shift em scroll
- Color transitions suaves
- Referência: Wix Studio (Pantone 2025)
- Critério: Gradients animam; cores suaves; performance OK

### 1.6 Line Drawing Animations
- SVG text paths que desenham
- Stroke animation com dasharray
- Referência: Crescente (line animations)
- Critério: Linhas desenham; timing correto; suave

### 1.7 Testes e Otimização
- Testar em mobile/tablet/desktop
- Validar FPS > 50
- Testar reduced-motion
- Critério: Testes passam; FPS OK; acessível

---

## SEMANA 2 · Scroll-Triggered Reveals & Parallax Avançado

Objetivo: Implementar reveals complexos, clip-path animations e parallax multi-layer.

### 2.1 Clip-Path Reveals
- Reveal com clip-path (polygon, circle, inset)
- Animated clip-path em scroll
- Referência: Mana (clip-path reveals), Prometheus Fuels
- Critério: Clip-path anima; suave; sem jank

### 2.2 Mask-Image Reveals
- Reveal com mask-image (gradients)
- Animated masks em scroll
- Referência: Lusion (mask reveals)
- Critério: Masks animam; suave; cross-browser

### 2.3 Multi-Layer Parallax
- 3+ camadas com velocidades diferentes
- Depth effect com parallax
- Referência: Mana (layered parallax), Mammut
- Critério: Camadas suaves; depth effect; performance OK

### 2.4 Scroll-Triggered Scale/Rotate
- Scale animations em scroll
- Rotate animations em scroll
- Perspective transforms
- Referência: KPR (scale reveals), Pioneer
- Critério: Transforms suaves; timing correto; sem jank

### 2.5 Blur & Filter Animations
- Blur effect em scroll
- Brightness/contrast em scroll
- Saturate animations
- Referência: Prometheus Fuels (filter effects)
- Critério: Filters animam; suave; performance OK

### 2.6 Stagger Reveals com ScrollTrigger
- Reveal sequencial de múltiplos elementos
- Delays adaptativos
- Referência: KPR (staggered reveals), Synchronized
- Critério: Stagger correto; timing suave; sem jank

### 2.7 Testes e Otimização
- Testar em múltiplos viewports
- Validar FPS > 50
- Testar reduced-motion
- Critério: Testes passam; FPS OK; acessível

---

## SEMANA 3 · Morphing Shapes & SVG Animations

Objetivo: Implementar morphing de formas, SVG animations e shape transitions.

### 3.1 SVG Morphing com GSAP
- Morph entre diferentes SVG paths
- Smooth transitions
- Referência: Synchronized (morphing shapes), Crescente
- Critério: Morphing suave; timing correto; sem jank

### 3.2 Animated SVG Paths
- SVG paths que desenham em scroll
- Stroke animation com dasharray/dashoffset
- Referência: Crescente (line animations), Synchronized
- Critério: Paths desenham; timing correto; suave

### 3.3 Shape Transitions
- Transições entre formas (circle → square → triangle)
- Smooth morphing
- Referência: Mana (shape transitions)
- Critério: Transitions suaves; timing correto; sem jank

### 3.4 Animated Backgrounds
- SVG backgrounds que animam
- Gradient backgrounds que mudam
- Referência: Wix Studio (animated backgrounds)
- Critério: Backgrounds animam; suave; performance OK

### 3.5 Icon Animations
- Icons que animam em hover
- Icons que animam em scroll
- Referência: KPR (icon animations), Lusion
- Critério: Icons animam; suave; acessível

### 3.6 Blob Animations
- Blobs que morpham
- Blobs que se movem em scroll
- Referência: Mana (blob animations)
- Critério: Blobs morpham; suave; performance OK

### 3.7 Testes e Otimização
- Testar em múltiplos viewports
- Validar FPS > 50
- Testar reduced-motion
- Critério: Testes passam; FPS OK; acessível

---

## SEMANA 4 · 3D Animations com Three.js

Objetivo: Implementar 3D animations, 3D text e camera animations.

### 4.1 3D Text Animations
- 3D text que rotaciona em scroll
- 3D text que se move em scroll
- Referência: Chugi Yoo (3D portfolio), Noomo (3D animations)
- Critério: 3D text anima; suave; FPS > 50

### 4.2 3D Scroll-Triggered Transforms
- 3D transforms em scroll (rotateX, rotateY, rotateZ)
- Perspective animations
- Referência: Pioneer (3D animations), Chugi Yoo
- Critério: 3D transforms suaves; timing correto; FPS > 50

### 4.3 Camera Animations
- Camera que se move em scroll
- Camera que rotaciona em scroll
- Referência: Noomo (camera animations), Chugi Yoo
- Critério: Camera anima; suave; FPS > 50

### 4.4 3D Model Animations
- Modelos 3D que rotacionam
- Modelos 3D que se movem
- Referência: Chugi Yoo (3D models), Noomo
- Critério: Modelos animam; suave; FPS > 50

### 4.5 Particle Animations em 3D
- Partículas que se movem em 3D
- Partículas que reagem a scroll
- Referência: Pioneer (particle effects), Noomo
- Critério: Partículas animam; suave; FPS > 50

### 4.6 Fallback para 2D
- Fallback estático para dispositivos restritos
- Detecção de performance
- Referência: Awwwards best practices
- Critério: Fallback funciona; transição suave

### 4.7 Testes e Otimização
- Testar em desktop/mobile
- Validar FPS > 50
- Testar reduced-motion
- Critério: Testes passam; FPS OK; acessível

---

## SEMANA 5 · Interactive Animations (Draggable, Flip)

Objetivo: Implementar Draggable, Flip animations e interactive elements.

### 5.1 GSAP Draggable
- Elementos que podem ser arrastados
- Snap to grid
- Inertia (momentum)
- Referência: KPR (draggable elements), Wix Studio
- Critério: Draggable funciona; snap correto; inertia suave

### 5.2 GSAP Flip
- Layout animations com Flip
- Smooth transitions entre layouts
- Referência: Wix Studio (layout animations), KPR
- Critério: Flip anima; transição suave; sem jank

### 5.3 Magnetic Buttons Avançados
- Botões que atraem o cursor
- Botões que reagem a movimento
- Referência: Bubka (magnetic buttons), Louis Ansa
- Critério: Magnético funciona; suave; acessível

### 5.4 Hover Reveal Effects
- Elementos que se revelam em hover
- Hover animations complexas
- Referência: Bubka (hover effects), Louis Ansa
- Critério: Hover anima; suave; acessível

### 5.5 Click Animations
- Animações ao clicar
- Ripple effects
- Referência: Wix Studio (click effects), KPR
- Critério: Click anima; suave; acessível

### 5.6 Gesture Animations
- Swipe animations
- Pinch animations
- Referência: Mammut (gesture animations)
- Critério: Gestures funcionam; suave; mobile-friendly

### 5.7 Testes e Otimização
- Testar em desktop/mobile
- Validar acessibilidade
- Testar performance
- Critério: Testes passam; acessível; performance OK

---

## SEMANA 6 · Smooth Scroll + Lenis Integration

Objetivo: Implementar Lenis smooth scroll e sincronizar com ScrollTrigger.

### 6.1 Lenis Setup
- Instalar e configurar Lenis
- Integrar com React
- Referência: Mammut (smooth scroll), Pioneer
- Critério: Lenis funciona; scroll suave; sem jank

### 6.2 Lenis + ScrollTrigger Sync
- Sincronizar Lenis com ScrollTrigger
- Scroll velocity animations
- Referência: Mammut (scroll sync), Pioneer
- Critério: Sync funciona; scroll suave; sem jank

### 6.3 Scroll Velocity Animations
- Animações baseadas em velocidade de scroll
- Faster scroll = faster animation
- Referência: Pioneer (velocity animations)
- Critério: Velocity anima; suave; sem jank

### 6.4 Scroll Direction Detection
- Detectar direção de scroll (up/down)
- Animações diferentes por direção
- Referência: Mammut (direction detection)
- Critério: Detecção funciona; animações corretas

### 6.5 Scroll Position Animations
- Animações baseadas em posição de scroll
- Progress bars
- Referência: Pioneer (scroll position)
- Critério: Posição anima; suave; sem jank

### 6.6 Scroll Snap
- Snap to sections em scroll
- Smooth snap animations
- Referência: Mammut (scroll snap)
- Critério: Snap funciona; suave; sem jank

### 6.7 Testes e Otimização
- Testar em múltiplos viewports
- Validar FPS > 50
- Testar reduced-motion
- Critério: Testes passam; FPS OK; acessível

---

## SEMANA 7 · Advanced Hover Effects

Objetivo: Implementar hover effects avançados, cursor tracking e reveal effects.

### 7.1 Cursor Tracking
- Cursor que segue mouse
- Cursor que reage a elementos
- Referência: Bubka (cursor tracking), Louis Ansa
- Critério: Cursor funciona; suave; sem jank

### 7.2 Hover Reveal Effects
- Elementos que se revelam em hover
- Hover animations complexas
- Referência: Bubka (hover reveals), Louis Ansa
- Critério: Reveal funciona; suave; acessível

### 7.3 Hover Scale/Rotate
- Scale em hover
- Rotate em hover
- Referência: Bubka (hover transforms), Louis Ansa
- Critério: Transforms suaves; timing correto; acessível

### 7.4 Hover Color Transitions
- Color transitions em hover
- Gradient transitions em hover
- Referência: Wix Studio (color transitions), Limnia
- Critério: Transitions suaves; cores corretas; acessível

### 7.5 Hover Shadow Effects
- Shadow animations em hover
- Glow effects em hover
- Referência: Bubka (shadow effects), Louis Ansa
- Critério: Shadows animam; suave; acessível

### 7.6 Hover Text Effects
- Text animations em hover
- Text reveal em hover
- Referência: Lusion (text hover), KPR
- Critério: Text anima; suave; acessível

### 7.7 Testes e Otimização
- Testar em desktop
- Validar acessibilidade (keyboard nav)
- Testar performance
- Critério: Testes passam; acessível; performance OK

---

## SEMANA 8 · Video + Canvas Animations

Objetivo: Implementar video animations, canvas effects e PixiJS advanced effects.

### 8.1 Video Scroll-Triggered
- Video que play/pause em scroll
- Video que muda velocidade em scroll
- Referência: Apple iPhone 15 Pro (video scroll), Brain Bakery
- Critério: Video funciona; timing correto; suave

### 8.2 Canvas Animations
- Canvas que anima em scroll
- Canvas que reage a mouse
- Referência: Brain Bakery (canvas effects), Pioneer
- Critério: Canvas anima; suave; FPS > 50

### 8.3 PixiJS Advanced Effects
- Particle effects com PixiJS
- Distortion effects com PixiJS
- Referência: Brain Bakery (PixiJS effects)
- Critério: Effects funcionam; suave; FPS > 50

### 8.4 WebGL Effects
- WebGL shaders
- Generative backgrounds
- Referência: Synchronized (WebGL), Pioneer
- Critério: Shaders funcionam; suave; FPS > 50

### 8.5 Video + Text Overlay
- Video com text animations
- Video com scroll-triggered text
- Referência: Apple iPhone 15 Pro (video + text)
- Critério: Overlay funciona; timing correto; suave

### 8.6 Canvas + Scroll Sync
- Canvas que sincroniza com scroll
- Canvas que reage a scroll velocity
- Referência: Brain Bakery (scroll sync)
- Critério: Sync funciona; suave; FPS > 50

### 8.7 Testes e Otimização
- Testar em múltiplos viewports
- Validar FPS > 50
- Testar fallback
- Critério: Testes passam; FPS OK; fallback funciona

---

## SEMANA 9 · Performance Optimization

Objetivo: Otimizar performance, lazy loading e memory management.

### 9.1 Lazy Loading de Animações
- Lazy load de componentes com animações
- Lazy load de scripts GSAP
- Referência: Awwwards best practices
- Critério: Lazy loading funciona; performance melhora

### 9.2 GPU Acceleration
- Usar transform3d para GPU acceleration
- Usar will-change com cuidado
- Referência: Awwwards best practices
- Critério: GPU acceleration funciona; FPS > 50

### 9.3 Memory Management
- Cleanup de listeners
- Cleanup de timelines
- Cleanup de ScrollTriggers
- Referência: Awwwards best practices
- Critério: Memory OK; sem memory leaks

### 9.4 Code Splitting
- Split de código por rota
- Split de código por componente
- Referência: Awwwards best practices
- Critério: Code splitting funciona; bundle menor

### 9.5 Bundle Size Optimization
- Minify GSAP plugins
- Tree-shake unused code
- Referência: Awwwards best practices
- Critério: Bundle menor; performance OK

### 9.6 Web Vitals
- Medir LCP, FID, CLS, INP
- Otimizar para Web Vitals
- Referência: Awwwards best practices
- Critério: Web Vitals OK; LCP < 2.5s

### 9.7 Testes e Validação
- Testar em múltiplos devices
- Validar performance
- Testar em rede lenta
- Critério: Testes passam; performance OK

---

## SEMANA 10 · Polish & Refinements

Objetivo: Polir animações, adicionar micro-interactions e refinar UX.

### 10.1 Micro-Interactions
- Loading states com animações
- Success states com animações
- Error states com animações
- Referência: Limnia (micro-interactions), Waaark Studio
- Critério: Micro-interactions suaves; UX melhorada

### 10.2 Loading Animations
- Skeleton loading com animações
- Progress bars com animações
- Spinner animations
- Referência: Limnia (loading), Waaark Studio
- Critério: Loading anima; suave; UX clara

### 10.3 Error Animations
- Error messages com animações
- Error icons com animações
- Referência: Limnia (error states), Waaark Studio
- Critério: Error anima; suave; UX clara

### 10.4 Success Animations
- Success messages com animações
- Confetti animations
- Checkmark animations
- Referência: Limnia (success states), Waaark Studio
- Critério: Success anima; suave; UX clara

### 10.5 Page Transitions
- Fade in/out entre páginas
- Slide transitions
- Referência: Synchronized (page transitions), Crescente
- Critério: Transitions suaves; timing correto

### 10.6 Accessibility Polish
- Keyboard navigation com animações
- Screen reader support
- Reduced motion support
- Referência: Awwwards best practices
- Critério: Acessível; WCAG AA

### 10.7 Final Testing & Deployment
- Testar em todos os browsers
- Testar em todos os devices
- Testar em rede lenta
- Critério: Tudo funciona; pronto para produção

---

## 📊 Referências por Semana

### Semana 1: Lusion, KPR, Prometheus Fuels
- Scroll-triggered text animations
- Staggered reveals
- Parallax text

### Semana 2: Mana, Prometheus Fuels, Mammut
- Clip-path reveals
- Multi-layer parallax
- Scroll-triggered transforms

### Semana 3: Synchronized, Crescente, Mana
- SVG morphing
- Shape transitions
- Animated backgrounds

### Semana 4: Chugi Yoo, Noomo, Pioneer
- 3D text animations
- 3D scroll-triggered transforms
- Camera animations

### Semana 5: KPR, Wix Studio, Bubka, Louis Ansa
- Draggable elements
- Flip animations
- Magnetic buttons

### Semana 6: Mammut, Pioneer
- Lenis smooth scroll
- Scroll velocity animations
- Scroll direction detection

### Semana 7: Bubka, Louis Ansa, Lusion
- Cursor tracking
- Hover reveal effects
- Hover animations

### Semana 8: Apple iPhone 15 Pro, Brain Bakery, Synchronized
- Video scroll-triggered
- Canvas animations
- WebGL effects

### Semana 9: Awwwards best practices
- Lazy loading
- GPU acceleration
- Memory management

### Semana 10: Limnia, Waaark Studio, Synchronized
- Micro-interactions
- Loading/Error/Success animations
- Page transitions

---

## 🎯 Critérios de Aceite Globais

- ✅ Sem emojis em lugar algum
- ✅ Acessibilidade WCAG 2.1 AA
- ✅ Prefers-reduced-motion respeitado
- ✅ FPS > 50 em mobile
- ✅ Type-check passando
- ✅ Lint passando
- ✅ Build sem warnings
- ✅ Testes com cobertura > 70%
- ✅ Performance budgets respeitados
- ✅ Inspirado em sites 400K+

---

## 🚀 Próximos Passos

1. Começar Semana 1: Scroll-Triggered Text Animations
2. Instalar bibliotecas necessárias
3. Criar componentes de exemplo
4. Testar em múltiplos devices
5. Documentar padrões
6. Fazer commits incrementais

