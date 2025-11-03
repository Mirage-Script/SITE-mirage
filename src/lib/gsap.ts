import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DependencyList, RefObject, useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function useGsapTimeline(
  callback: (context: gsap.Context) => void,
  deps: DependencyList = [],
  scopeRef?: RefObject<Element | null>
) {
  useEffect(() => {
    const ctx = gsap.context((self) => {
      callback(self);
    }, scopeRef?.current ?? undefined);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export { gsap, ScrollTrigger };
