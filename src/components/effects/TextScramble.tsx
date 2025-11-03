import { useReducedMotion } from 'framer-motion';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';

const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#________0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export interface TextScrambleHandle {
  play: (nextText?: string) => void;
}

interface TextScrambleProps {
  text: string;
  className?: string;
  autoPlay?: boolean;
}

export const TextScramble = forwardRef<TextScrambleHandle, TextScrambleProps>(
  ({ text, className = '', autoPlay = true }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const spanRef = useRef<HTMLSpanElement | null>(null);
    const animationFrame = useRef<number>();
    const frame = useRef(0);
    const queue = useRef<Array<{ from: string; to: string; start: number; end: number }>>([]);

    const setFinalText = useCallback(
      (value: string) => {
        if (spanRef.current) {
          spanRef.current.textContent = value;
        }
      },
      []
    );

    const runScramble = useCallback(
      (nextText: string = text) => {
        const target = spanRef.current;
        if (!target) {
          return;
        }

        if (prefersReducedMotion) {
          target.textContent = nextText;
          return;
        }

        if (animationFrame.current) {
          cancelAnimationFrame(animationFrame.current);
        }

        const currentText = target.textContent ?? '';
        const maxLength = Math.max(currentText.length, nextText.length);

        queue.current = Array.from({ length: maxLength }).map((_, index) => {
          const from = currentText[index] ?? '';
          const to = nextText[index] ?? '';
          const start = Math.floor(Math.random() * 20);
          const end = start + Math.floor(Math.random() * 20) + 10;
          return { from, to, start, end };
        });

        frame.current = 0;

        const update = () => {
          if (!spanRef.current) {
            return;
          }

          let output = '';
          let completed = 0;

          for (const { from, to, start, end } of queue.current) {
            if (frame.current >= end) {
              completed += 1;
              output += to;
              continue;
            }

            if (frame.current >= start) {
              const randomIndex = Math.floor(Math.random() * SCRAMBLE_CHARS.length);
              output += SCRAMBLE_CHARS[randomIndex];
            } else {
              output += from;
            }
          }

          spanRef.current.textContent = output;
          frame.current += 1;

          if (completed === queue.current.length) {
            setFinalText(nextText);
            return;
          }

          animationFrame.current = window.requestAnimationFrame(update);
        };

        animationFrame.current = window.requestAnimationFrame(update);
      },
      [prefersReducedMotion, setFinalText, text]
    );

    useImperativeHandle(ref, () => ({ play: runScramble }), [runScramble]);

    useEffect(() => {
      if (!spanRef.current) {
        return;
      }

      if (prefersReducedMotion) {
        spanRef.current.textContent = text;
        return;
      }

      if (autoPlay) {
        runScramble(text);
      } else {
        spanRef.current.textContent = text;
      }
    }, [autoPlay, prefersReducedMotion, runScramble, text]);

    useEffect(() => () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    }, []);

    return <span ref={spanRef} className={className} aria-hidden={prefersReducedMotion ? undefined : true} />;
  }
);

TextScramble.displayName = 'TextScramble';
