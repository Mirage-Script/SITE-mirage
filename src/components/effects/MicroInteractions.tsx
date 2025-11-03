import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { ANIM } from '@/lib/animTokens';

interface MicroInteractionsProps {
  children: React.ReactNode;
  className?: string;
  type?: 'loading' | 'success' | 'error';
}

export function MicroInteractions({
  children,
  className = '',
  type = 'loading'
}: MicroInteractionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ repeat: type === 'loading' ? -1 : 0 });

    if (type === 'loading') {
      tl.to(containerRef.current, {
        opacity: 0.5,
        duration: ANIM.duration.sm,
        ease: 'sine.inOut'
      }).to(containerRef.current, {
        opacity: 1,
        duration: ANIM.duration.sm,
        ease: 'sine.inOut'
      });
    } else if (type === 'success') {
      tl.to(containerRef.current, {
        scale: 1.1,
        duration: ANIM.duration.sm,
        ease: ANIM.ease.out
      }).to(containerRef.current, {
        scale: 1,
        duration: ANIM.duration.sm,
        ease: ANIM.ease.out
      });
    } else if (type === 'error') {
      tl.to(containerRef.current, {
        x: -10,
        duration: ANIM.duration.xs,
        ease: 'power2.out'
      }).to(containerRef.current, {
        x: 10,
        duration: ANIM.duration.xs,
        ease: 'power2.out'
      }).to(containerRef.current, {
        x: 0,
        duration: ANIM.duration.xs,
        ease: 'power2.out'
      });
    }

    return () => {
      tl.kill();
    };
  }, [type]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

