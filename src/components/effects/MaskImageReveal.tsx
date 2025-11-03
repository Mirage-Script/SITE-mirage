import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ANIM } from '@/lib/animTokens';

interface MaskImageRevealProps {
  children: React.ReactNode;
  className?: string;
  maskType?: 'linear' | 'radial';
  direction?: 'top' | 'bottom' | 'left' | 'right';
  duration?: number;
}

export function MaskImageReveal({
  children,
  className = '',
  maskType = 'linear',
  direction = 'top',
  duration = ANIM.duration.lg
}: MaskImageRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    let initialMask = '';
    let finalMask = '';

    if (maskType === 'linear') {
      if (direction === 'top') {
        initialMask = 'linear-gradient(to bottom, transparent 0%, transparent 50%, black 100%)';
        finalMask = 'linear-gradient(to bottom, black 0%, black 100%)';
      } else if (direction === 'bottom') {
        initialMask = 'linear-gradient(to top, transparent 0%, transparent 50%, black 100%)';
        finalMask = 'linear-gradient(to top, black 0%, black 100%)';
      } else if (direction === 'left') {
        initialMask = 'linear-gradient(to right, transparent 0%, transparent 50%, black 100%)';
        finalMask = 'linear-gradient(to right, black 0%, black 100%)';
      } else if (direction === 'right') {
        initialMask = 'linear-gradient(to left, transparent 0%, transparent 50%, black 100%)';
        finalMask = 'linear-gradient(to left, black 0%, black 100%)';
      }
    } else if (maskType === 'radial') {
      initialMask = 'radial-gradient(circle, transparent 0%, transparent 40%, black 100%)';
      finalMask = 'radial-gradient(circle, black 0%, black 100%)';
    }

    gsap.set(elementRef.current, {
      maskImage: initialMask,
      WebkitMaskImage: initialMask
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: elementRef.current,
        start: ANIM.scroll.start,
        once: true
      }
    });

    tl.to(
      elementRef.current,
      {
        maskImage: finalMask,
        WebkitMaskImage: finalMask,
        duration: duration,
        ease: ANIM.ease.out
      }
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === elementRef.current) {
          trigger.kill();
        }
      });
    };
  }, [maskType, direction, duration]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

