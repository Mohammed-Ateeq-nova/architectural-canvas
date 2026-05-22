import { useRef, useState, useEffect } from 'react';

// Using a 2D canvas displacement map instead of writing raw WebGL
// for better stability and performance, satisfying the aesthetic requirement.
export const ShaderImage = ({ src }: { src: string }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const offsetRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId: number;
        const img = new Image();
        img.src = src;

        img.onload = () => {
            canvas.width = canvas.parentElement?.clientWidth || 400;
            canvas.height = canvas.parentElement?.clientHeight || 500;

            const draw = () => {
                // Target displace amount based on hover
                const targetOffset = isHovered ? 8 : 0;
                offsetRef.current += (targetOffset - offsetRef.current) * 0.1;

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Calculate crop to cover cover
                const imgAspect = img.width / img.height;
                const canvasAspect = canvas.width / canvas.height;
                let renderWidth = canvas.width;
                let renderHeight = canvas.height;
                let renderX = 0;
                let renderY = 0;

                if (imgAspect > canvasAspect) {
                    renderWidth = canvas.height * imgAspect;
                    renderX = (canvas.width - renderWidth) / 2;
                } else {
                    renderHeight = canvas.width / imgAspect;
                    renderY = (canvas.height - renderHeight) / 2;
                }

                // Draw base image
                ctx.globalAlpha = 1;
                ctx.drawImage(img, renderX, renderY, renderWidth, renderHeight);

                // Simulated displacement chunk by slice if hovered
                if (offsetRef.current > 0.5) {
                    const slices = 20;
                    const sliceHeight = canvas.height / slices;
                    for (let i = 0; i < slices; i++) {
                        const shift = Math.sin((Date.now() * 0.005) + i * 0.5) * offsetRef.current;
                        ctx.drawImage(
                            canvas,
                            0, i * sliceHeight, canvas.width, sliceHeight,
                            shift, i * sliceHeight, canvas.width, sliceHeight
                        );
                    }
                }

                // Add scanline or tint overlay
                ctx.fillStyle = 'rgba(0, 212, 255, 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                animId = requestAnimationFrame(draw);
            };

            draw();
        };

        return () => cancelAnimationFrame(animId);
    }, [src, isHovered]);

    return (
        <div
            className="relative w-full h-[500px] md:h-[600px] overflow-hidden group cursor-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <canvas
                ref={canvasRef}
                className="w-full h-full object-cover filter brightness-90 contrast-125 transition-all duration-700"
            />

            {/* SVG Animated Border */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect
                    x="2" y="2"
                    width="calc(100% - 4px)"
                    height="calc(100% - 4px)"
                    fill="none"
                    stroke="#00d4ff"
                    strokeWidth="2"
                    strokeDasharray="4000"
                    strokeDashoffset="4000"
                    className="transition-all duration-700 ease-out group-hover:stroke-dashoffset-0"
                />
            </svg>
        </div>
    );
};
