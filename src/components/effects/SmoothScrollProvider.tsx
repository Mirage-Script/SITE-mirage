import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
  enabled?: boolean;
}

export function SmoothScrollProvider({
  children,
  enabled = true
}: SmoothScrollProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    // Simple smooth scroll implementation
    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;

      isScrolling = true;
      const currentScroll = window.scrollY;
      const targetScroll = currentScroll + e.deltaY;

      gsap.to(window, {
        scrollTo: { y: targetScroll },
        duration: 0.8,
        ease: 'power1.out',
        onComplete: () => {
          isScrolling = false;
        }
      });

      e.preventDefault();
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [enabled]);

  return <div ref={containerRef}>{children}</div>;
}

