<div align="center">
  <img src="https://raw.githubusercontent.com/Mirage-Script/SITE-mirage/main/**banner.png**" alt="Banner: MIRAGE SCRIPT - Conecte-se, Colabore e Crie" width="100%">
  <br>
  <h1>MIRAGE · Plataforma Digital Enterprise-Grade</h1>
</div>

---

## 🚀 Visão Geral do Projeto

Este é o repositório principal da **MIRAGE · Plataforma Digital**, focado em entregar serviços de engenharia web, mobile e software com o rigor de um **padrão *Enterprise-Grade***. O projeto foi construído para ser altamente performático, escalável e manter uma experiência de utilizador (UX/UI) de excelência, utilizando uma stack moderna e robusta.

**Implementação Principal:** React 18, TypeScript, Tailwind CSS, GSAP (com ScrollTrigger), Framer Motion e Supabase.

## 🛠️ Stack Tecnológica Central

A arquitetura foi cuidadosamente selecionada para garantir performance, segurança e uma ótima experiência de desenvolvimento.

| Categoria | Tecnologia | Versão | Propósito Principal |
| :--- | :--- | :--- | :--- |
| **Frontend Core** | React | 18.3 | Componentização da UI |
| **Linguagem** | TypeScript | 5.6 | Tipagem estática e segurança de código |
| **Estilização** | Tailwind CSS | 3.4 | Utilitário CSS com design tokens personalizados |
| **Animações** | GSAP | 3.13 | Animações de alto desempenho e scroll (ScrollTrigger) |
| **Animações** | Framer Motion | | Microinterações e controle de movimento |
| **Gerenciamento** | Webpack | 5 + Babel | Empacotamento de módulos e transpilação |
| **Backend/DB** | Supabase | Client | Backend-as-a-Service (Autenticação, DB, etc.) |
| **Formulários** | RHF + Zod | Client | Validação e gerenciamento de formulários |
| **UX/UI** | Lenis | 1.x | Smooth scrolling e interoperabilidade com ScrollTrigger |

## 🌟 Destaques e Arquitetura

O projeto integra recursos avançados para uma experiência *premium*:

### Arquitetura de Código

* **Estrutura Lógica:** Código organizado em pastas claras:
    * `src/components`: Componentes reutilizáveis, incluindo **Layout**, **Navegação** e **Seções**.
    * `src/routes`: Definição das páginas (**Home**, **Serviços**, **Blog**, **Admin**, etc.).
    * `src/data`: Conteúdo estático (definição de serviços, cases, artigos de blog).
    * `src/lib`: Utilitários centrais para GSAP e integração Supabase.
    * `src/providers`: Gestão de contextos globais (ex: Tema Light/Dark).

### Funcionalidades de Performance e Experiência

* **Animações de Entrada:** Efeitos suaves de *reveal* controlados por *scroll* em seções críticas, garantindo foco no conteúdo.
* **Animações Avançadas:**
    * Seção **Hero** com animações GSAP/A11y, fundo com `Shader-doodle` (shaders GLSL) e botões magnéticos (`MagneticButton`) com `TextScramble`.
    * Marquee técnico implementado com **PixiJS** para alta performance.
* **Acessibilidade e Usabilidade:** Cursor customizado, *scroll* suave com Lenis e `React Hot Toast` para feedback instantâneo nos formulários.

## 💻 Scripts Disponíveis

Para começar a desenvolver ou executar o projeto, utilize os seguintes comandos:

| Comando | Descrição |
| :--- | :--- |
| `npm install` | Instala todas as dependências do projeto. |
| `npm run dev` | Inicia o `webpack-dev-server` (ambiente de desenvolvimento) em `http://localhost:3000`. |
| `npm run build` | Cria o *build* de produção otimizado na pasta `dist/`. |
| `npm run lint` | Executa o ESLint para validar código TS/React. |
| `npm run type-check` | Validação estrita do TypeScript. |
| `npm run test` | Roda os testes unitários e de integração com Jest/Testing Library. |
| `npm run format` | Formata o código automaticamente com o Prettier. |

## ⚙️ Variáveis de Ambiente

Para o funcionamento completo da aplicação, configure um arquivo **`.env.local`** na raiz do projeto, baseado no template **`.env.example`**:

```bash
SUPABASE_URL=SUA_URL_SUPABASE
SUPABASE_ANON_KEY=SUA_CHAVE_ANON
