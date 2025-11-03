import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

interface DraggableElementProps {
  children: React.ReactNode;
  className?: string;
  snapToGrid?: boolean;
  gridSize?: number;
  inertia?: boolean;
}

export function DraggableElement({
  children,
  className = '',
  snapToGrid = false,
  gridSize = 50,
  inertia = true
}: DraggableElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    // Simple drag implementation without Draggable plugin
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      offsetX = e.clientX - elementRef.current!.offsetLeft;
      offsetY = e.clientY - elementRef.current!.offsetTop;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !elementRef.current) return;

      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;

      gsap.to(elementRef.current, {
        x: snapToGrid ? Math.round(x / gridSize) * gridSize : x,
        y: snapToGrid ? Math.round(y / gridSize) * gridSize : y,
        duration: 0.1,
        overwrite: 'auto'
      });
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    elementRef.current.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      elementRef.current?.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [snapToGrid, gridSize, inertia]);

  return (
    <div
      ref={elementRef}
      className={`cursor-grab active:cursor-grabbing ${className}`}
      style={{ touchAction: 'none' }}
    >
      {children}
    </div>
  );
}

