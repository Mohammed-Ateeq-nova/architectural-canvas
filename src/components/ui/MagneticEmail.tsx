import { useRef, MouseEvent, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const MagneticChar = ({ char }: { char: string }) => {
    const ref = useRef<HTMLSpanElement>(null);

    // Spring config for the magnetic repel
    const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
    const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e: MouseEvent<HTMLSpanElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        // Repel radius: 40px
        const repelRadius = 40;

        if (distance < repelRadius) {
            // Pushes characters AWAY from cursor
            const force = (repelRadius - distance) / repelRadius;
            x.set(-(distanceX / distance) * force * 20);
            y.set(-(distanceY / distance) * force * 20);
        } else {
            x.set(0);
            y.set(0);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.span
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x, y, display: 'inline-block' }}
            className="relative z-20 hover:text-cyan transition-colors duration-300"
        >
            {char}
        </motion.span>
    );
};

export const MagneticEmail = ({ email }: { email: string }) => {
    const [copied, setCopied] = useState(false);
    const chars = Array.from(email);

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group cursor-pointer" onClick={handleCopy}>
            {/* Wave Color Cycle on Hover */}
            <div className="text-[clamp(32px,6vw,72px)] font-display font-bold tracking-tight text-starlight select-none">
                {copied ? (
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-pink ml-4"
                    >
                        COPIED!
                    </motion.span>
                ) : (
                    <div className="flex flex-wrap">
                        {chars.map((char, i) => (
                            <MagneticChar key={i} char={char} />
                        ))}
                    </div>
                )}
            </div>

            {!copied && (
                <span className="absolute -bottom-8 left-0 text-sm font-mono text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Click to copy address
                </span>
            )}
        </div>
    );
};
