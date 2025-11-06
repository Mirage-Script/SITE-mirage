// Ficheiro: src/components/sections/LogoParticleAnimation.tsx (MODIFICADO)

import React, { useRef, useEffect } from 'react';
// 1. Importa o teu logotipo
import logoSrc from '../../assets/logotipo.png';

// Estilos para o Canvas (do teu style.css)
const canvasStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 0, // Garante que fica atrás do conteúdo
  opacity: 0.3, // Opacidade (podes ajustar isto a gosto)
};

// --- A nossa Classe de Partículas (adaptada do teu script.js) ---
class Particle {
  x: number;
  y: number;
  color: string;
  size: number;
  baseX: number;
  baseY: number;
  density: number;
  ctx: CanvasRenderingContext2D;
  mouse: React.MutableRefObject<{ x: number | null; y: number | null; radius: number }>;

  constructor(
    x: number,
    y: number,
    color: string,
    ctx: CanvasRenderingContext2D,
    mouseRef: React.MutableRefObject<{ x: number | null; y: number | null; radius: number }>,
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = 2; // Tamanho da partícula
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 10 + 2;
    this.ctx = ctx;
    this.mouse = mouseRef;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
  }

  update() {
    const mouse = this.mouse.current;
    if (mouse.x === null || mouse.y === null) return;

    // Detecção de colisão (lógica do teu script.js)
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const forceDirectionX = dx / distance;
    const forceDirectionY = dy / distance;

    const maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance;
    if (force < 0) force = 0;

    const directionX = forceDirectionX * force * this.density * 0.6;
    const directionY = forceDirectionY * force * this.density * 0.6;

    if (distance < mouse.radius + this.size) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      // Retorna à posição base
      if (this.x !== this.baseX) {
        const dx = this.x - this.baseX;
        this.x -= dx / 20;
      }
      if (this.y !== this.baseY) {
        const dy = this.y - this.baseY;
        this.y -= dy / 20;
      }
    }
    this.draw();
  }
}

// --- O nosso Componente React ---
export const LogoParticleAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particleArrayRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const mouseRef = useRef({
    x: null as number | null,
    y: null as number | null,
    radius: 150, 
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];

    // --- Função de Setup (combina drawImage e init) ---
    const setup = (image: HTMLImageElement) => {
      const container = canvas.parentElement;
      if (!container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;

      const imageAspect = image.width / image.height;
      const canvasAspect = canvas.width / canvas.height;
      let scaledWidth, scaledHeight, x, y;

      // ==================================================================
      // <<< A NOSSA CORREÇÃO ESTÁ AQUI >>>
      // Aumentei o valor de 75 para 120 para mover "só mais um pouco"
      // para baixo.
      // ==================================================================
      const yOffset = 120; // 120 pixels para baixo (era 75)

      // Lógica para preencher o container (como "object-fit: cover")
      if (imageAspect > canvasAspect) {
        scaledHeight = canvas.height;
        scaledWidth = scaledHeight * imageAspect;
        x = (canvas.width - scaledWidth) / 2;
        y = yOffset; // Aplicamos o offset (em vez de y = 0)
      } else {
        scaledWidth = canvas.width;
        scaledHeight = scaledWidth / imageAspect;
        x = 0;
        y = ((canvas.height - scaledHeight) / 2) + yOffset; // Aplicamos o offset
      }

      // Desenha a imagem no canvas (para podermos ler os pixels)
      ctx.drawImage(image, x, y, scaledWidth, scaledHeight);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = [];
      
      const resolution = 5; 

      for (let y = 0; y < imageData.height; y += resolution) {
        for (let x = 0; x < imageData.width; x += resolution) {
          if (imageData.data[y * 4 * imageData.width + x * 4 + 3] > 128) {
            const r = imageData.data[y * 4 * imageData.width + x * 4];
            const g = imageData.data[y * 4 * imageData.width + x * 4 + 1];
            const b = imageData.data[y * 4 * imageData.width + x * 4 + 2];
            const color = `rgb(${r},${g},${b})`;
            
            particles.push(new Particle(x, y, color, ctx, mouseRef));
          }
        }
      }
      particleArrayRef.current = particles;
    };

    // --- Loop de Animação (do teu script.js) ---
    const animate = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const particles = particleArrayRef.current;
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // --- Carregamento da Imagem ---
    const image = new Image();
    image.src = logoSrc;
    image.onload = () => {
      setup(image); // Corre o setup
      animate(); // Inicia a animação
    };

    // --- Event Listeners (Rato e Resize) ---
    const handleMouseMove = (event: MouseEvent) => {
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current.x = event.clientX - rect.left;
        mouseRef.current.y = event.clientY - rect.top;
      }
    };

    const handleResize = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setup(image); // Recalcula tudo no resize
      animate();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Função de Limpeza
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []); 

  return <canvas ref={canvasRef} style={canvasStyle} />;
};

export default LogoParticleAnimation;