import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { ANIM } from '@/lib/animTokens';

interface ShapeTransitionProps {
  className?: string;
  duration?: number;
  colors?: string[];
}

export function ShapeTransition({
  className = '',
  duration = ANIM.duration.lg,
  colors = ['#3b82f6', '#8b5cf6', '#ec4899']
}: ShapeTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const shapes = containerRef.current.querySelectorAll('[data-shape]');

    shapes.forEach((shape, index) => {
      const tl = gsap.timeline({ repeat: -1, yoyo: true });

      tl.to(shape, {
        borderRadius: index % 2 === 0 ? '50%' : '0%',
        duration: duration,
        ease: ANIM.ease.out
      });

      tl.to(
        shape,
        {
          backgroundColor: colors[(index + 1) % colors.length],
          duration: duration,
          ease: ANIM.ease.out
        },
        0
      );
    });

    return () => {
      gsap.killTweensOf(shapes);
    };
  }, [duration, colors]);

  return (
    <div ref={containerRef} className={className}>
      {/* Children with data-shape attribute */}
    </div>
  );
}

