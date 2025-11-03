import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Lazy load animations - only initialize when element is in viewport
 */
export function lazyLoadAnimation(
  element: HTMLElement,
  animationFn: () => void,
  threshold = 0.1
) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animationFn();
          observer.unobserve(element);
        }
      });
    },
    { threshold }
  );

  observer.observe(element);
  return observer;
}

/**
 * Enable GPU acceleration for smooth animations
 */
export function enableGPUAcceleration(element: HTMLElement) {
  gsap.set(element, {
    transform: 'translateZ(0)',
    willChange: 'transform'
  });
}

/**
 * Disable GPU acceleration when animation is done
 */
export function disableGPUAcceleration(element: HTMLElement) {
  gsap.set(element, {
    willChange: 'auto'
  });
}

/**
 * Clean up all ScrollTriggers for a specific element
 */
export function cleanupScrollTriggers(element: HTMLElement) {
  ScrollTrigger.getAll().forEach((trigger) => {
    if (trigger.trigger === element) {
      trigger.kill();
    }
  });
}

/**
 * Clean up all GSAP animations for a specific element
 */
export function cleanupAnimations(element: HTMLElement) {
  gsap.killTweensOf(element);
  cleanupScrollTriggers(element);
}

/**
 * Measure Web Vitals
 */
export function measureWebVitals() {
  const vitals = {
    lcp: 0,
    fid: 0,
    cls: 0,
    inp: 0
  };

  // LCP (Largest Contentful Paint)
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        vitals.lcp = lastEntry.renderTime || lastEntry.loadTime || 0;
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP observer not supported');
    }
  }

  return vitals;
}

/**
 * Monitor FPS
 */
export function monitorFPS(callback: (fps: number) => void) {
  let lastTime = performance.now();
  let frames = 0;

  const measureFPS = () => {
    const currentTime = performance.now();
    frames++;

    if (currentTime >= lastTime + 1000) {
      const fps = Math.round((frames * 1000) / (currentTime - lastTime));
      callback(fps);
      frames = 0;
      lastTime = currentTime;
    }

    requestAnimationFrame(measureFPS);
  };

  requestAnimationFrame(measureFPS);
}

