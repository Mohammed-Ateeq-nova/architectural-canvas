import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface SkillNode {
    id: string;
    name: string;
    category: 'frontend' | 'backend' | 'tools';
    level: number; // 0 to 1
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    vx: number;
    vy: number;
    connections: readonly string[];
    opacity: number;
}

const SKILLS = [
    { id: 'react', name: 'React', category: 'frontend', level: 0.95, connections: ['ts', 'next', 'tailwind', 'framer'] },
    { id: 'ts', name: 'TypeScript', category: 'frontend', level: 0.9, connections: ['react', 'node', 'next'] },
    { id: 'next', name: 'Next.js', category: 'frontend', level: 0.85, connections: ['react', 'ts'] },
    { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', level: 0.95, connections: ['react', 'framer'] },
    { id: 'framer', name: 'Framer Motion', category: 'frontend', level: 0.85, connections: ['react', 'tailwind', 'three'] },
    { id: 'three', name: 'Three.js / R3F', category: 'frontend', level: 0.75, connections: ['framer', 'react'] },

    { id: 'node', name: 'Node.js', category: 'backend', level: 0.85, connections: ['ts', 'python', 'sql'] },
    { id: 'python', name: 'Python', category: 'backend', level: 0.9, connections: ['node', 'tf', 'sql'] },
    { id: 'tf', name: 'TensorFlow', category: 'backend', level: 0.8, connections: ['python'] },
    { id: 'sql', name: 'PostgreSQL', category: 'backend', level: 0.85, connections: ['node', 'python', 'redis'] },
    { id: 'redis', name: 'Redis', category: 'backend', level: 0.75, connections: ['sql', 'node'] },

    { id: 'git', name: 'Git', category: 'tools', level: 0.9, connections: ['docker'] },
    { id: 'docker', name: 'Docker', category: 'tools', level: 0.8, connections: ['git', 'aws'] },
    { id: 'aws', name: 'AWS', category: 'tools', level: 0.75, connections: ['docker'] },
] as const;

const CATEGORY_COLORS = {
    frontend: '#00d4ff', // cyan
    backend: '#ff3c6e',  // pink
    tools: '#00ff9d',    // green
};

export const ConstellationMap = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredNode, setHoveredNode] = useState<SkillNode | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !inView) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.parentElement?.clientWidth || window.innerWidth;
        let height = canvas.parentElement?.clientHeight || 600;

        canvas.width = width;
        canvas.height = height;

        const centerX = width / 2;
        const centerY = height / 2;

        // Initialize nodes
        const nodes: SkillNode[] = SKILLS.map((skill, index) => {
            // distribute in a circle roughly based on category
            const angle = (index / SKILLS.length) * Math.PI * 2;
            const radius = Math.min(width, height) * 0.35 + (Math.random() * 50 - 25);

            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            return {
                ...skill,
                x, y, baseX: x, baseY: y,
                vx: Math.random() * 0.2 - 0.1,
                vy: Math.random() * 0.2 - 0.1,
                opacity: 0
            };
        });

        // Entrance Animation State
        let animationProgress = 0;
        const startTime = Date.now();
        const ENTRANCE_DURATION = 1500;

        let mouseX = 0;
        let mouseY = 0;
        let hovered: SkillNode | null = null;

        const onMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;

            // Hit detection
            hovered = null;
            for (const node of nodes) {
                const nodeRadius = node.level * 15;
                const dx = mouseX - node.x;
                const dy = mouseY - node.y;
                if (dx * dx + dy * dy < (nodeRadius + 10) ** 2) {
                    hovered = node;
                    break;
                }
            }
            setHoveredNode(hovered);
        };

        canvas.addEventListener('mousemove', onMouseMove);

        let rafId: number;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            const now = Date.now();
            animationProgress = Math.min((now - startTime) / ENTRANCE_DURATION, 1);

            // Update nodes physics
            nodes.forEach((node, i) => {
                // Drift on sine wave
                node.x = node.baseX + Math.sin(now * 0.001 + i) * 8;
                node.y = node.baseY + Math.cos(now * 0.0012 + i) * 8;

                // Staggered entrance opacity
                const nodeDelay = (i / nodes.length) * 0.5;
                const nodeProgress = Math.min(Math.max((animationProgress - nodeDelay) * 2, 0), 1);
                node.opacity = nodeProgress;
            });

            // Draw Connections First
            ctx.lineWidth = 1;
            nodes.forEach(node => {
                if (node.opacity < 0.1) return;

                node.connections.forEach(targetId => {
                    const target = nodes.find(n => n.id === targetId);
                    if (!target || target.opacity < 0.1) return;

                    // Don't draw twice
                    if (node.id > target.id) return;

                    let isHighlighted = false;
                    let isDimmed = false;

                    if (hovered) {
                        if (hovered.id === node.id || hovered.id === target.id) {
                            isHighlighted = true;
                        } else {
                            isDimmed = true;
                        }
                    }

                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(target.x, target.y);

                    let alpha = Math.min(node.opacity, target.opacity) * 0.15;
                    if (isHighlighted) alpha = 0.5;
                    if (isDimmed) alpha = 0.05;

                    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                    ctx.stroke();
                });
            });

            // Draw Nodes
            nodes.forEach(node => {
                if (node.opacity < 0.01) return;

                let nodeOpacity = node.opacity;
                const isHovered = hovered?.id === node.id;
                const isConnected = hovered?.connections.includes(node.id) || hovered?.id === node.id;

                if (hovered && !isConnected) {
                    nodeOpacity *= 0.2; // Dim others
                }

                const color = CATEGORY_COLORS[node.category as keyof typeof CATEGORY_COLORS];
                const radius = node.level * 8 + (isHovered ? 4 : 0);

                ctx.beginPath();
                ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);

                // Glow effect
                ctx.shadowColor = color;
                ctx.shadowBlur = isConnected ? 20 : 0;

                ctx.fillStyle = color;
                ctx.globalAlpha = nodeOpacity;
                ctx.fill();

                ctx.shadowBlur = 0; // reset
                ctx.globalAlpha = 1;

                // Draw labels only for hovered/connected or when fully loaded and not interacting
                if ((!hovered && animationProgress > 0.8) || isConnected) {
                    ctx.font = `500 ${isHovered ? '14px' : '12px'} Inter`;
                    ctx.fillStyle = `rgba(255, 255, 255, ${nodeOpacity * (isHovered ? 1 : 0.5)})`;
                    ctx.textAlign = 'center';
                    ctx.fillText(node.name, node.x, node.y - radius - 10);
                }
            });

            rafId = requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            width = canvas.parentElement?.clientWidth || window.innerWidth;
            height = canvas.parentElement?.clientHeight || 600;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(rafId);
        };
    }, [inView]);

    return (
        <div ref={containerRef} className="relative w-full h-[600px] bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden glass">
            <canvas ref={canvasRef} className="w-full h-full cursor-none" />

            {/* Tooltip Overlay Layer */}
            {hoveredNode && (
                <div
                    className="absolute pointer-events-none bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-sm"
                    style={{
                        left: hoveredNode.x,
                        top: hoveredNode.y + 20,
                        transform: 'translateX(-50%)'
                    }}
                >
                    <div className="font-display font-semibold text-white">{hoveredNode.name}</div>
                    <div className="text-muted-foreground text-xs uppercase mt-1 flex justify-between gap-4">
                        <span>{hoveredNode.category}</span>
                        <span style={{ color: CATEGORY_COLORS[hoveredNode.category as keyof typeof CATEGORY_COLORS] }}>
                            {(hoveredNode.level * 10).toFixed(1)}/10
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};
