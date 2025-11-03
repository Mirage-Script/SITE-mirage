import { animated, useSpring } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { useReducedMotion } from 'framer-motion';
import { useCallback, useRef } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({ children, className = '', strength = 0.3 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [{ x, y, rotateX, rotateY, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    config: { mass: 1, tension: 280, friction: 22 }
  }));
  const calculateOffset = useCallback(
    (clientX: number, clientY: number) => {
      const element = ref.current;
      if (!element) {
        return { offsetX: 0, offsetY: 0 };
      }

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const offsetX = (clientX - centerX) * strength;
      const offsetY = (clientY - centerY) * strength;

      return { offsetX, offsetY };
    },
    [strength]
  );

  useGesture(
    {
      onMove: ({ event }) => {
        if (prefersReducedMotion) {
          return;
        }

        const clientX = (event as PointerEvent | MouseEvent).clientX;
        const clientY = (event as PointerEvent | MouseEvent).clientY;
        const { offsetX, offsetY } = calculateOffset(clientX, clientY);

        void api.start({
          x: offsetX,
          y: offsetY,
          rotateX: -offsetY / 12,
          rotateY: offsetX / 12,
          scale: 1.03
        });
      },
      onHover: ({ hovering }) => {
        if (prefersReducedMotion) {
          return;
        }

        if (!hovering) {
          void api.start({ x: 0, y: 0, rotateX: 0, rotateY: 0, scale: 1 });
        }
      },
      onPointerLeave: () => {
        void api.start({ x: 0, y: 0, rotateX: 0, rotateY: 0, scale: 1 });
      },
      onPointerDown: ({ event }) => {
        if (prefersReducedMotion) {
          return;
        }
        const pointerEvent = event as PointerEvent | MouseEvent;
        const { offsetX, offsetY } = calculateOffset(pointerEvent.clientX, pointerEvent.clientY);
        void api.start({ x: offsetX * 0.6, y: offsetY * 0.6, rotateX: 0, rotateY: 0, scale: 0.97 });
      },
      onPointerUp: () => {
        if (!prefersReducedMotion) {
          void api.start({ x: 0, y: 0, rotateX: 0, rotateY: 0, scale: 1 });
        }
      }
    },
    { target: ref, eventOptions: { passive: true } }
  );

  return (
    <animated.div ref={ref} style={{ x, y, rotateX, rotateY, scale }} className={className}>
      {children}
    </animated.div>
  );
}
