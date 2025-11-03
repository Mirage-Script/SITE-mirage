import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ANIM } from '@/lib/animTokens';

interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  itemSelector?: string;
  staggerDelay?: number;
  duration?: number;
  yOffset?: number;
}

export function StaggerReveal({
  children,
  className = '',
  itemSelector = '[data-stagger-item]',
  staggerDelay = 0.1,
  duration = ANIM.duration.md,
  yOffset = ANIM.distance.y.md
}: StaggerRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll(itemSelector);

    if (items.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: ANIM.scroll.start,
        once: true
      }
    });

    items.forEach((item, index) => {
      tl.fromTo(
        item,
        {
          opacity: 0,
          y: yOffset
        },
        {
          opacity: 1,
          y: 0,
          duration: duration,
          ease: ANIM.ease.out
        },
        index * staggerDelay
      );
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [itemSelector, staggerDelay, duration, yOffset]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

