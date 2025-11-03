import { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ANIM } from '@/lib/animTokens';

interface SplitTypeMultiLevelProps {
  text: string;
  level?: 'lines' | 'words' | 'chars';
  className?: string;
  staggerDelay?: number;
  blurEffect?: boolean;
  parallaxEffect?: boolean;
  scrollTrigger?: boolean;
}

export function SplitTypeMultiLevel({
  text,
  level = 'chars',
  className = '',
  staggerDelay = 0.05,
  blurEffect = false,
  parallaxEffect = false,
  scrollTrigger: enableScrollTrigger = true
}: SplitTypeMultiLevelProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    // Split text
    const split = new SplitType(elementRef.current, { types: 'lines,words,chars' });

    // Get target elements based on level
    let targets: HTMLElement[] = [];
    if (level === 'lines') {
      targets = split.lines || [];
    } else if (level === 'words') {
      targets = split.words || [];
    } else {
      targets = split.chars || [];
    }

    if (targets.length === 0) return;

    // Create animation
    const animateElements = () => {
      targets.forEach((target, index) => {
        const tl = gsap.timeline({
          scrollTrigger: enableScrollTrigger
            ? {
                trigger: elementRef.current,
                start: ANIM.scroll.start,
                once: true
              }
            : undefined
        });

        tl.fromTo(
          target,
          {
            opacity: 0,
            y: ANIM.distance.y.sm,
            filter: blurEffect ? 'blur(10px)' : 'blur(0px)'
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: ANIM.duration.md,
            ease: ANIM.ease.out,
            delay: index * staggerDelay
          }
        );

        // Add parallax effect if enabled
        if (parallaxEffect && enableScrollTrigger) {
          gsap.to(target, {
            y: index % 2 === 0 ? -20 : 20,
            scrollTrigger: {
              trigger: elementRef.current,
              start: 'top center',
              end: 'bottom center',
              scrub: 1,
              markers: false
            }
          });
        }
      });
    };

    animateElements();

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === elementRef.current) {
          trigger.kill();
        }
      });
    };
  }, [level, staggerDelay, blurEffect, parallaxEffect, enableScrollTrigger]);

  return (
    <div ref={elementRef} className={className}>
      {text}
    </div>
  );
}

