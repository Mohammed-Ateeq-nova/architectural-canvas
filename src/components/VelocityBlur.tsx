import { useEffect, useRef, ReactNode } from 'react';

export const VelocityBlur = ({ children }: { children: ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollRef = useRef(0);
  const lastTimeRef = useRef(Date.now());
  const currentBlurRef = useRef(0);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const MAX_BLUR = 3;
    const DECAY = 0.92; // Blur dissolves over ~0.4s

    const tick = () => {
      const now = Date.now();
      const dt = Math.min(now - lastTimeRef.current, 50); // cap delta
      lastTimeRef.current = now;

      const currentScroll = window.scrollY;
      const velocity = Math.abs(currentScroll - lastScrollRef.current) / Math.max(dt, 1);
      lastScrollRef.current = currentScroll;

      // Target blur proportional to velocity (pixels/ms -> 0-3px blur)
      const targetBlur = Math.min(velocity * 8, MAX_BLUR);

      // Smoothly interpolate
      if (targetBlur > currentBlurRef.current) {
        currentBlurRef.current = Math.min(
          currentBlurRef.current + (targetBlur - currentBlurRef.current) * 0.3,
          MAX_BLUR
        );
      } else {
        currentBlurRef.current *= DECAY;
        if (currentBlurRef.current < 0.05) currentBlurRef.current = 0;
      }

      // Apply blur only when significant
      if (currentBlurRef.current > 0.1) {
        container.style.filter = `blur(${currentBlurRef.current.toFixed(2)}px)`;
      } else {
        container.style.filter = '';
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    tick();

    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  return (
    <div ref={containerRef} className="will-change-[filter]">
      {children}
    </div>
  );
};

export default VelocityBlur;
