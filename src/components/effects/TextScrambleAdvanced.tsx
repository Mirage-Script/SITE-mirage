import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { ANIM } from '@/lib/animTokens';

interface TextScrambleAdvancedProps {
  text: string;
  className?: string;
  onHover?: boolean;
  duration?: number;
}

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export function TextScrambleAdvanced({
  text,
  className = '',
  onHover = true,
  duration = ANIM.duration.sm
}: TextScrambleAdvancedProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState(text);

  const scramble = () => {
    if (!elementRef.current) return;

    let iteration = 0;
    const maxIterations = 10;

    const interval = setInterval(() => {
      const scrambledText = text
        .split('')
        .map((char, index) => {
          if (index < iteration) {
            return text[index];
          }
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');

      setDisplayText(scrambledText);
      iteration += 1 / 3;

      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, 30);
  };

  useEffect(() => {
    if (!onHover || !elementRef.current) return;

    const element = elementRef.current;
    element.addEventListener('mouseenter', scramble);

    return () => {
      element.removeEventListener('mouseenter', scramble);
    };
  }, [onHover, text]);

  return (
    <div
      ref={elementRef}
      className={`cursor-pointer transition-colors ${className}`}
      style={{
        fontFamily: 'monospace',
        letterSpacing: '0.05em'
      }}
    >
      {displayText}
    </div>
  );
}

