import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const EnhancedSiteLoader = ({
    onLoadComplete,
    minDisplayTime = 1800
}: {
    onLoadComplete: () => void;
    minDisplayTime?: number;
}) => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Disable scrolling during load
        document.body.style.overflow = 'hidden';

        // Wait for minimum display time
        const timer = setTimeout(() => {
            setIsReady(true);
            // Wait for exit animation to finish before notifying parent
            setTimeout(() => {
                onLoadComplete();
                document.body.style.overflow = '';
            }, 1000);
        }, minDisplayTime);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = '';
        };
    }, [onLoadComplete, minDisplayTime]);

    return (
        <AnimatePresence>
            {!isReady && (
                <div className="fixed inset-0 z-[100] flex flex-col pointer-events-none">
                    {/* Top Panel */}
                    <motion.div
                        initial={{ y: 0 }}
                        exit={{ y: '-100%' }}
                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                        className="flex-1 bg-background w-full border-b border-white/5 flex items-end justify-center pb-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-display-lg font-display text-starlight tracking-tight overflow-hidden"
                        >
                            <motion.span
                                initial={{ y: '100%' }}
                                animate={{ y: '0%' }}
                                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                                className="block uppercase"
                            >
                                MOHAMMED
                            </motion.span>
                        </motion.div>
                    </motion.div>

                    {/* Bottom Panel */}
                    <motion.div
                        initial={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                        className="flex-1 bg-background w-full flex items-start justify-center pt-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-display-lg font-display text-cyan tracking-tight overflow-hidden"
                        >
                            <motion.span
                                initial={{ y: '-100%' }}
                                animate={{ y: '0%' }}
                                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                                className="block uppercase"
                            >
                                ATEEQ
                            </motion.span>
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
