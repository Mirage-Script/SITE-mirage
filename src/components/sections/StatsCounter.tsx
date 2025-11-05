// src/components/sections/StatsCounter.tsx (MODIFICADO com nova ordem e descrição)

import { motion } from 'framer-motion';

// ==================================================================
// DOCUMENTAÇÃO (MODIFICAÇÃO DOS DADOS)
//
// 1. A sua descrição (Miguel) foi atualizada para incluir "programador full-stack".
// 2. A ordem dos cards foi alterada para: Miguel, Comunidade, Kaua.
// ==================================================================
const teamCards = [
  {
    title: 'Miguel - Fundador & Líder de Desenvolvimento',
    description:
      'Líder de desenvolvimento e programador full-stack, responsável por garantir que cada linha de código seja eficiente, testada e perfeitamente alinhada aos objetivos do seu negócio.',
    imgSrc: 'https://github.com/Miguel-MirageScript.png',
    linkUrl: 'https://github.com/Miguel-MirageScript',
    linkLabel: 'Ver Perfil no GitHub',
  },
  {
    title: 'A Nossa Comunidade Open-Source',
    description:
      'Além de projetos de clientes, mantemos um ecossistema open-source para colaborar com a comunidade, explorar novas tecnologias e construir ferramentas para todos.',
    imgSrc: 'https://github.com/Mirage-Script.png', // Logo da Organização
    linkUrl: 'https://github.com/Mirage-Script',
    linkLabel: 'Conheça a Organização',
  },
  {
    title: 'Kaua - Fundador & Arquiteto de Software',
    description:
      'Arquiteto de software e programador full-stack, focado em construir e otimizar soluções enterprise-grade que são robustas, escaláveis e seguras.',
    imgSrc: 'https://github.com/UmHomemDeMiragem.png',
    linkUrl: 'https://github.com/UmHomemDeMiragem',
    linkLabel: 'Ver Perfil no GitHub',
  },
];

export function StatsCounter() {
  // A lógica do componente permanece a mesma

  return (
    <section className="mt-24">
      <div className="rounded-[2.5rem] border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-12 shadow-subtle dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-800">
        {/* Títulos da Secção */}
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">LIDERANÇA TÉCNICA</p>
          <h2 className="mt-3 text-3xl font-semibold text-neutral-900 dark:text-neutral-50 sm:text-4xl">
            As Mentes por Trás do Código.
          </h2>
        </div>

        {/* Grid de 3 colunas */}
        <dl className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {teamCards.map((card, index) => (
            <motion.div
              key={card.title}
              className="group flex h-full flex-col items-center gap-4 rounded-3xl border border-neutral-200 bg-white p-8 text-center shadow-sm transition-all hover:scale-105 hover:shadow-subtle dark:border-neutral-700 dark:bg-neutral-900"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
            >
              {/* Imagem (tag <img> padrão) */}
              <img
                src={card.imgSrc}
                alt={`Avatar de ${card.title}`}
                className="h-20 w-20 flex-shrink-0 rounded-full border-2 border-neutral-300 object-cover dark:border-neutral-600"
                width="80"
                height="80"
              />

              {/* Título (Nome) */}
              <h3 className="mt-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {card.title}
              </h3>

              {/* Descrição */}
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                {card.description}
              </p>

              {/* Link do GitHub (mt-auto empurra para o fundo) */}
              <a
                href={card.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
              >
                {/* Ícone SVG inline do GitHub */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
                {card.linkLabel}
              </a>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}