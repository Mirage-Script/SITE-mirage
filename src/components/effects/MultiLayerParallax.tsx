import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface Layer {
  element: React.RefObject<HTMLDivElement>;
  speed: number;
}

interface MultiLayerParallaxProps {
  children: React.ReactNode;
  className?: string;
  layers?: number;
  speeds?: number[];
}

export function MultiLayerParallax({
  children,
  className = '',
  layers = 3,
  speeds = [0.5, 1, 1.5]
}: MultiLayerParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize layer refs
    layerRefs.current = Array.from({ length: layers }, () => ({
      current: null
    }));

    const layerElements = containerRef.current.querySelectorAll('[data-parallax-layer]');

    layerElements.forEach((element, index) => {
      const speed = speeds[index] || 1;

      gsap.to(element, {
        y: (index + 1) * 50 * speed,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          markers: false
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [layers, speeds]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

