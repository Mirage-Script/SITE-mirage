import { useReducedMotion } from 'framer-motion';
import { useRef, useEffect, SVGProps } from 'react';

import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ANIM } from '@/lib/animTokens';

interface SVGMorphingProps extends SVGProps<SVGSVGElement> {
  pathFrom: string;
  pathTo: string;
  duration?: number;
  ease?: string;
  start?: string;
  end?: string;
  selector?: string;
}

/**
 * Morphs SVG path from one shape to another on scroll.
 * Uses GSAP morphSVG plugin (requires gsap-morphsvg).
 * 
 * @example
 * <SVGMorphing
 *   pathFrom="M10,10 L90,90"
 *   pathTo="M10,90 L90,10"
 *   width="100"
 *   height="100"
 * />
 */
export function SVGMorphing({
  pathFrom,
  pathTo,
  duration = ANIM.duration.lg,
  ease = ANIM.ease.out,
  start = 'top 80%',
  end = 'top 50%',
  selector = 'path',
  className = '',
  ...svgProps
}: SVGMorphingProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || prefersReducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      const path = svg.querySelector(selector);
      if (!path) return;

      // Set initial path
      gsap.set(path, { attr: { d: pathFrom } });

      // Animate to final path
      gsap.to(path, {
        attr: { d: pathTo },
        duration,
        ease,
        scrollTrigger: {
          trigger: svg,
          start,
          end,
          once: true,
          toggleActions: 'play none none none',
        },
      });
    }, svg);

    return () => {
      context.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === svg) {
          trigger.kill();
        }
      });
    };
  }, [pathFrom, pathTo, duration, ease, start, end, selector, prefersReducedMotion]);

  return (
    <svg
      ref={svgRef}
      className={className}
      {...svgProps}
    />
  );
}

