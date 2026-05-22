import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowDown, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

/* ─── Constants ─── */
const TOTAL_FRAMES = 59;
const FRAME_PATH = (i: number) =>
  `/Hero_Frames/ezgif-frame-${String(i).padStart(3, '0')}.png`;

const roles = [
  'ML Engineer',
  'Full Stack Developer',
  'Front End Developer',
];

/* ─── Typewriter Hook (runs independently of scroll) ─── */
function useTypewriter(words: string[], prefix = 'I am a ') {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [prefixDone, setPrefixDone] = useState(false);
  const speed = useRef(100);

  useEffect(() => {
    const word = words[wordIdx];
    const full = prefix + word;

    const tick = () => {
      if (!prefixDone) {
        if (displayed.length < full.length) {
          setDisplayed(full.slice(0, displayed.length + 1));
          speed.current = 100;
        } else {
          setPrefixDone(true);
          speed.current = 2000;
          setIsDeleting(true);
        }
      } else if (!isDeleting) {
        const role = displayed.slice(prefix.length);
        if (role.length < word.length) {
          setDisplayed(prefix + word.slice(0, role.length + 1));
          speed.current = 100;
        } else {
          speed.current = 2000;
          setIsDeleting(true);
        }
      } else {
        const role = displayed.slice(prefix.length);
        if (role.length > 0) {
          setDisplayed(prefix + word.slice(0, role.length - 1));
          speed.current = 50;
        } else {
          setIsDeleting(false);
          setWordIdx((p) => (p + 1) % words.length);
          speed.current = 500;
        }
      }
    };

    const id = setTimeout(tick, speed.current);
    return () => clearTimeout(id);
  }, [displayed, isDeleting, wordIdx, prefixDone, words, prefix]);

  return displayed;
}

/* ─── Blinking cursor hook ─── */
function useCursorBlink(interval = 500) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setVisible((v) => !v), interval);
    return () => clearInterval(id);
  }, [interval]);
  return visible;
}

