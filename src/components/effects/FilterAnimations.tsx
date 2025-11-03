import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ANIM } from '@/lib/animTokens';

interface FilterAnimationsProps {
  children: React.ReactNode;
  className?: string;
  filterType?: 'blur' | 'brightness' | 'contrast' | 'saturate' | 'all';
  blurStart?: number;
  blurEnd?: number;
  brightnessStart?: number;
  brightnessEnd?: number;
  contrastStart?: number;
  contrastEnd?: number;
  saturateStart?: number;
  saturateEnd?: number;
}

export function FilterAnimations({
  children,
  className = '',
  filterType = 'blur',
  blurStart = 10,
  blurEnd = 0,
  brightnessStart = 0.5,
  brightnessEnd = 1,
  contrastStart = 0.5,
  contrastEnd = 1,
  saturateStart = 0,
  saturateEnd = 1
}: FilterAnimationsProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: elementRef.current,
        start: ANIM.scroll.start,
        end: 'bottom center',
        scrub: 1,
        markers: false
      }
    });

    if (filterType === 'blur' || filterType === 'all') {
      tl.fromTo(
        elementRef.current,
        { filter: `blur(${blurStart}px)` },
        { filter: `blur(${blurEnd}px)`, duration: 1, ease: 'none' },
        0
      );
    }

    if (filterType === 'brightness' || filterType === 'all') {
      tl.fromTo(
        elementRef.current,
        { filter: `brightness(${brightnessStart})` },
        { filter: `brightness(${brightnessEnd})`, duration: 1, ease: 'none' },
        filterType === 'all' ? 0 : 0
      );
    }

    if (filterType === 'contrast' || filterType === 'all') {
      tl.fromTo(
        elementRef.current,
        { filter: `contrast(${contrastStart})` },
        { filter: `contrast(${contrastEnd})`, duration: 1, ease: 'none' },
        filterType === 'all' ? 0 : 0
      );
    }

    if (filterType === 'saturate' || filterType === 'all') {
      tl.fromTo(
        elementRef.current,
        { filter: `saturate(${saturateStart})` },
        { filter: `saturate(${saturateEnd})`, duration: 1, ease: 'none' },
        filterType === 'all' ? 0 : 0
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
  }, [filterType, blurStart, blurEnd, brightnessStart, brightnessEnd, contrastStart, contrastEnd, saturateStart, saturateEnd]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

