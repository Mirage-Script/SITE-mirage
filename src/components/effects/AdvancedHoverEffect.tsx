import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { ANIM } from '@/lib/animTokens';

interface AdvancedHoverEffectProps {
  children: React.ReactNode;
  className?: string;
  effectType?: 'scale' | 'lift' | 'glow' | 'all';
  scaleAmount?: number;
  liftAmount?: number;
}

export function AdvancedHoverEffect({
  children,
  className = '',
  effectType = 'all',
  scaleAmount = 1.05,
  liftAmount = -10
}: AdvancedHoverEffectProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    const onMouseEnter = () => {
      const tl = gsap.timeline();

      if (effectType === 'scale' || effectType === 'all') {
        tl.to(element, {
          scale: scaleAmount,
          duration: ANIM.duration.sm,
          ease: ANIM.ease.out
        }, 0);
      }

      if (effectType === 'lift' || effectType === 'all') {
        tl.to(element, {
          y: liftAmount,
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          duration: ANIM.duration.sm,
          ease: ANIM.ease.out
        }, effectType === 'all' ? 0 : 0);
      }

      if (effectType === 'glow' || effectType === 'all') {
        tl.to(element, {
          filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))',
          duration: ANIM.duration.sm,
          ease: ANIM.ease.out
        }, effectType === 'all' ? 0 : 0);
      }
    };

    const onMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        y: 0,
        boxShadow: '0 0 0 rgba(0,0,0,0)',
        filter: 'drop-shadow(0 0 0 rgba(59, 130, 246, 0))',
        duration: ANIM.duration.sm,
        ease: ANIM.ease.out
      });
    };

    element.addEventListener('mouseenter', onMouseEnter);
    element.addEventListener('mouseleave', onMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', onMouseEnter);
      element.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [effectType, scaleAmount, liftAmount]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

