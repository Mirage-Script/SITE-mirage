import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { gsap } from '@/lib/gsap';

interface SmoothScrollRevealProps {
  children: React.ReactNode;
  className?: string;
}

export function SmoothScrollReveal({ children, className = '' }: SmoothScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current) return;

    if (prefersReducedMotion) {
      gsap.set(ref.current, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
            once: false
          }
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <motion.div ref={ref} className={className}>
      {children}
    </motion.div>
  );
}
