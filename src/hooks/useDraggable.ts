import { useReducedMotion } from 'framer-motion';
import { RefObject, useEffect } from 'react';

import { gsap } from '@/lib/gsap';

interface DraggableOptions {
  bounds?: 'parent' | { left?: number; right?: number; top?: number; bottom?: number };
  onDragStart?: () => void;
  onDragEnd?: () => void;
  disabled?: boolean;
}

/**
 * Makes an element draggable with GSAP Draggable plugin.
 * Requires gsap-draggable plugin to be registered.
 * 
 * @example
 * const boxRef = useRef<HTMLDivElement>(null);
 * useDraggable(boxRef, { bounds: 'parent' });
 */
export function useDraggable(
  targetRef: RefObject<HTMLElement | null>,
  {
    bounds = 'parent',
    onDragStart,
    onDragEnd,
    disabled = false,
  }: DraggableOptions = {},
) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const element = targetRef.current;
    if (!element || disabled || prefersReducedMotion) {
      return;
    }

    // Note: This requires gsap-draggable plugin
    // If not available, gracefully degrade
    if (!gsap.Draggable) {
      console.warn('GSAP Draggable plugin not loaded');
      return;
    }

    const draggable = gsap.Draggable.create(element, {
      type: 'x,y',
      bounds,
      onDragStart,
      onDragEnd,
      inertia: true,
      edgeResistance: 0.65,
      cursor: 'grab',
      activeCursor: 'grabbing',
    })[0];

    return () => {
      draggable.kill();
    };
  }, [bounds, onDragStart, onDragEnd, disabled, prefersReducedMotion, targetRef]);
}

