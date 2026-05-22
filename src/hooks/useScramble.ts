import { useState, useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export const useScramble = (text: string, duration: number = 800, delay: number = 0) => {
    const [displayText, setDisplayText] = useState('');
    const [isScrambling, setIsScrambling] = useState(false);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;

        const startScrambling = () => {
            setIsScrambling(true);
            const startTime = Date.now();
            const length = text.length;

            const animate = () => {
                const now = Date.now();
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Calculate how many characters should be resolved
                const resolvedChars = Math.floor(progress * length);

                let currentText = '';
                for (let i = 0; i < length; i++) {
                    if (text[i] === ' ') {
                        currentText += ' ';
                        continue;
                    }
                    if (i < resolvedChars) {
                        currentText += text[i];
                    } else {
                        currentText += CHARS[Math.floor(Math.random() * CHARS.length)];
                    }
                }

                setDisplayText(currentText);

                if (progress < 1) {
                    rafRef.current = requestAnimationFrame(animate);
                } else {
                    setIsScrambling(false);
                    setDisplayText(text);
                }
            };

            rafRef.current = requestAnimationFrame(animate);
        };

        if (delay > 0) {
            timeoutId = setTimeout(startScrambling, delay);
        } else {
            startScrambling();
        }

        return () => {
            clearTimeout(timeoutId);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [text, duration, delay]);

    return { displayText, isScrambling };
};