/* ─── Main Component ─── */
export const HeroScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const currentFrame = useRef(0);
  const rafId = useRef(0);

  const typedText = useTypewriter(roles);
  const cursorOn = useCursorBlink();

  /* ── Preload all frames ── */
  useEffect(() => {
    let mounted = true;
    let count = 0;
    const imgs: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i + 1);
      img.onload = () => {
        if (!mounted) return;
        count++;
        setLoadProgress(Math.round((count / TOTAL_FRAMES) * 100));
        if (count === TOTAL_FRAMES) {
          framesRef.current = imgs;
          setLoaded(true);
          // Draw first frame immediately
          drawFrame(0);
        }
      };
      img.onerror = () => {
        if (!mounted) return;
        count++;
        setLoadProgress(Math.round((count / TOTAL_FRAMES) * 100));
        if (count === TOTAL_FRAMES) {
          framesRef.current = imgs;
          setLoaded(true);
          drawFrame(0);
        }
      };
      imgs[i] = img;
    }

    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Canvas draw with object-contain scaling ── */
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = framesRef.current[index];
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const displayW = canvas.clientWidth;
    const displayH = canvas.clientHeight;

    if (canvas.width !== displayW * dpr || canvas.height !== displayH * dpr) {
      canvas.width = displayW * dpr;
      canvas.height = displayH * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, displayW, displayH);

    // object-contain logic
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = displayW / displayH;
    let drawW: number, drawH: number, dx: number, dy: number;

    if (imgRatio > canvasRatio) {
      drawW = displayW;
      drawH = displayW / imgRatio;
      dx = 0;
      dy = (displayH - drawH) / 2;
    } else {
      drawH = displayH;
      drawW = displayH * imgRatio;
      dx = (displayW - drawW) / 2;
      dy = 0;
    }

    ctx.drawImage(img, dx, dy, drawW, drawH);
  }, []);

  /* ── Resize handler ── */
  useEffect(() => {
    const handleResize = () => {
      if (loaded) drawFrame(currentFrame.current);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [loaded, drawFrame]);

  /* ── Scroll progress → frame index ── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (!loaded) return;
    const index = Math.min(Math.round(progress * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1);
    if (index !== currentFrame.current) {
      currentFrame.current = index;
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => drawFrame(index));
    }
  });

  /* ── Text overlay opacity/y transforms ── */
  // Section 1: 0% – 15% (intro)
  const s1Opacity = useTransform(scrollYProgress, [0, 0.02, 0.12, 0.18], [1, 1, 1, 0]);
  const s1Y = useTransform(scrollYProgress, [0, 0.02, 0.12, 0.18], [0, 0, 0, -60]);

  // Scroll indicator: visible 0-8%, fades 8-12%
  const scrollIndOpacity = useTransform(scrollYProgress, [0, 0.06, 0.08, 0.12], [1, 1, 0.5, 0]);

  // Section 2: 25% – 45%
  const s2Opacity = useTransform(scrollYProgress, [0.20, 0.28, 0.40, 0.48], [0, 1, 1, 0]);
  const s2Y = useTransform(scrollYProgress, [0.20, 0.28, 0.40, 0.48], [60, 0, 0, -60]);

  // Section 3: 50% – 70%
  const s3Opacity = useTransform(scrollYProgress, [0.45, 0.53, 0.65, 0.73], [0, 1, 1, 0]);
  const s3Y = useTransform(scrollYProgress, [0.45, 0.53, 0.65, 0.73], [60, 0, 0, -60]);

  // Section 4: 80% – 95%
  const s4Opacity = useTransform(scrollYProgress, [0.75, 0.83, 0.92, 0.98], [0, 1, 1, 0]);
  const s4Y = useTransform(scrollYProgress, [0.75, 0.83, 0.92, 0.98], [60, 0, 0, -60]);

  /* ── Loading Screen ── */
  if (!loaded) {
    return (
      <div 
        className="h-screen w-full flex flex-col items-center justify-center text-zinc-400" 
        style={{ backgroundColor: '#000000' }}
      >
        <div className="hero-scroll-spinner" />
        <p className="mt-6 text-sm font-display text-zinc-400 tracking-widest uppercase">
          Loading Experience… {loadProgress}%
        </p>
        <div className="mt-3 w-48 h-1 rounded-full bg-zinc-800 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-200"
            style={{
              width: `${loadProgress}%`,
              background: 'linear-gradient(90deg, hsl(185 100% 50%), hsl(220 100% 60%))',
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="hero-scroll-container" style={{ height: '500vh', backgroundColor: '#000000' }}>
      {/* Sticky canvas layer */}
      <div className="hero-scroll-sticky" style={{ backgroundColor: '#000000' }}>
        <canvas
          ref={canvasRef}
          className="hero-scroll-canvas"
          style={{ backgroundColor: '#000000' }}
        />

        {/* Dark overlay for text legibility */}
        <div className="hero-scroll-overlay" />

        {/* ── Section 1: Intro (0 – 15%) ── */}
        <motion.div
          style={{ opacity: s1Opacity, y: s1Y }}
          className="hero-scroll-text-container hero-scroll-text-center"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight">
            <span className="block text-foreground">Mohammed</span>
            <span className="block text-[hsl(185,100%,50%)]">Ateeq</span>
          </h1>

          <div className="mb-8 h-12 md:h-14 flex items-center justify-center">
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-semibold">
              <span className="text-[hsl(185,100%,50%)]">{typedText}</span>
              <span
                className={`inline-block w-0.5 h-7 md:h-9 ml-1 bg-[hsl(185,100%,50%)] transition-opacity duration-100 ${
                  cursorOn ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ verticalAlign: 'middle' }}
              />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="#projects"
              className="group glass rounded-full px-8 py-4 font-display font-medium text-base
                       hover:bg-[hsl(185,100%,50%)]/10 hover:scale-105
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
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-4">
            <a
              href="mailto:mohd.ateeq.march@gmail.com"
              className="glass rounded-full p-4 hover:scale-110 hover:bg-[hsl(185,100%,50%)]/10
                       transition-all duration-300 group"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 group-hover:text-[hsl(185,100%,50%)] transition-colors" />
            </a>
            <a
              href="https://github.com/Mohammed-Ateeq-nova"
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-full p-4 hover:scale-110 hover:bg-[hsl(185,100%,50%)]/10
                       transition-all duration-300 group"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 group-hover:text-[hsl(185,100%,50%)] transition-colors" />
            </a>
            <a
              href="https://www.linkedin.com/in/mohammed-ateeq/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-full p-4 hover:scale-110 hover:bg-[hsl(185,100%,50%)]/10
                       transition-all duration-300 group"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 group-hover:text-[hsl(185,100%,50%)] transition-colors" />
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: scrollIndOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-xs font-display uppercase tracking-widest">Scroll</span>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>

        {/* ── Section 2: ML story (25% – 45%) ── */}
        <motion.div
          style={{ opacity: s2Opacity, y: s2Y }}
          className="hero-scroll-text-container hero-scroll-text-left"
        >
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
            <span className="text-foreground">Building AI-driven systems</span>
            <br />
            <span className="text-[hsl(185,100%,50%)]">that think, scale, and adapt.</span>
          </p>
        </motion.div>

        {/* ── Section 3: Full-stack story (50% – 70%) ── */}
        <motion.div
          style={{ opacity: s3Opacity, y: s3Y }}
          className="hero-scroll-text-container hero-scroll-text-right"
        >
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
            <span className="text-foreground">From pixel to production</span>
            <br />
            <span className="text-[hsl(185,100%,50%)]">Full-stack, end-to-end.</span>
          </p>
        </motion.div>

        {/* ── Section 4: CTA (80% – 95%) ── */}
        <motion.div
          style={{ opacity: s4Opacity, y: s4Y }}
          className="hero-scroll-text-container hero-scroll-text-center"
        >
          <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-10 text-foreground">
            Let's build something{' '}
            <span className="text-[hsl(185,100%,50%)]">real.</span>
          </p>
          <a
            href="mailto:mohd.ateeq.march@gmail.com"
            className="group glass rounded-full px-10 py-5 font-display font-semibold text-lg
                     hover:bg-[hsl(185,100%,50%)]/10 hover:scale-105
                     transition-all duration-300 inline-flex items-center gap-3"
          >
            Get In Touch
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroScroll;
