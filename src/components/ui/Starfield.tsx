import { useEffect, useRef } from 'react';

interface Star {
    x: number;
    y: number;
    size: number;
    baseAlpha: number;
    twinkleSpeed: number;
    twinklePhase: number;
}

interface ShootingStar {
    x: number;
    y: number;
    length: number;
    speed: number;
    angle: number;
    active: boolean;
    opacity: number;
}

interface Nebula {
    x: number;
    y: number;
    radius: number;
    color: string;
}

export const Starfield = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = window.innerWidth;
        let height = window.innerHeight;

        const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

        // Setup canvas
        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initStars();
            initNebulae();
        };

        const stars: Star[] = [];
        const nebulae: Nebula[] = [];
        let shootingStar: ShootingStar = { x: 0, y: 0, length: 0, speed: 0, angle: 0, active: false, opacity: 0 };
        let lastShootingStarTime = 0;

        const initStars = () => {
            stars.length = 0;
            for (let i = 0; i < 200; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 1.8 + 0.2, // 0.2-2px
                    baseAlpha: Math.random() * 0.5 + 0.3,
                    twinkleSpeed: Math.random() * 0.05 + 0.01,
                    twinklePhase: Math.random() * Math.PI * 2,
                });
            }
        };

        const initNebulae = () => {
            nebulae.length = 0;
            const colors = [
                'rgba(0, 212, 255, 0.04)', // Cyan
                'rgba(255, 60, 110, 0.03)', // Pink
            ];
            for (let i = 0; i < 7; i++) {
                nebulae.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 300 + 200,
                    color: colors[Math.floor(Math.random() * colors.length)],
                });
            }
        };

        const spawnShootingStar = () => {
            shootingStar = {
                x: Math.random() * width,
                y: 0,
                length: Math.random() * 80 + 40,
                speed: Math.random() * 10 + 15,
                angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1), // ~45 deg down-right
                active: true,
                opacity: 1,
            };
            lastShootingStarTime = Date.now();
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        const handleMouseMove = (e: MouseEvent) => {
            mouse.targetX = e.clientX;
            mouse.targetY = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        const draw = () => {
            // Lerp mouse for smooth parallax
            mouse.x += (mouse.targetX - mouse.x) * 0.05;
            mouse.y += (mouse.targetY - mouse.y) * 0.05;

            const parallaxX = (mouse.x / width - 0.5) * -15; // max 15px opposite
            const parallaxY = (mouse.y / height - 0.5) * -15;

            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#020407'; // Match background
            ctx.fillRect(0, 0, width, height);

            // Draw Nebulae
            nebulae.forEach((nebula) => {
                const gradient = ctx.createRadialGradient(
                    nebula.x + parallaxX * 0.5, nebula.y + parallaxY * 0.5, 0,
                    nebula.x + parallaxX * 0.5, nebula.y + parallaxY * 0.5, nebula.radius
                );
                gradient.addColorStop(0, nebula.color);
                gradient.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);
            });

            // Draw Stars
            const time = Date.now() * 0.05;
            stars.forEach((star) => {
                const alpha = star.baseAlpha + Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.3;
                ctx.fillStyle = `rgba(232, 244, 255, ${Math.max(0, alpha)})`;
                ctx.beginPath();
                ctx.arc(
                    star.x + parallaxX * (star.size * 0.5),
                    star.y + parallaxY * (star.size * 0.5),
                    star.size, 0, Math.PI * 2
                );
                ctx.fill();
            });

            // Shooting Star Logic
            if (shootingStar.active) {
                shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
                shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
                shootingStar.opacity -= 0.015;

                if (shootingStar.opacity <= 0 || shootingStar.x > width || shootingStar.y > height) {
                    shootingStar.active = false;
                } else {
                    ctx.beginPath();
                    ctx.moveTo(shootingStar.x, shootingStar.y);
                    ctx.lineTo(
                        shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length,
                        shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length
                    );
                    ctx.strokeStyle = `rgba(255, 255, 255, ${shootingStar.opacity})`;
                    ctx.lineWidth = 1.5;
                    ctx.stroke();
                }
            } else {
                const now = Date.now();
                if (now - lastShootingStarTime > Math.random() * 2000 + 3000) { // 3-5 seconds
                    spawnShootingStar();
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0"
        />
    );
};
