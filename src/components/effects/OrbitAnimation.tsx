// src/components/effects/OrbitAnimation.tsx
// (Este é o nosso novo componente para a animação de órbita)

import React from 'react';

// ==================================================================
// DOCUMENTAÇÃO (O CSS CORRETO)
//
// Este é o CSS adaptado do site 'chiragchrg'.
// Como o Tailwind CSS não consegue criar 'conic-gradient' facilmente,
// injetamos um bloco <style> diretamente.
//
// Eu adaptei as cores do gradiente para usar as cores
// 'primary' (roxo/azul) e 'accent' (ciano) do seu tema.
// ==================================================================
const orbitStyles = `
  .hero-orbit-container {
    position: absolute;
    inset: 0;
    z-index: 0; /* Garante que fica atrás do logo */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .hero-trail {
    position: absolute;
    aspect-ratio: 1;
    border-radius: 50%;
    /* Esta é a animação CSS original que faz girar */
    animation: spin 10s linear infinite; 
  }
  
  /* Esta é a "máscara" que cria a linha fina */
  .hero-trail::before {
    content: "";
    width: calc(100% - 2px); /* Espessura de 2px */
    aspect-ratio: 1;
    inset: 0;
    margin: auto;
    border-radius: 50%;
    position: absolute;
    /* Isto deve ser a cor de fundo da sua secção (dark blue) */
    background-color: #0F172A; 
  }
  
  /* ==================================================================
   * OS GRADIENTES CÔNICOS (A MÁGICA REAL)
   * As cores 'accent' (200, 100%, 50%) e 'primary' (218, 93%, 48%)
   * são baseadas no seu 'tailwind.config.cis'.
   * ================================================================== */
  
  .trail-1 {
    width: 60%;
    background: conic-gradient(
      transparent,
      transparent,
      hsl(200, 100%, 50%), /* accent */
      hsl(218, 93%, 48%), /* primary */
      #fff
    );
    z-index: 5;
    animation-duration: 12s; /* Duração diferente */
  }
  
  .trail-2 {
    width: 80%;
    /* Gradiente na direção oposta */
    background: conic-gradient(
      #fff,
      hsl(218, 93%, 48%), /* primary */
      hsl(200, 100%, 50%), /* accent */
      transparent,
      transparent
    );
    z-index: 4;
    animation-duration: 15s; /* Duração diferente */
    animation-direction: reverse; /* Direção oposta */
  }
  
  .trail-3 {
    width: 100%;
    background: conic-gradient(
      transparent,
      transparent,
      hsl(200, 100%, 50%), 
      hsl(218, 93%, 48%), 
      #fff
    );
    z-index: 3;
    animation-duration: 20s; /* Duração diferente */
  }
  
  /* O PONTO BRILHANTE */
  .orbit-dot {
    width: 0.5rem; /* 8px */
    aspect-ratio: 1;
    background-color: #fff; /* O ponto branco */
    border-radius: 50%;
    position: absolute;
    top: -0.25rem; /* Metade da largura */
    left: calc(50% - 0.25rem); /* Centralizado */
    box-shadow: 0 0 10px #fff, 0 0 20px hsl(200, 100%, 50%);
  }

  /* O Ponto do Anel 2 (para variar) */
  .trail-2 .orbit-dot {
    transform: rotate(180deg); /* Posição oposta */
  }
  
  /* A Animação de Rotação */
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export function OrbitAnimation() {
  return (
    <>
      {/* 1. Injeta o nosso CSS na página */}
      <style>{orbitStyles}</style>
      
      {/* 2. O Esqueleto HTML/JSX (adaptado do Hero.astro) */}
      <div className="hero-orbit-container" aria-hidden="true">
        <div className="hero-trail trail-1">
          <span className="orbit-dot" />
        </div>
        <div className="hero-trail trail-2">
          <span className="orbit-dot" />
        </div>
        <div className="hero-trail trail-3">
          <span className="orbit-dot" />
        </div>
      </div>
    </>
  );
}