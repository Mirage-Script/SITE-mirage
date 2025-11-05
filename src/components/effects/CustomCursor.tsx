// src/components/effects/CustomCursor.tsx (MODIFICADO - Efeito Lanterna Ativado)

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isPointerFine, setIsPointerFine] = useState(false);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // DOCUMENTAÇÃO: Removemos os '...DotSpring' pois só precisamos de 1 círculo.
  // const cursorXDotSpring = ...
  // const cursorYDotSpring = ...

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsPointerFine(mediaQuery.matches);

    const updatePointerPreference = (event: MediaQueryListEvent) => {
      setIsPointerFine(event.matches);
    };

    mediaQuery.addEventListener('change', updatePointerPreference);

    const moveCursor = (e: MouseEvent) => {
      // ==================================================================
      // DOCUMENTAÇÃO (Ajuste de Posição)
      // O nosso novo círculo tem 96px (h-24).
      // O offset (deslocamento) deve ser metade disso (48px)
      // para que o cursor do rato fique no centro do círculo.
      // ==================================================================
      cursorX.set(e.clientX - 48); // Metade de 96
      cursorY.set(e.clientY - 48); // Metade de 96
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      mediaQuery.removeEventListener('change', updatePointerPreference);
    };
  }, [cursorX, cursorY]); // Dependências mantidas

  if (!isPointerFine) {
    return null;
  }

  // ==================================================================
  // DOCUMENTAÇÃO (O NOVO CURSOR "LANTERNA")
  //
  // 1. Removemos os 2 'motion.div' (o anel e o ponto).
  // 2. Adicionámos 1 'motion.div' (o spotlight).
  // 3. Mudámos as classes:
  //    - 'h-24 w-24' (96px) para um círculo grande.
  //    - 'bg-white' (BRANCO) - Isto é o que faz o 'mix-blend-difference'
  //      inverter as cores corretamente (branco->preto, preto->branco).
  //    - 'border-2 border-primary' foi REMOVIDO.
  // 4. Mantivemos 'mix-blend-difference' (a magia).
  // ==================================================================
  return (
    <motion.div
      className="pointer-events-none fixed z-50 hidden h-24 w-24 rounded-full bg-white mix-blend-difference md:block"
      style={{
        left: cursorXSpring,
        top: cursorYSpring,
      }}
    />
  );
}