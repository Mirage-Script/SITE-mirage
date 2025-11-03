import { useEffect, useState } from 'react';

export function usePerformanceBudget(thresholdFps = 48, sampleWindow = 3) {
  const [isBudgetLimited, setIsBudgetLimited] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.requestAnimationFrame === 'undefined') {
      return;
    }

    let frameCount = 0;
    let lastTimestamp = performance.now();
    let belowThresholdCount = 0;
    let rafId = 0;

    const loop = (timestamp: number) => {
      frameCount += 1;
      const delta = timestamp - lastTimestamp;

      if (delta >= 1000) {
        const fps = (frameCount * 1000) / delta;
        if (fps < thresholdFps) {
          belowThresholdCount += 1;
          if (belowThresholdCount >= sampleWindow) {
            setIsBudgetLimited(true);
            return;
          }
        } else {
          belowThresholdCount = 0;
        }

        frameCount = 0;
        lastTimestamp = timestamp;
      }

      rafId = window.requestAnimationFrame(loop);
    };

    rafId = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [sampleWindow, thresholdFps]);

  return isBudgetLimited;
}
