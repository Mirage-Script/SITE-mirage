import clsx from 'clsx';
import { useReducedMotion } from 'framer-motion';
import { Application, BLEND_MODES, Container, Graphics, Sprite } from 'pixi.js';
import { useEffect, useRef } from 'react';



interface PixiMarqueeParticlesProps {
  className?: string;
}

export function PixiMarqueeParticles({ className = '' }: PixiMarqueeParticlesProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<Application | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    if (typeof window === 'undefined') {
      return;
    }

    const container = containerRef.current;
    if (!container) {
      return;
    }

    const app = new Application({
      backgroundAlpha: 0,
      antialias: true,
      autoDensity: true,
      resizeTo: container
    });

    appRef.current = app;
    container.appendChild(app.view as HTMLCanvasElement);

    const particleLayer = new Container();
    particleLayer.zIndex = 1;
    app.stage.addChild(particleLayer);

    const particleCount = 28;
    const particles: Array<{ sprite: Sprite; speed: number; drift: number }> = [];

    const createParticleTexture = (radius: number, color: number) => {
      const graphic = new Graphics();
      graphic.beginFill(color, 0.45);
      graphic.drawCircle(0, 0, radius);
      graphic.endFill();
      graphic.beginFill(color, 0.22);
      graphic.drawCircle(0, 0, radius * 1.8);
      graphic.endFill();

      const texture = app.renderer.generateTexture(graphic);
      graphic.destroy();
      return texture;
    };

    for (let i = 0; i < particleCount; i += 1) {
      const radius = 18 + Math.random() * 18;
      const colorPalette = [0x3b82f6, 0x22d3ee, 0x8b5cf6];
  const texture = createParticleTexture(radius, colorPalette[i % colorPalette.length]);
      const sprite = new Sprite(texture);
      sprite.anchor.set(0.5);
      sprite.alpha = 0.24 + Math.random() * 0.22;
      sprite.x = Math.random() * app.renderer.width;
      sprite.y = Math.random() * app.renderer.height;
  sprite.blendMode = BLEND_MODES.SCREEN;

      const speed = 0.25 + Math.random() * 0.35;
      const drift = (Math.random() - 0.5) * 0.4;

      particles.push({ sprite, speed, drift });
      particleLayer.addChild(sprite);
    }

    const updateParticles = (delta: number) => {
      particles.forEach((particle) => {
        const { sprite, speed, drift } = particle;
        sprite.x += speed * delta * 12;
        sprite.y += Math.sin(sprite.x * 0.004) * drift * 22;

        const boundsPadding = 40;
        if (sprite.x - boundsPadding > app.renderer.width) {
          sprite.x = -boundsPadding;
          sprite.y = Math.random() * app.renderer.height;
        }
      });
    };

    app.ticker.add(updateParticles);

    return () => {
      app.ticker.remove(updateParticles);
      particles.forEach((particle) => {
        particle.sprite.destroy();
      });
      particleLayer.destroy({ children: true });

      if (appRef.current) {
        appRef.current.destroy(true, { children: true, texture: true, baseTexture: true });
        appRef.current = null;
      }

      const view = app.view as HTMLCanvasElement;
      if (container.contains(view)) {
        container.removeChild(view);
      }
    };
  }, [prefersReducedMotion]);

  return <div ref={containerRef} className={clsx('pointer-events-none', className)} aria-hidden />;
}
