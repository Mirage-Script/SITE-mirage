import { useReducedMotion } from 'framer-motion';
import { useRef, useEffect, ImgHTMLAttributes } from 'react';

import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ANIM } from '@/lib/animTokens';

interface MaskImageRevealProps extends ImgHTMLAttributes<HTMLImageElement> {
  maskType?: 'radial' | 'linear' | 'conic';
  duration?: number;
  ease?: string;
  start?: string;
  end?: string;
}

/**
 * Reveals image using CSS mask animation.
 * Creates a smooth reveal effect with animated mask.
 * 
 * @example
 * <MaskImageReveal 
 *   src="..." 
 *   alt="..."
 *   maskType="radial"
 * />
 */
export function MaskImageReveal({
  maskType = 'radial',
  duration = ANIM.duration.lg,
  ease = ANIM.ease.out,
  start = 'top 80%',
  end = 'top 50%',
  className = '',
  ...imgProps
}: MaskImageRevealProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const img = imgRef.current;
    if (!img || prefersReducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      const maskGradients = {
        radial: {
          from: 'radial-gradient(circle at 50% 50%, transparent 0%, black 100%)',
          to: 'radial-gradient(circle at 50% 50%, black 0%, black 100%)',
        },
        linear: {
          from: 'linear-gradient(to bottom, transparent 0%, black 100%)',
          to: 'linear-gradient(to bottom, black 0%, black 100%)',
        },
        conic: {
          from: 'conic-gradient(from 0deg, transparent, black)',
          to: 'conic-gradient(from 360deg, black, black)',
        },
      };

      gsap.fromTo(
        img,
        {
          opacity: 0,
          WebkitMaskImage: maskGradients[maskType].from,
          maskImage: maskGradients[maskType].from,
        },
        {
          opacity: 1,
          WebkitMaskImage: maskGradients[maskType].to,
          maskImage: maskGradients[maskType].to,
          duration,
          ease,
          scrollTrigger: {
            trigger: img,
            start,
            end,
            once: true,
            toggleActions: 'play none none none',
          },
        }
      );
    }, img);

    return () => {
      context.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === img) {
          trigger.kill();
        }
      });
    };
  }, [maskType, duration, ease, start, end, prefersReducedMotion]);

  return (
    <img
      ref={imgRef}
      className={className}
      {...imgProps}
    />
  );
}

