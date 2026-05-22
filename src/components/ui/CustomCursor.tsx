import { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isHoveringText, setIsHoveringText] = useState(false);

    // Custom cursor position state
    // Dot follows instantly
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Ring follows with simple spring/lerp lag (0.12)
    const cursorX = useSpring(0, { stiffness: 300, damping: 20, mass: 0.5 });
    const cursorY = useSpring(0, { stiffness: 300, damping: 20, mass: 0.5 });

    useEffect(() => {
        // Hide default cursor
        document.body.style.cursor = 'none';

        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Determine if interactive element
            const isClickable = target.closest('a') || target.closest('button') || target.closest('.cursor-pointer');
            setIsHovering(!!isClickable);

            // Determine if text element
            const isText = target.tagName.match(/^(H[1-6]|P|SPAN|A)$/);
            setIsHoveringText(!!isText && !isClickable);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            document.body.style.cursor = 'auto';
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    // Handle reduce motion fallback
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) {
        document.body.style.cursor = 'auto';
        return null;
    }

    return (
        <div className="hidden md:block">
            {/* Outer Ring */}
            <motion.div
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
                className="fixed top-0 left-0 w-10 h-10 border border-starlight/30 rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-transform duration-300"
                animate={{
                    scale: isHovering ? 1.5 : isHoveringText ? 0.8 : 1,
                    borderColor: isHovering ? 'rgba(0, 212, 255, 0.8)' : 'rgba(232, 244, 255, 0.3)',
                    borderWidth: isHoveringText ? '0px' : '1px',
                    width: isHoveringText ? '2px' : '40px',
                    height: isHoveringText ? '32px' : '40px',
                    borderRadius: isHoveringText ? '2px' : '50%',
                    backgroundColor: isHoveringText ? 'rgba(0, 212, 255, 0.8)' : 'transparent',
                }}
            />

            {/* Inner Dot */}
            <div
                className="fixed top-0 left-0 w-[6px] h-[6px] bg-cyan rounded-full pointer-events-none z-[10000] mix-blend-difference -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
                style={{
                    transform: `translate(${mousePos.x}px, ${mousePos.y}px) translate(-50%, -50%)`,
                    opacity: isHovering || isHoveringText ? 0 : 1
                }}
            />
        </div>
    );
};
