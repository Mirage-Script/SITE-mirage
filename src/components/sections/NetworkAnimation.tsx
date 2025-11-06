// Ficheiro: src/components/sections/NetworkAnimation.tsx (MODIFICADO)

import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import type { Container, Engine } from 'tsparticles-engine';
// 1. Importa o motor "slim" que acabámos de instalar
import { loadSlim } from 'tsparticles-slim';

// Estilos para o componente
const particleStyles: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 0, // Fica no fundo
};

export const NetworkAnimation: React.FC = () => {
  // 2. Esta função carrega o motor 'slim' no tsParticles
  const particlesInit = useCallback(async (engine: Engine) => {
    // Carrega o pacote 'slim' (e não o pacote completo)
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      // Podes usar este 'container' se precisares de mexer
      // na animação depois de ela carregar (opcional)
      await Promise.resolve();
    },
    [],
  );

  // 3. Esta é a configuração da animação "A Rede"
  const options = {
    // ==================================================================
    // <<< AQUI ESTÁ A CORREÇÃO >>>
    // Esta linha força a animação a respeitar o tamanho
    // do container (a HeroSection) e a não ocupar o ecrã inteiro.
    // ==================================================================
    fullScreen: { enable: false },

    background: {
      color: {
        value: 'transparent', // Fundo transparente
      },
    },
    fpsLimit: 60, // Limita a 60 FPS para performance
    interactivity: {
      events: {
        // Ativa a interação com o rato
        onHover: {
          enable: true,
          mode: 'repulse', // "Repele" as partículas ao passar o rato
        },
      },
      modes: {
        repulse: {
          distance: 100, // Distância da repulsão
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: '#ffffff', // Cor das partículas (branco)
      },
      // Configuração das linhas (A "Rede")
      links: {
        color: '#ffffff',
        distance: 150, // Distância máxima para uma linha se formar
        enable: true,
        opacity: 0.2, // Opacidade das linhas
        width: 1,
      },
      // Movimento das partículas
      move: {
        direction: 'none' as const,
        enable: true,
        outModes: {
          default: 'bounce' as const,
        },
        random: true, // Movimento aleatório
        speed: 1, // Velocidade (muito lento)
        straight: false,
      },
      // Número de partículas
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80, // Número base
      },
      // Opacidade e Tamanho
      opacity: {
        value: 0.2, // Opacidade das partículas
      },
      shape: {
        type: 'circle' as const,
      },
      size: {
        value: { min: 1, max: 3 }, // Tamanho aleatório entre 1 e 3
      },
    },
    detectRetina: true, // Melhora a qualidade em ecrãs de alta definição
  };

  return (
    <Particles
      id="tsparticles-network"
      init={particlesInit}
      loaded={particlesLoaded}
      options={options}
      style={particleStyles}
    />
  );
};

export default NetworkAnimation;