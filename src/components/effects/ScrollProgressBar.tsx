import { useRef } from 'react';

import { useScrollProgressBar } from '@/hooks/useScrollProgressBar';

interface ScrollProgressBarProps {
  className?: string;
  height?: string;
  color?: string;
}

/**
 * Displays a progress bar at the top of the page that fills as user scrolls.
 * 
 * @example
 * <ScrollProgressBar 
 *   height="h-1" 
 *   color="bg-gradient-to-r from-primary to-accent"
 * />
 */
export function ScrollProgressBar({
  className = '',
  height = 'h-1',
  color = 'bg-gradient-to-r from-primary to-accent',
}: ScrollProgressBarProps) {
  const progressRef = useRef<HTMLDivElement>(null);

  useScrollProgressBar(progressRef);

  return (
    <div
      ref={progressRef}
      className={`fixed top-0 left-0 z-50 ${height} ${color} ${className}`}
      style={{
        transformOrigin: 'left center',
        transform: 'scaleX(0)',
      }}
      aria-hidden="true"
    />
  );
}

