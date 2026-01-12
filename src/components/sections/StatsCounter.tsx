// src/components/sections/StatsCounter.tsx (MODIFICADO com nova ordem e descrição)

import { useRef } from 'react';

import { useSectionReveal } from '@/hooks/useSectionReveal';

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
  return null;
}