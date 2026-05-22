import { motion } from 'framer-motion';
import { ConstellationMap } from '../ui/ConstellationMap';

export const SkillsSection = () => {
    return (
        <section className="relative min-h-screen py-24 md:py-32 flex flex-col justify-center bg-background overflow-hidden z-10">

            {/* Background glow behind constellation */}
            <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(circle_at_center,rgba(255,60,110,0.1)_0%,transparent_100%)]" />

            <div className="section-container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="mb-12 md:mb-16 text-center"
                >
                    <span className="inline-block px-4 py-2 mb-6 text-xs font-display font-medium tracking-widest uppercase glass rounded-full text-muted-foreground border-white/5 bg-white/5">
                        Technical Ecosystem
                    </span>
                    <h2 className="text-display-md text-foreground font-display tracking-tight">
                        The <span className="text-pink">Constellation</span>
                    </h2>
                    <p className="mt-4 text-muted-foreground font-body max-w-2xl mx-auto">
                        A visual map of the tools, languages, and frameworks I use to bring ideas to life. Connect the nodes to see architectural relationships.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                >
                    <ConstellationMap />
                </motion.div>
            </div>
        </section>
    );
};
