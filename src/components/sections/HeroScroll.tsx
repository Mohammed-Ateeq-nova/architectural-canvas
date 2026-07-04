import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useAnimationFrame, useMotionValueEvent } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';
import { ScrambleText } from '../ScrambleText';
import { ScrambleParagraph } from '../ScrambleParagraph';

export const HeroScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
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

  // Preload video metadata
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setVideoLoaded(true);
    };

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
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
    if (!videoLoaded) return;
    
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
  }, [currentText, isDeleting, titleIndex, videoLoaded, titles]);

  // Scroll animations
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Phase active states for ScrambleText triggers
  const [phase1Active, setPhase1Active] = useState(true);
  const [phase2Active, setPhase2Active] = useState(false);
  const [phase3Active, setPhase3Active] = useState(false);
  const [phase4Active, setPhase4Active] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setPhase1Active(latest >= 0.00 && latest <= 0.20);
    setPhase2Active(latest >= 0.22 && latest <= 0.52);
    setPhase3Active(latest >= 0.55 && latest <= 0.80);
    setPhase4Active(latest >= 0.82 && latest <= 1.00);
  });
  
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

  // Frame drawing and scroll-seeking logic
  useAnimationFrame(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !videoLoaded) return;
    
    const duration = video.duration || 0;
    const progressFactor = Math.min(1, scrollYProgress.get() / 0.75);
    const targetTime = progressFactor * duration;
    
    // Smoothly seek the video towards targetTime to avoid heavy seeks clogging the main thread
    const diff = targetTime - video.currentTime;
    if (Math.abs(diff) > 0.01 && !video.seeking) {
      video.currentTime += diff * 0.12;
    }
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const canvasAspectRatio = canvas.width / canvas.height;
      const videoAspectRatio = video.videoWidth / video.videoHeight;
      
      let drawWidth, drawHeight, offsetX, offsetY;
      
      if (canvasAspectRatio > videoAspectRatio) {
        drawHeight = canvas.height;
        drawWidth = video.videoWidth * (drawHeight / video.videoHeight);
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      } else {
        drawWidth = canvas.width;
        drawHeight = video.videoHeight * (drawWidth / video.videoWidth);
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      }
      
      ctx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight);
    }
  });

  return (
    <div ref={containerRef} className="h-[600vh] hero-scroll-container">
      <div className="hero-scroll-sticky">
        <video
          ref={videoRef}
          src="/hero.mp4"
          preload="auto"
          muted
          playsInline
          className="hidden"
        />

        {!videoLoaded && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
            <div className="hero-scroll-spinner" />
          </div>
        )}
        
        <canvas ref={canvasRef} className="hero-scroll-canvas relative z-[1]" style={{ pointerEvents: 'none' }} />
        
        {/* Dark Overlay for Text */}
        <div className="hero-scroll-overlay" />

        {/* Phase 1: Redesigned Staggered Hero Foreground */}
        <motion.div 
          className="absolute inset-0 flex flex-col justify-between p-4 sm:p-8 md:p-10 z-10 pointer-events-none"
          style={{ opacity: phase1Opacity }}
        >
          {/* Top Row: Spacer for Navigation bar compatibility */}
          <div className="h-12 w-full" />

          {/* Middle Row: Content Grid with optimized spacing to prevent layout clipping */}
          <div className="grid md:grid-cols-2 gap-6 items-center w-full mt-6 mb-auto pb-4">
            {/* Left Side: Staggered Name, Tagline, CTA */}
            <div className="flex flex-col items-start text-left max-w-xl">
              <div 
                className="cursor-pointer pointer-events-auto mb-4"
                onMouseEnter={() => setIsNameHovered(true)}
                onMouseLeave={() => setIsNameHovered(false)}
              >
                <h1 
                  className="font-bold tracking-[0.02em] leading-[1.0] select-none text-left flex flex-col uppercase font-display"
                  style={{ 
                    fontFamily: "'Audiowide', cursive",
                    fontSize: 'clamp(28px, 4.5vw, 68px)',
                  }}
                >
                  <div>
                    <ScrambleText 
                      text="MOHAMMED"
                      trigger={phase1Active}
                      delay={200}
                      className="text-white/95 transition-all duration-300 inline-block origin-left"
                      style={{
                        transform: isNameHovered ? 'scale(1.03)' : 'scale(1)',
                        textShadow: isNameHovered ? '0 0 20px rgba(255,255,255,0.45)' : 'none',
                        color: isNameHovered ? '#ffffff' : 'rgba(255,255,255,0.95)'
                      }}
                    />
                  </div>
                  
                  {/* Sliding scaleX blue line divider */}
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={phase1Active ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    style={{ originX: 0 }}
                    className="w-full max-w-[200px] h-[2px] bg-[#00e5ff] my-3 ml-[5%]" 
                  />
                  
                  <div className="pl-[25%] md:pl-[35%]">
                    <ScrambleText 
                      text="ATEEQ"
                      trigger={phase1Active}
                      delay={400}
                      className="text-white/95 transition-all duration-300 inline-block origin-left"
                      style={{
                        transform: isNameHovered ? 'scale(1.03)' : 'scale(1)',
                        textShadow: isNameHovered ? '0 0 20px rgba(255,255,255,0.45)' : 'none',
                        color: isNameHovered ? '#ffffff' : 'rgba(255,255,255,0.95)'
                      }}
                    />
                  </div>
                  
                  {/* Sliding subtitle bar & scaleX blue accent line */}
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={phase1Active ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                    className="flex items-center gap-2 my-2 w-full max-w-[260px] ml-[30%] md:ml-[40%]"
                  >
                    <span className="text-[#00e5ff] text-[9px] sm:text-[10px] tracking-[0.2em] font-sans">AI & FULLSTACK ENGINEER</span>
                    <motion.span 
                      initial={{ scaleX: 0 }}
                      animate={phase1Active ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
                      style={{ originX: 0 }}
                      className="h-[2px] flex-1 bg-[#00e5ff] block" 
                    />
                  </motion.div>
                </h1>
              </div>

              {/* Tagline with ScrambleText effect */}
              <ScrambleText 
                text="Engineering intelligent systems & elegant interfaces"
                trigger={phase1Active}
                delay={600}
                as="p"
                className="text-[#aaaaaa] text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-6 font-sans block"
              />

              {/* CTA Button with fade & slide-up animation */}
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={phase1Active ? { y: 0, opacity: 1 } : { y: 15, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
              >
                <a 
                  href="#projects"
                  className="bg-transparent border border-white/20 hover:border-[#00e5ff] hover:text-[#00e5ff] text-white rounded-full px-6 py-2.5 text-xs font-sans font-medium transition-all duration-300 block text-center pointer-events-auto flex items-center gap-2 group"
                >
                  <span>EXPLORE WORK</span>
                  <span className="w-5 h-5 rounded-full bg-white/10 group-hover:bg-[#00e5ff]/20 group-hover:text-[#00e5ff] flex items-center justify-center text-[10px] transition-colors duration-300">
                    &rarr;
                  </span>
                </a>
              </motion.div>
            </div>

            {/* Right Side: Spacer */}
            <div className="hidden md:block" />
          </div>

          {/* Bottom Row: Widgets with fade & slide-up animation */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={phase1Active ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
            className="w-full flex flex-col md:flex-row justify-between items-end gap-4 pb-2 sm:pb-4"
          >
            {/* Bottom Left: Single Row Widget Strip */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 pb-2 pointer-events-auto">
              {/* Carousel strip */}
              <div className="flex items-center gap-3">
                <span className="text-[9px] sm:text-[10px] tracking-[0.2em] text-white/40 uppercase font-sans whitespace-nowrap">
                  Projects
                </span>
                <div className="flex gap-2">
                  <Link to="/projects/factguard-ai" className="w-12 h-8 rounded overflow-hidden border border-white/10 hover:border-[#00e5ff] transition-all duration-300 group cursor-pointer block">
                    <img src="/projects/factguard/report.png" alt="FactGuard AI" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </Link>
                  <Link to="/projects/heart-risk-detection" className="w-12 h-8 rounded overflow-hidden border border-white/10 hover:border-[#00e5ff] transition-all duration-300 group cursor-pointer block">
                    <img src="/projects/heart-risk/analysis.png" alt="Heart Risk Detection" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </Link>
                  <Link to="/projects/vidyaai" className="w-12 h-8 rounded overflow-hidden border border-white/10 hover:border-[#00e5ff] transition-all duration-300 group cursor-pointer block">
                    <img src="/projects/vidhya-ai/response.png" alt="VidyaAI" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </Link>
                </div>
              </div>

              {/* Vertical divider on desktop */}
              <span className="hidden md:inline h-5 w-[1px] bg-white/15" />

              {/* Social icons */}
              <div className="flex gap-3 items-center">
                <a href="https://github.com/Mohammed-Ateeq-nova" target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#00e5ff] transition-colors">
                  <Github size={15} />
                </a>
                <a href="https://www.linkedin.com/in/mohammed-ateeq/" target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#00e5ff] transition-colors">
                  <Linkedin size={15} />
                </a>
                <a href="mailto:mohd.ateeq.march@gmail.com" className="text-white/40 hover:text-[#00e5ff] transition-colors">
                  <Mail size={15} />
                </a>
              </div>

              {/* Vertical divider on desktop */}
              <span className="hidden md:inline h-5 w-[1px] bg-white/15" />

              {/* Scroll vertical indicator */}
              <div className="flex items-center gap-2 text-white/40 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase">
                <span>Scroll</span>
                <span className="animate-bounce">&darr;</span>
              </div>
            </div>

            {/* Bottom Right: Capabilities description (Desktop only) */}
            <div className="hidden md:flex flex-col items-end text-right max-w-sm pb-2">
              <p className="text-white/50 text-[11px] leading-relaxed font-sans mb-1">
                I build high-performance web applications and integrate deep learning models, bridging the gap between advanced AI research and responsive user interfaces.
              </p>
              <span className="text-[#00e5ff] text-[9px] tracking-[0.2em] font-sans uppercase">
                YOU IMAGINE. I BUILD.
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Phase 2: Left Panel */}
        <motion.div 
          className="hero-scroll-text-container hero-scroll-text-left"
          style={{ opacity: phase2Opacity, x: phase2X }}
        >
          <div className="max-w-[480px] text-left">
            <ScrambleText
              text="MOHAMMED ATEEQ"
              className="text-[13px] tracking-[0.3em] text-[#00e5ff] uppercase mb-4 font-medium block"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              trigger={phase2Active}
            />
            <h2 
              className="text-white font-bold mb-6" 
              style={{ 
                fontFamily: "'Audiowide', cursive", 
                fontSize: 'clamp(24px, 3.5vw, 40px)', 
                fontWeight: 700, 
                lineHeight: 1.3,
                minHeight: '1.3em'
              }}
            >
              <span>{currentText}</span>
              <span className="text-[#00e5ff] animate-pulse ml-1">|</span>
            </h2>
            <ScrambleParagraph
              text="CS undergraduate at Anurag University, Hyderabad. I build scalable web applications, computer vision systems, and AI-driven solutions. Proficient in React, Next.js, Python, and TensorFlow — I write clean, efficient code that solves real problems and delivers measurable impact."
              className="text-[#aaaaaa] text-[15px] leading-[1.7] mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              wordStaggerMs={60}
              trigger={phase2Active}
            />
            <ScrambleText
              text="Clean architecture · User-first design · Relentless iteration"
              className="text-sm italic text-[#00e5ff]/80 block"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              trigger={phase2Active}
            />
          </div>
        </motion.div>

        {/* Phase 3: Right Panel */}
        <motion.div 
          className="hero-scroll-text-container hero-scroll-text-right"
          style={{ opacity: phase3Opacity, x: phase3X }}
        >
          <div className="max-w-[480px] text-right ml-auto">
            <ScrambleText
              text="WHAT I BUILD"
              className="text-[13px] tracking-[0.3em] text-[#00e5ff] uppercase mb-6 font-medium block"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              trigger={phase3Active}
            />
            
            <div className="space-y-4 mb-8 flex flex-col items-end w-full">
              {[
                "AI & ML Solutions",
                "Full-Stack Applications",
                "UI/UX Experiences",
                "Intelligent Automation"
              ].map((item, i) => (
                <div
                  key={i}
                  className="border-r-2 border-[#00e5ff] pr-4 py-1 block text-right"
                >
                  <ScrambleText
                    text={item}
                    as="h3"
                    trigger={phase3Active}
                    delay={i * 80}
                    className="text-white text-[24px] font-bold block text-right"
                    style={{ fontFamily: "'Audiowide', cursive" }}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 justify-end mt-4 w-full">
              {['Clean Code', 'Performance', 'User Impact', 'Continuous Learning'].map((value, index) => (
                <span 
                  key={index}
                  className="bg-transparent border border-[#00e5ff]/20 text-[#00e5ff] rounded-full px-[14px] py-[4px] text-[12px] block"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <ScrambleText text={value} trigger={phase3Active} />
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
          <div className="flex flex-wrap justify-center items-baseline mb-4 text-white uppercase px-4" style={{ fontFamily: "'Audiowide', cursive", fontSize: 'clamp(20px, 4.5vw, 60px)', lineHeight: 1.2 }}>
            <ScrambleText text="LET'S BUILD SOMETHING REAL" className="block" trigger={phase4Active} />
            <ScrambleText text="." className="text-[#00e5ff] block" trigger={phase4Active} delay={1000} />
          </div>
          <ScrambleParagraph
            text="Open to roles, freelance projects, and research collaborations."
            className="text-[#00e5ff] text-[16px] mb-8 text-center"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            wordStaggerMs={50}
            trigger={phase4Active}
          />
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-10 w-full">
            <a 
              href="#projects"
              className="bg-white/10 text-white border border-white/20 hover:bg-white hover:text-black rounded-full px-[32px] py-[14px] font-medium transition-all duration-300 block text-center"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <ScrambleText text="View My Work →" trigger={phase4Active} />
            </a>
            <a 
              href="#contact"
              className="bg-transparent text-[#00e5ff] border border-[#00e5ff] hover:bg-[#00e5ff] hover:text-black rounded-full px-[32px] py-[14px] font-medium transition-all duration-300 block text-center"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <ScrambleText text="Get In Touch" trigger={phase4Active} />
            </a>
          </div>
          
          <div className="flex gap-4 items-center justify-center">
            <a 
              href="mailto:mohd.ateeq.march@gmail.com" 
              className="flex items-center justify-center w-[44px] h-[44px] rounded-full bg-white/5 border border-white/15 text-white hover:border-[#00e5ff] hover:text-[#00e5ff] transition-all duration-300"
            >
              <Mail size={18} />
            </a>
            <a 
              href="https://github.com/Mohammed-Ateeq-nova" 
              target="_blank" rel="noreferrer"
              className="flex items-center justify-center w-[44px] h-[44px] rounded-full bg-white/5 border border-white/15 text-white hover:border-[#00e5ff] hover:text-[#00e5ff] transition-all duration-300"
            >
              <Github size={18} />
            </a>
            <a 
              href="https://www.linkedin.com/in/mohammed-ateeq/" 
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
