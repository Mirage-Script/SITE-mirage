import { useReducedMotion } from 'framer-motion';
import { RefObject, useEffect } from 'react';

import { gsap, ScrollTrigger } from '@/lib/gsap';

interface VideoScrollOptions {
  start?: string;
  end?: string;
  disabled?: boolean;
}

/**
 * Scrubs video playback based on scroll position.
 * Video plays/pauses as user scrolls through page.
 * 
 * @example
 * const videoRef = useRef<HTMLVideoElement>(null);
 * useVideoScroll(videoRef, {
 *   start: 'top center',
 *   end: 'bottom center'
 * });
 */
export function useVideoScroll(
  videoRef: RefObject<HTMLVideoElement | null>,
  {
    start = 'top center',
    end = 'bottom center',
    disabled = false,
  }: VideoScrollOptions = {},
) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || disabled || prefersReducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      // Ensure video is loaded
      video.addEventListener('loadedmetadata', () => {
        gsap.to(video, {
          currentTime: video.duration,
          duration: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: video,
            start,
            end,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      // Fallback if metadata already loaded
      if (video.readyState >= 1) {
        gsap.to(video, {
          currentTime: video.duration,
          duration: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: video,
            start,
            end,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    }, video);

    return () => {
      context.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === video) {
          trigger.kill();
        }
      });
    };
  }, [start, end, disabled, prefersReducedMotion, videoRef]);
}

