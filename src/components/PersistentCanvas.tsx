import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseOpacity: number;
}

export const PersistentCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollProgressRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const gridOpacityRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    const PARTICLE_COUNT = 80;
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3 - 0.15,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      baseOpacity: Math.random() * 0.5 + 0.1,
    }));

    // ScrollTrigger to track overall page scroll progress
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
      },
    });

    // Section-specific triggers for grid
    const expSection = document.getElementById('experience');
    if (expSection) {
      ScrollTrigger.create({
        trigger: expSection,
        start: 'top 80%',
        end: 'bottom 20%',
        onUpdate: (self) => {
          gridOpacityRef.current = self.progress < 0.5
            ? self.progress * 2 * 0.12
            : (1 - self.progress) * 2 * 0.12;
        },
        onLeave: () => { gridOpacityRef.current = 0; },
        onLeaveBack: () => { gridOpacityRef.current = 0; },
      });
    }

    const getBackgroundColors = (progress: number) => {
      // Hero (0-0.15): Deep dark cyan tint
      // About (0.15-0.35): Warmer, deeper
      // Projects (0.35-0.6): Near black
      // Experience (0.6-0.8): Dark with structure
      // Contact (0.8-1.0): Warmth returns
      const isDark = document.documentElement.classList.contains('dark');

      if (!isDark) {
        // Light mode: subtle shifts
        const r = 250 - progress * 15;
        const g = 250 - progress * 10;
        const b = 252 - progress * 8;
        return { r, g, b };
      }

      if (progress < 0.15) {
        // Hero: deep dark with subtle cyan
        const t = progress / 0.15;
        return {
          r: 8 + t * 4,
          g: 10 + t * 8,
          b: 14 + t * 6,
        };
      } else if (progress < 0.35) {
        // About: warmer
        const t = (progress - 0.15) / 0.2;
        return {
          r: 12 + t * 6,
          g: 18 - t * 6,
          b: 20 - t * 8,
        };
      } else if (progress < 0.6) {
        // Projects: near black
        const t = (progress - 0.35) / 0.25;
        return {
          r: 18 - t * 12,
          g: 12 - t * 8,
          b: 12 - t * 6,
        };
      } else if (progress < 0.8) {
        // Experience: structured dark
        const t = (progress - 0.6) / 0.2;
        return {
          r: 6 + t * 4,
          g: 4 + t * 6,
          b: 6 + t * 10,
        };
      } else {
        // Contact: warmth returns
        const t = (progress - 0.8) / 0.2;
        return {
          r: 10 + t * 10,
          g: 10 + t * 6,
          b: 16 - t * 6,
        };
      }
    };

    const drawGrid = (ctx: CanvasRenderingContext2D, w: number, h: number, opacity: number) => {
      if (opacity < 0.001) return;
      const gridSize = 60;
      const isDark = document.documentElement.classList.contains('dark');
      const color = isDark ? `rgba(100, 200, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity * 0.3})`;

      ctx.strokeStyle = color;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let x = 0; x < w; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();
    };

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const progress = scrollProgressRef.current;
      const bg = getBackgroundColors(progress);

      // Clear with gradient background
      const gradient = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.7);
      gradient.addColorStop(0, `rgb(${bg.r + 8}, ${bg.g + 8}, ${bg.b + 12})`);
      gradient.addColorStop(1, `rgb(${bg.r}, ${bg.g}, ${bg.b})`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Grid overlay for experience section
      drawGrid(ctx, w, h, gridOpacityRef.current);

      // Particle density based on scroll position
      // More particles during hero, fewer during projects
      const densityMultiplier = progress < 0.3 ? 1 : progress < 0.6 ? 0.5 : progress < 0.8 ? 0.3 : 0.6;
      // Particle speed slows near contact
      const speedMultiplier = progress > 0.8 ? 0.3 : 1;

      const isDark = document.documentElement.classList.contains('dark');

      particlesRef.current.forEach((p) => {
        // Update position
        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;

        // Wrap around
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Opacity based on density
        p.opacity = p.baseOpacity * densityMultiplier;

        if (p.opacity < 0.01) return;

        // Draw particle
        const particleColor = isDark
          ? `rgba(120, 220, 255, ${p.opacity})`
          : `rgba(0, 0, 0, ${p.opacity * 0.15})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      trigger.kill();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default PersistentCanvas;
