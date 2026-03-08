import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
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
              Full Stack & AI Developer
            </span>
          </FadeIn>
          
          <FadeIn delay={0.4}>
            <h1 className="text-display-xl mb-6">
              <span className="block">Mohammed</span>
              <span className="block dark:neon-text-cyan">
                Ateeq
              </span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.6}>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 font-body">
              Building scalable web applications, AI-driven systems, and hardware–software integrations.
            </p>
          </FadeIn>

          <FadeIn delay={0.8}>
            <div className="flex items-center justify-center gap-4">
              <a
                href="mailto:mohd.ateeq.march@gmail.com"
                className="glass rounded-full p-3 hover:scale-110 transition-transform"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/Mohammed-Ateeq-nova"
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-full p-3 hover:scale-110 transition-transform"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/mohammed-ateeq/"
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-full p-3 hover:scale-110 transition-transform"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2"
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
