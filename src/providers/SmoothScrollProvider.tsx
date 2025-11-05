import { useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { bindLenisToScrollTrigger } from '@/lib/scroll';

export function SmoothScrollProvider({ children }: PropsWithChildren) {
  const prefersReducedMotion = useReducedMotion();
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      easing: (t: number) => 1 - Math.pow(1 - t, 2),
    });

    lenisRef.current = lenis;

    const cleanup = bindLenisToScrollTrigger(lenis);

    return () => {
      cleanup?.();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!lenisRef.current) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    lenisRef.current.scrollTo(0, { immediate: true });
  }, [location.pathname]);

  return <>{children}</>;
}
