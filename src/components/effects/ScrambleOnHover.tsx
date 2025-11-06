// Ficheiro: src/components/effects/ScrambleOnHover.tsx (NOVO FICHEIRO)

import React, { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';

// caracteres que usamos para o "scramble"
const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#________';

interface ScrambleOnHoverProps {
  children: ReactNode;
}

export const ScrambleOnHover: React.FC<ScrambleOnHoverProps> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) return;

    // 1. Divide o texto em caracteres
    const split = new SplitType(element, { types: 'chars' });
    const chars = split.chars;
    if (!chars) return;

    // Função para escolher um caracter aleatório
    const getRandomChar = () => {
      return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    };

    // 2. O Event Listener de 'mousemove'
    const handleMouseMove = (e: MouseEvent) => {
      // Obtém a posição do rato
      const rect = element.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // 3. Loop por todos os caracteres (adaptado do CodePen)
      chars.forEach((char) => {
        // Calcula a distância do rato ao centro do caracter
        const charRect = char.getBoundingClientRect();
        const charCenterX = (charRect.left + charRect.width / 2) - rect.left;
        const charCenterY = (charRect.top + charRect.height / 2) - rect.top;

        const dx = charCenterX - mouseX;
        const dy = charCenterY - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 4. Calcula a "força" do scramble (quanto mais perto, mais forte)
        // O valor '75' é o raio de efeito. Podes aumentar ou diminuir.
        const power = gsap.utils.mapRange(0, 75, 1, 0, distance);

        // 5. Aplica o scramble
        if (power > 0.1) {
          // Se o rato está perto, troca o caracter
          // O 'data-original' guarda a letra original
          if (!char.dataset.original) {
            char.dataset.original = char.innerHTML;
          }
          char.innerHTML = getRandomChar();
        } else {
          // Se o rato está longe, restaura a letra original
          if (char.dataset.original) {
            char.innerHTML = char.dataset.original;
            delete char.dataset.original;
          }
        }
      });
    };

    // 6. Event Listener de 'mouseleave' para limpar
    const handleMouseLeave = () => {
      chars.forEach((char) => {
        if (char.dataset.original) {
          char.innerHTML = char.dataset.original;
          delete char.dataset.original;
        }
      });
    };

    // 7. Adiciona os listeners ao wrapper
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    // 8. Função de Limpeza (MUITO IMPORTANTE)
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      split.revert(); // Restaura o DOM ao original
    };
  }, [children]); // Re-corre o efeito se o texto (children) mudar

  // O 'ref' conecta o nosso código ao 'div'
  return <div ref={wrapperRef}>{children}</div>;
};

export default ScrambleOnHover;