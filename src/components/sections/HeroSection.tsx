import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { FadeIn } from '@/components/PageTransition';
import { Scene3D } from '@/components/Scene3D';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30 dark:opacity-40">
        <Scene3D 
          scale={0.8}
          position={[0, -2, -5]}
          interactive={false}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 section-container">
        <div className="max-w-5xl mx-auto text-center">
          <FadeIn delay={0.2}>
            <span className="inline-block px-4 py-2 mb-8 text-sm font-display font-medium tracking-widest uppercase glass rounded-full">
              Creative Engineer & Digital Architect
            </span>
          </FadeIn>
          
          <FadeIn delay={0.4}>
            <h1 className="text-display-xl mb-6">
              <span className="block">Building</span>
              <span className="block dark:neon-text-cyan">
                Digital Worlds
              </span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.6}>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 font-body">
              A platform showcasing the intersection of code, creativity, and experiential design.
            </p>
          </FadeIn>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs font-display uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
};
