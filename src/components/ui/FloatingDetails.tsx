import { useEffect, useRef } from 'react';

interface FloatingElement extends HTMLDivElement {
    baseX: number;
    baseY: number;
    targetX: number;
    targetY: number;
    currentX: number;
    currentY: number;
    mass: number;
}

export const FloatingDetails = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Create a few geometric shapes
        const shapes = Array.from({ length: 4 }).map((_, i) => {
            const el = document.createElement('div') as FloatingElement;
            const isCircle = i % 2 === 0;
            el.className = `absolute border border-cyan/30 ${isCircle ? 'rounded-full' : ''}`;

            // Randomize size and initial pos
            const size = Math.random() * 100 + 50;
            el.style.width = `${size}px`;
            el.style.height = `${size}px`;

            // Set initial state
            const x = Math.random() * (container.clientWidth - size);
            const y = Math.random() * (container.clientHeight - size);

            Object.assign(el, {
                baseX: x,
                baseY: y,
                targetX: x,
                targetY: y,
                currentX: x,
                currentY: y,
                mass: Math.random() * 0.7 + 0.3 // 0.3 to 1.0
            });

            el.style.transform = `translate(${x}px, ${y}px)`;
            container.appendChild(el);
            return el;
        });

        let rafId: number;
        let mouseX = 0;
        let mouseY = 0;

        const onMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };
        window.addEventListener('mousemove', onMove);

        const animate = () => {
            shapes.forEach((el: FloatingElement) => {
                // Subtle drift sine wave
                const driftX = Math.sin(Date.now() * 0.001 * el.mass) * 20;
                const driftY = Math.cos(Date.now() * 0.001 * el.mass) * 20;

                // Antigravity compute
                const dx = mouseX - (el.currentX + parseFloat(el.style.width) / 2);
                const dy = mouseY - (el.currentY + parseFloat(el.style.height) / 2);
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Radius: 100px. Repulsion strength: 0.4
                const repulsionRadius = 150;
                let repelX = 0;
                let repelY = 0;

                if (dist < repulsionRadius) {
                    const force = (repulsionRadius - dist) / repulsionRadius * 0.4;
                    repelX = -(dx / dist) * force * repulsionRadius;
                    repelY = -(dy / dist) * force * repulsionRadius;
                }

                // Target calculates base + drift + repel
                el.targetX = el.baseX + driftX + repelX;
                el.targetY = el.baseY + driftY + repelY;

                // Spring/lerp to target
                el.currentX += (el.targetX - el.currentX) * 0.05 * el.mass;
                el.currentY += (el.targetY - el.currentY) * 0.05 * el.mass;

                // Apply
                el.style.transform = `translate(${el.currentX}px, ${el.currentY}px)`;
            });

            rafId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(rafId);
            shapes.forEach(el => el.remove());
        };
    }, []);

    return <div ref={containerRef} className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" />;
};
