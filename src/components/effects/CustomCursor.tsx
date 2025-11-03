import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isPointerFine, setIsPointerFine] = useState(false);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const cursorXDotSpring = useSpring(cursorX, { damping: 30, stiffness: 500 });
  const cursorYDotSpring = useSpring(cursorY, { damping: 30, stiffness: 500 });

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
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      mediaQuery.removeEventListener('change', updatePointerPreference);
    };
  }, [cursorX, cursorY]);

  if (!isPointerFine) {
    return null;
  }

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-50 hidden h-8 w-8 rounded-full border-2 border-primary mix-blend-difference md:block"
        style={{
          left: cursorXSpring,
          top: cursorYSpring
        }}
      />
      <motion.div
        className="pointer-events-none fixed z-50 hidden h-2 w-2 rounded-full bg-primary mix-blend-difference md:block"
        style={{
          left: cursorXDotSpring,
          top: cursorYDotSpring,
          translateX: 13,
          translateY: 13
        }}
      />
    </>
  );
}
