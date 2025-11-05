import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { gsap } from '@/lib/gsap';
import { revealDefaults } from '@/lib/scroll';
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
      const d = revealDefaults();
      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
          y: d.y,
          scale: d.scale
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: d.duration,
          ease: d.ease,
          scrollTrigger: {
            trigger: ref.current,
            start: d.start,
            end: d.end,
            scrub: d.scrub,
            once: d.once
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
