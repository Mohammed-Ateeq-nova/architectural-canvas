import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/PageTransition';
import { Scene3D } from '@/components/Scene3D';
import { useState, useEffect, useRef } from 'react';

const roles = [
  'Full Stack Developer',
  'Front End Developer',
  'AI Engineer',
  'ML Engineer',
];

export const HeroSection = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [hasTypedPrefix, setHasTypedPrefix] = useState(false);
  const typingSpeed = useRef(100);
  
  const prefix = "I am a ";

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const fullText = hasTypedPrefix ? prefix + currentRole : prefix + currentRole;
    const targetText = hasTypedPrefix ? currentRole : prefix + currentRole;
    
    const handleTyping = () => {
      if (!hasTypedPrefix) {
        // First time - type the full "I am a [Role]"
        if (displayedText.length < fullText.length) {
          setDisplayedText(fullText.substring(0, displayedText.length + 1));
          typingSpeed.current = 100;
        } else {
          // Finished typing first time
          setHasTypedPrefix(true);
          typingSpeed.current = 2000; // Pause
          setIsDeleting(true);
        }
      } else {
        // Subsequent times - only type/delete the role part
        if (!isDeleting) {
          // Typing forward
          const currentDisplayRole = displayedText.substring(prefix.length);
          if (currentDisplayRole.length < currentRole.length) {
            setDisplayedText(prefix + currentRole.substring(0, currentDisplayRole.length + 1));
            typingSpeed.current = 100;
          } else {
            // Finished typing, pause before deleting
            typingSpeed.current = 2000;
            setIsDeleting(true);
          }
        } else {
          // Deleting - but keep the "I am a " prefix
          const currentDisplayRole = displayedText.substring(prefix.length);
          if (currentDisplayRole.length > 0) {
            setDisplayedText(prefix + currentRole.substring(0, currentDisplayRole.length - 1));
            typingSpeed.current = 50;
          } else {
            // Finished deleting, move to next role
            setIsDeleting(false);
            setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
            typingSpeed.current = 500;
          }
        }
      }
    };

    const timeout = setTimeout(handleTyping, typingSpeed.current);
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentRoleIndex, hasTypedPrefix]);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background - UNCHANGED */}
      <div className="absolute inset-0 opacity-30 dark:opacity-40">
        <Scene3D 
          scale={0.8}
          position={[0, -2, -5]}
          interactive={false}
        />
      </div>
      
      {/* Content - CENTERED LAYOUT */}
      <div className="relative z-10 section-container py-20">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Name */}
          <FadeIn delay={0.2}>
            <motion.h1 
              className="text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span className="block text-foreground">Mohammed</span>
              <span className="block dark:text-[hsl(var(--neon-cyan))] text-foreground/90">
                Ateeq
              </span>
            </motion.h1>
          </FadeIn>
          
          {/* Typewriter Role with "I am a" prefix */}
          <FadeIn delay={0.4}>
            <div className="mb-10 h-12 md:h-14 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold"
              >
                <span className="dark:text-[hsl(var(--neon-cyan))] text-foreground/80">
                  {displayedText}
                </span>
                <span 
                  className={`inline-block w-0.5 h-8 md:h-10 ml-1 dark:bg-[hsl(var(--neon-cyan))] bg-foreground/60 ${
                    showCursor ? 'opacity-100' : 'opacity-0'
                  } transition-opacity duration-100`}
                  style={{ verticalAlign: 'middle' }}
                />
              </motion.div>
            </div>
          </FadeIn>
          
          {/* Tagline */}
          <FadeIn delay={0.6}>
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 font-body leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Building scalable web applications, AI-driven systems, and hardware–software integrations 
              that solve real-world problems.
            </motion.p>
          </FadeIn>
          
          {/* CTA Buttons */}
          <FadeIn delay={0.8}>
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <a
                href="#projects"
                className="group glass rounded-full px-8 py-4 font-display font-medium text-base
                         hover:dark:bg-[hsl(var(--neon-cyan))]/10 hover:scale-105 
                         transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                View My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a
                href="mailto:mohd.ateeq.march@gmail.com"
                className="glass rounded-full px-8 py-4 font-display font-medium text-base
                         hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center"
              >
                Get In Touch
              </a>
            </motion.div>
          </FadeIn>
          
          {/* Social Links */}
          <FadeIn delay={1.0}>
            <motion.div 
              className="flex items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <a
                href="mailto:mohd.ateeq.march@gmail.com"
                className="glass rounded-full p-4 hover:scale-110 hover:dark:bg-[hsl(var(--neon-cyan))]/10 
                         transition-all duration-300 group"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 group-hover:dark:text-[hsl(var(--neon-cyan))] transition-colors" />
              </a>
              <a
                href="https://github.com/Mohammed-Ateeq-nova"
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-full p-4 hover:scale-110 hover:dark:bg-[hsl(var(--neon-cyan))]/10 
                         transition-all duration-300 group"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 group-hover:dark:text-[hsl(var(--neon-cyan))] transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/in/mohammed-ateeq/"
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-full p-4 hover:scale-110 hover:dark:bg-[hsl(var(--neon-cyan))]/10 
                         transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 group-hover:dark:text-[hsl(var(--neon-cyan))] transition-colors" />
              </a>
            </motion.div>
          </FadeIn>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs font-display uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
};