import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface VideoScrollAnimationProps {
  videoSrc: string;
  className?: string;
  playOnScroll?: boolean;
  speedMultiplier?: number;
}

export function VideoScrollAnimation({
  videoSrc,
  className = '',
  playOnScroll = true,
  speedMultiplier = 1
}: VideoScrollAnimationProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoRef.current || !containerRef.current) return;

    const video = videoRef.current;
    const duration = video.duration || 10;

    if (playOnScroll) {
      gsap.to(video, {
        currentTime: duration,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          markers: false
        },
        ease: 'none'
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [playOnScroll, speedMultiplier]);

  return (
    <div ref={containerRef} className={className}>
      <video
        ref={videoRef}
        src={videoSrc}
        className="w-full h-full object-cover"
        muted
        playsInline
      />
    </div>
  );
}

