import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ANIM } from '@/lib/animTokens';

interface ClipPathRevealProps {
  children: React.ReactNode;
  className?: string;
  clipShape?: 'polygon' | 'circle' | 'inset';
  duration?: number;
  delay?: number;
}

export function ClipPathReveal({
  children,
  className = '',
  clipShape = 'polygon',
  duration = ANIM.duration.lg,
  delay = 0
}: ClipPathRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    let initialClip = '';
    let finalClip = '';

    if (clipShape === 'polygon') {
      initialClip = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)';
      finalClip = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
    } else if (clipShape === 'circle') {
      initialClip = 'circle(0% at 50% 50%)';
      finalClip = 'circle(100% at 50% 50%)';
    } else if (clipShape === 'inset') {
      initialClip = 'inset(0% 100% 0% 0%)';
      finalClip = 'inset(0% 0% 0% 0%)';
    }

    gsap.set(elementRef.current, { clipPath: initialClip });

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
        clipPath: finalClip,
        duration: duration,
        ease: ANIM.ease.out,
        delay: delay
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
  }, [clipShape, duration, delay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

