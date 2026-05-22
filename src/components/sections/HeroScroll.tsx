import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useAnimationFrame } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';

export const HeroScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const images = useRef<HTMLImageElement[]>([]);
  
  const [isNameHovered, setIsNameHovered] = useState(false);

  // Typewriter effect states
  const titles = [
    "ML Engineer",
    "Full Stack Developer",
    "Frontend Developer"
  ];
  const [titleIndex, setTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const totalFrames = 59;
    
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, '0');
      img.src = `/Hero_Frames/ezgif-frame-${paddedIndex}.png`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setImagesLoaded(true);
        }
      };
      // Important to push to array first so order is preserved
      images.current.push(img);
    }
  }, []);

  // Resize canvas
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Typewriter effect logic
  useEffect(() => {
    if (!imagesLoaded) return;
    
    const timeout = setTimeout(() => {
      const fullText = titles[titleIndex];
      
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, isDeleting ? 50 : 100);
    
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, titleIndex, imagesLoaded, titles]);

  // Scroll animations
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Map scroll progress 0->0.75 to frame index 0->58
  const frameIndex = useTransform(scrollYProgress, [0, 0.75], [0, 58]);
  
  // Phase 1: Ghost Text (0 -> 15%) - Fades out between 0.12 and 0.20
  const phase1Opacity = useTransform(scrollYProgress, [0.12, 0.20], [1, 0]);
  
  // Phase 2: Left Panel (22% -> 48%) - Enters 0.22->0.32, Exits 0.44->0.50
  const phase2Opacity = useTransform(scrollYProgress, [0.22, 0.32, 0.44, 0.50], [0, 1, 1, 0]);
  const phase2X = useTransform(scrollYProgress, [0.22, 0.32], [-60, 0]);
  
  // Phase 3: Right Panel (55% -> 75%) - Enters 0.55->0.65, Exits 0.72->0.78
  const phase3Opacity = useTransform(scrollYProgress, [0.55, 0.65, 0.72, 0.78], [0, 1, 1, 0]);
  const phase3X = useTransform(scrollYProgress, [0.55, 0.65], [60, 0]);
  
  // Phase 4: Center CTA (80% -> 100%) - Enters 0.80->0.88
  const phase4Opacity = useTransform(scrollYProgress, [0.80, 0.88], [0, 1]);

  // Frame drawing
  useAnimationFrame(() => {
    if (!imagesLoaded || !canvasRef.current) return;
    
    const currentFrame = Math.min(58, Math.max(0, Math.round(frameIndex.get())));
    const img = images.current[currentFrame];
    
    if (img) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        
        const canvasAspectRatio = canvasRef.current.width / canvasRef.current.height;
        const imgAspectRatio = img.width / img.height;
        
        let drawWidth, drawHeight, offsetX, offsetY;
        
        if (canvasAspectRatio > imgAspectRatio) {
          drawHeight = canvasRef.current.height;
          drawWidth = img.width * (drawHeight / img.height);
          offsetX = (canvasRef.current.width - drawWidth) / 2;
          offsetY = 0;
        } else {
          drawWidth = canvasRef.current.width;
          drawHeight = img.height * (drawWidth / img.width);
          offsetX = 0;
          offsetY = (canvasRef.current.height - drawHeight) / 2;
        }
        
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    }
  });

  return (
    <div ref={containerRef} className="h-[600vh] hero-scroll-container">
      <div className="hero-scroll-sticky">
        {!imagesLoaded && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
            <div className="hero-scroll-spinner" />
          </div>
        )}
        
        <canvas ref={canvasRef} className="hero-scroll-canvas relative z-[1]" style={{ pointerEvents: 'none' }} />
        
        {/* Dark Overlay for Text */}
        <div className="hero-scroll-overlay" />

        {/* Phase 1: Ghost Text (Behind Canvas theoretically, but we use absolute & opacity) */}
        <motion.div 
          className="hero-scroll-text-container hero-scroll-text-center z-0"
          style={{ opacity: phase1Opacity }}
        >
          <div 
            className="flex flex-col items-center justify-center w-full cursor-pointer"
            style={{ 
              fontFamily: "'Bebas Neue', sans-serif",
              pointerEvents: 'auto',
              transform: isNameHovered ? 'scale(1.04)' : 'scale(1)',
              transition: 'all 0.4s ease'
            }}
            onMouseEnter={() => setIsNameHovered(true)}
            onMouseLeave={() => setIsNameHovered(false)}
          >
            <h1 
              className="text-white leading-[0.85] tracking-[0.05em]"
              style={{ 
                fontSize: 'clamp(40px, 11vw, 160px)', 
                color: isNameHovered ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.35)',
                textShadow: isNameHovered ? '0 0 40px rgba(255,255,255,0.6), 0 0 80px rgba(255,255,255,0.3)' : 'none',
                WebkitTextStroke: isNameHovered ? '1px rgba(255,255,255,0.7)' : 'none',
                transition: 'all 0.4s ease'
              }}
            >
              MOHAMMED
            </h1>
            <h1 
              className="text-white leading-[0.85] tracking-[0.05em]"
              style={{ 
                fontSize: 'clamp(40px, 11vw, 160px)', 
                color: isNameHovered ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.35)',
                textShadow: isNameHovered ? '0 0 40px rgba(255,255,255,0.6), 0 0 80px rgba(255,255,255,0.3)' : 'none',
                WebkitTextStroke: isNameHovered ? '1px rgba(255,255,255,0.7)' : 'none',
                transition: 'all 0.4s ease'
              }}
            >
              ATEEQ
            </h1>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-white/40 uppercase tracking-[0.3em] text-[11px] animate-pulse">
            Scroll &darr;
          </div>
        </motion.div>

        {/* Phase 2: Left Panel */}
        <motion.div 
          className="hero-scroll-text-container hero-scroll-text-left"
          style={{ opacity: phase2Opacity, x: phase2X }}
        >
          <div className="backdrop-blur-md bg-black/40 rounded-lg max-w-[480px] p-10 border border-white/5">
            <p className="text-[13px] tracking-[0.3em] text-[#00e5ff] uppercase mb-4 font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              MOHAMMED ATEEQ
            </p>
            <h2 
              className="text-white font-bold mb-6" 
              style={{ 
                fontFamily: "'Syne', sans-serif", 
                fontSize: 'clamp(28px, 4vw, 48px)', 
                fontWeight: 800, 
                lineHeight: 1.2,
                minHeight: '1.2em'
              }}
            >
              <span>{currentText}</span>
              <span className="text-[#00e5ff] animate-pulse ml-1">|</span>
            </h2>
            <p 
              className="text-[#aaaaaa] text-[15px] leading-[1.7] mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              CS undergraduate at Anurag University, Hyderabad. I build scalable web apps, AI-driven systems, and defense-grade hardware-software integrations. I write clean, efficient code that solves real problems and delivers measurable impact.
            </p>
            <p 
              className="text-sm italic text-[#00e5ff]/80"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Clean architecture &middot; User-first design &middot; Relentless iteration
            </p>
          </div>
        </motion.div>

        {/* Phase 3: Right Panel */}
        <motion.div 
          className="hero-scroll-text-container hero-scroll-text-right"
          style={{ opacity: phase3Opacity, x: phase3X }}
        >
          <div className="backdrop-blur-md bg-black/40 rounded-lg max-w-[480px] p-10 border border-white/5 text-right ml-auto">
            <p className="text-[13px] tracking-[0.3em] text-[#00e5ff] uppercase mb-6 font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              WHAT I BUILD
            </p>
            
            <div className="space-y-4 mb-8 flex flex-col items-end">
              {[
                "AI & ML Systems",
                "Full-Stack Web Applications",
                "Hardware–Software Integration",
                "Real-Time Diagnostic Tools"
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="border-r-2 border-[#00e5ff] pr-4 py-1"
                >
                  <h3 className="text-white text-[28px] font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {item}
                  </h3>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 justify-end mt-4">
              {['Clean Code', 'Performance', 'User Impact', 'Continuous Learning'].map((value, index) => (
                <span 
                  key={index}
                  className="bg-transparent border border-[#00e5ff]/20 text-[#00e5ff] rounded-full px-[14px] py-[4px] text-[12px]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {value}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Phase 4: Center CTA */}
        <motion.div 
          className="hero-scroll-text-container hero-scroll-text-center"
          style={{ opacity: phase4Opacity }}
        >
          <h2 
            className="text-white uppercase mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(52px, 8vw, 96px)', lineHeight: 1 }}
          >
            LET'S BUILD SOMETHING REAL.
          </h2>
          <p 
            className="text-[#00e5ff] text-[16px] mb-8"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Open to roles, freelance projects, and research collaborations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-10">
            <a 
              href="#projects"
              className="bg-white/10 text-white border border-white/20 hover:bg-white hover:text-black rounded-full px-[32px] py-[14px] font-medium transition-all duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              View My Work &rarr;
            </a>
            <a 
              href="#contact"
              className="bg-transparent text-[#00e5ff] border border-[#00e5ff] hover:bg-[#00e5ff] hover:text-black rounded-full px-[32px] py-[14px] font-medium transition-all duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Get In Touch
            </a>
          </div>
          
          <div className="flex gap-4 items-center justify-center">
            <a 
              href="mailto:contact@example.com" 
              className="flex items-center justify-center w-[44px] h-[44px] rounded-full bg-white/5 border border-white/15 text-white hover:border-[#00e5ff] hover:text-[#00e5ff] transition-all duration-300"
            >
              <Mail size={18} />
            </a>
            <a 
              href="https://github.com" 
              target="_blank" rel="noreferrer"
              className="flex items-center justify-center w-[44px] h-[44px] rounded-full bg-white/5 border border-white/15 text-white hover:border-[#00e5ff] hover:text-[#00e5ff] transition-all duration-300"
            >
              <Github size={18} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" rel="noreferrer"
              className="flex items-center justify-center w-[44px] h-[44px] rounded-full bg-white/5 border border-white/15 text-white hover:border-[#00e5ff] hover:text-[#00e5ff] transition-all duration-300"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
