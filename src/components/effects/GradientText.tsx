import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ANIM } from '@/lib/animTokens';

interface GradientTextProps {
  text: string;
  className?: string;
  colors?: string[];
  animateOnScroll?: boolean;
  duration?: number;
}

export function GradientText({
  text,
  className = '',
  colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'],
  animateOnScroll = true,
  duration = ANIM.duration.lg
}: GradientTextProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const gradientString = colors.join(', ');

    if (animateOnScroll) {
      gsap.to(elementRef.current, {
        backgroundPosition: '200% center',
        duration: duration,
        ease: 'none',
        repeat: -1,
        yoyo: true,
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          markers: false
        }
      });
    } else {
      gsap.to(elementRef.current, {
        backgroundPosition: '200% center',
        duration: duration,
        ease: 'none',
        repeat: -1,
        yoyo: true
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === elementRef.current) {
          trigger.kill();
        }
      });
    };
  }, [colors, animateOnScroll, duration]);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        background: `linear-gradient(90deg, ${colors.join(', ')})`,
        backgroundSize: '200% center',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}
    >
      {text}
    </div>
  );
}

