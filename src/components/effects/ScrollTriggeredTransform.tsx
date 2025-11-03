import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ANIM } from '@/lib/animTokens';

interface ScrollTriggeredTransformProps {
  children: React.ReactNode;
  className?: string;
  transformType?: 'scale' | 'rotate' | 'both';
  scaleStart?: number;
  scaleEnd?: number;
  rotateStart?: number;
  rotateEnd?: number;
  perspective?: number;
}

export function ScrollTriggeredTransform({
  children,
  className = '',
  transformType = 'scale',
  scaleStart = 0.8,
  scaleEnd = 1,
  rotateStart = -10,
  rotateEnd = 0,
  perspective = 1000
}: ScrollTriggeredTransformProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const parent = elementRef.current.parentElement;
    if (parent) {
      gsap.set(parent, { perspective: perspective });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: elementRef.current,
        start: ANIM.scroll.start,
        end: 'bottom center',
        scrub: 1,
        markers: false
      }
    });

    if (transformType === 'scale' || transformType === 'both') {
      tl.fromTo(
        elementRef.current,
        { scale: scaleStart },
        { scale: scaleEnd, duration: 1, ease: 'none' },
        0
      );
    }

    if (transformType === 'rotate' || transformType === 'both') {
      tl.fromTo(
        elementRef.current,
        { rotateY: rotateStart },
        { rotateY: rotateEnd, duration: 1, ease: 'none' },
        transformType === 'both' ? 0 : 0
      );
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === elementRef.current) {
          trigger.kill();
        }
      });
    };
  }, [transformType, scaleStart, scaleEnd, rotateStart, rotateEnd, perspective]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

