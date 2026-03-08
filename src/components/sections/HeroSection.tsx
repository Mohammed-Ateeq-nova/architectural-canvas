import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

const roles = ['AI Developer', 'Frontend Developer', 'Fullstack Developer'];

const RoleAnimator = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block h-[1.15em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={activeIndex}
          initial={{ y: '100%', opacity: 0, rotateX: -40 }}
          animate={{ y: '0%', opacity: 1, rotateX: 0 }}
          exit={{ y: '-100%', opacity: 0, rotateX: 40 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="block dark:neon-text-cyan"
          style={{ transformOrigin: 'center bottom' }}
        >
          {roles[activeIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const midY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const fgY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const fgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 0.6]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background Layer */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -z-30"
      >
        {/* Ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-neon-cyan/5 dark:bg-neon-cyan/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-neon-magenta/5 dark:bg-neon-magenta/8 blur-[100px]" />
      </motion.div>

      {/* Parallax Midground Layer — grid + particles */}
      <motion.div
        style={{ y: midY }}
        className="absolute inset-0 -z-20"
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        {/* Floating geometric shapes */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[20%] right-[15%] w-16 h-16 border border-border/30 dark:border-neon-cyan/20 rounded-lg rotate-45"
        />
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-[30%] left-[10%] w-12 h-12 border border-border/20 dark:border-neon-magenta/15 rounded-full"
        />
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-[60%] right-[25%] w-8 h-8 bg-foreground/5 dark:bg-neon-cyan/10 rounded-sm rotate-12"
        />
      </motion.div>

      {/* Foreground content */}
      <motion.div
        style={{ y: fgY, scale: fgScale }}
        className="relative z-10 section-container"
      >
        <div className="max-w-5xl mx-auto">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-display font-medium tracking-widest uppercase glass rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Available for opportunities
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-display-xl mb-4 leading-[0.95]">
              <span className="block text-foreground">Mohammed</span>
              <span className="block dark:neon-text-cyan">Ateeq</span>
            </h1>
          </motion.div>

          {/* Animated role */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <p className="text-display-sm text-muted-foreground font-display">
              <RoleAnimator />
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mb-12 font-body leading-relaxed"
          >
            Building scalable web applications, AI-driven systems, and
            hardware–software integrations that push boundaries.
          </motion.p>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4"
          >
            {[
              { href: 'mailto:mohd.ateeq.march@gmail.com', icon: Mail, label: 'Email' },
              { href: 'https://github.com/Mohammed-Ateeq-nova', icon: Github, label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/mohammed-ateeq/', icon: Linkedin, label: 'LinkedIn' },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={label !== 'Email' ? '_blank' : undefined}
                rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                className="glass rounded-full p-3 hover:scale-110 transition-all duration-300 dark:hover:shadow-glow-cyan"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}

            <a
              href="#contact"
              className="ml-4 glass rounded-full px-6 py-3 font-display font-medium text-sm hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
            >
              Let's Talk
              <span className="text-xs">→</span>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll-based overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-background pointer-events-none z-20"
      />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-[10px] font-display uppercase tracking-[0.3em]">Scroll</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </motion.div>
      </motion.div>
    </section>
  );
};
