import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, animate } from 'framer-motion';
import { Calendar, MapPin, ArrowUpRight, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '@/components/PageTransition';

export const experiences = [
  {
    id: 'drdo-rci',
    role: 'Software Development Intern',
    company: 'DRDO — Research Centre Imarat (RCI)',
    location: 'Hyderabad, India',
    period: 'Jul 2025 – Sep 2025',
    description:
      'Engineered C-based data acquisition systems with hardware protocol integrations and diagnostic GUIs for defense applications.',
    highlights: [
      'Reduced communication errors by 35% through RS-422 & MIL-STD-1553 optimization',
      'Built WinAPI diagnostic GUI with sub-second response times',
      'Enhanced protocol reliability and system stability',
    ],
    num: '01',
  },
  {
    id: 'sri-datta-freelance',
    role: 'Freelance Web Developer',
    company: 'Sri Datta Electronics',
    location: 'Hyderabad, India',
    period: 'May 2025 – Jun 2025',
    description:
      'Built a marketing website that increased client leads by 35% with interactive product catalog and modern UI animations.',
    highlights: [
      'Increased client leads by 35% with interactive product catalog',
      'Firebase contact forms with 95% deliverability',
    ],
    num: '02',
  },
];

const TOTAL = experiences.length;
const CARD_WIDTH = 460;
const CARD_GAP = 48;
const CARD_STEP = CARD_WIDTH + CARD_GAP;

/* ─── 3D Card ─── */

interface CardProps {
  exp: (typeof experiences)[0];
  isActive: boolean;
  normalizedOffset: number; // -1 to 1 continuous
}

const ExperienceCard = ({ exp, isActive, normalizedOffset }: CardProps) => {
  const abs = Math.abs(normalizedOffset);
  const sign = Math.sign(normalizedOffset);

  // 3D transforms based on distance from center
  const rotateY = sign * abs * -45;
  const translateZ = -abs * 250;
  const scale = 1 - abs * 0.15;
  const opacity = 1 - abs * 0.5;
  const translateX = sign * abs * 60;

  return (
    <motion.div
      className="flex-shrink-0 relative"
      style={{
        width: CARD_WIDTH,
        perspective: '1200px',
        zIndex: isActive ? 10 : 5 - Math.round(abs * 5),
      }}
    >
      <motion.div
        animate={{
          rotateY,
          z: translateZ,
          scale,
          opacity: Math.max(0.3, opacity),
          x: translateX,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 30, mass: 0.8 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Link to={`/experience/${exp.id}`} className="block">
          <div
            className={`
              group relative rounded-3xl p-8 md:p-10
              glass overflow-hidden
              transition-all duration-700
              ${isActive
                ? 'dark:shadow-[0_0_80px_-10px_hsla(185,100%,50%,0.3)] shadow-[0_30px_80px_-20px_hsla(0,0%,0%,0.25)]'
                : 'dark:shadow-[0_0_30px_-10px_hsla(185,100%,50%,0.05)] shadow-[0_10px_40px_-15px_hsla(0,0%,0%,0.1)]'}
            `}
          >
            {/* Animated top accent */}
            <motion.div
              className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-foreground dark:via-[hsl(var(--neon-cyan))] to-transparent"
              animate={{ width: isActive ? '100%' : '0%' }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            />

            {/* Glow overlay */}
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none bg-gradient-to-br from-[hsl(var(--neon-cyan))]/5 to-transparent"
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />

            {/* Number */}
            <div className="flex items-center justify-between mb-8">
              <motion.span
                className="text-6xl md:text-7xl font-display font-black leading-none"
                animate={{
                  color: isActive
                    ? 'hsla(185, 100%, 50%, 0.15)'
                    : 'hsla(0, 0%, 50%, 0.05)',
                }}
                transition={{ duration: 0.5 }}
              >
                {exp.num}
              </motion.span>
              <motion.div
                animate={{
                  opacity: isActive ? 1 : 0,
                  x: isActive ? 0 : -8,
                  y: isActive ? 0 : 8,
                }}
                transition={{ duration: 0.4, delay: isActive ? 0.1 : 0 }}
              >
                <ArrowUpRight className="w-5 h-5" />
              </motion.div>
            </div>

            {/* Meta pills */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="flex items-center gap-1.5 text-xs glass rounded-full px-3 py-1.5 text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {exp.period}
              </span>
              <span className="flex items-center gap-1.5 text-xs glass rounded-full px-3 py-1.5 text-muted-foreground">
                <MapPin className="w-3 h-3" />
                {exp.location}
              </span>
            </div>

            {/* Title & company */}
            <h3
              className={`
                text-xl md:text-2xl font-display font-bold mb-1.5 transition-colors duration-500
                ${isActive ? 'dark:text-[hsl(var(--neon-cyan))]' : ''}
              `}
            >
              {exp.role}
            </h3>
            <p className="text-base text-muted-foreground mb-5 font-medium">{exp.company}</p>

            {/* Description */}
            <p className="text-sm text-muted-foreground/80 leading-relaxed mb-6">
              {exp.description}
            </p>

            {/* Highlights */}
            <ul className="space-y-2.5">
              {exp.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                    animate={{
                      backgroundColor: isActive
                        ? 'hsl(185, 100%, 50%)'
                        : 'hsla(0, 0%, 50%, 0.3)',
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="text-sm text-muted-foreground">{h}</span>
                </li>
              ))}
            </ul>

            {/* Bottom reflection line */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent via-foreground/10 dark:via-[hsl(var(--neon-cyan))]/10 to-transparent"
              animate={{ width: isActive ? '80%' : '0%' }}
              transition={{ duration: 0.7, delay: 0.1 }}
            />
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

/* ─── Section ─── */

export const ExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useMotionValue(0);
  const springX = useSpring(scrollX, { stiffness: 120, damping: 25, mass: 0.5 });

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, TOTAL - 1));
    setActiveIndex(clamped);
    animate(scrollX, -clamped * CARD_STEP, {
      type: 'spring',
      stiffness: 200,
      damping: 30,
    });
  }, [scrollX]);

  // Wheel-driven horizontal scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let accumulated = 0;
    const threshold = 80;

    const onWheel = (e: WheelEvent) => {
      // Only capture horizontal-ish or vertical scroll within the carousel area
      e.preventDefault();
      accumulated += e.deltaY || e.deltaX;

      if (Math.abs(accumulated) >= threshold) {
        const dir = accumulated > 0 ? 1 : -1;
        accumulated = 0;
        goTo(activeIndex + dir);
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [activeIndex, goTo]);

  // Touch drag support
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let startX = 0;
    let isDragging = false;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!isDragging) return;
      isDragging = false;
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        goTo(activeIndex + (diff > 0 ? 1 : -1));
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [activeIndex, goTo]);

  // Keyboard support
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo(activeIndex + 1);
      if (e.key === 'ArrowLeft') goTo(activeIndex - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex, goTo]);

  return (
    <section
      ref={containerRef}
      className="relative bg-secondary/20 py-24 md:py-32 min-h-screen flex flex-col justify-center overflow-hidden"
      id="experience"
    >
      {/* Header */}
      <div className="section-container mb-16 md:mb-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <FadeIn>
              <span className="inline-flex items-center gap-2 px-4 py-2 mb-5 text-xs font-display font-medium tracking-widest uppercase glass rounded-full">
                <Briefcase className="w-3.5 h-3.5" />
                Experience
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-display-lg">
                Professional <span className="dark:neon-text-magenta">Journey</span>
              </h2>
            </FadeIn>
          </div>

          {/* Controls */}
          <FadeIn delay={0.2}>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {Array.from({ length: TOTAL }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`
                      h-1.5 rounded-full transition-all duration-500 cursor-pointer
                      ${i === activeIndex
                        ? 'w-10 bg-foreground dark:bg-[hsl(var(--neon-cyan))]'
                        : 'w-4 bg-muted-foreground/20 hover:bg-muted-foreground/40'}
                    `}
                  />
                ))}
              </div>
              <span className="text-xs font-mono text-muted-foreground tabular-nums">
                {String(activeIndex + 1).padStart(2, '0')}/{String(TOTAL).padStart(2, '0')}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => goTo(activeIndex - 1)}
                  disabled={activeIndex === 0}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-foreground/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => goTo(activeIndex + 1)}
                  disabled={activeIndex === TOTAL - 1}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-foreground/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* 3D Carousel */}
      <div className="relative flex items-center justify-center" style={{ perspective: '1400px' }}>
        <motion.div
          className="flex items-center gap-12"
          style={{
            x: springX,
            transformStyle: 'preserve-3d',
          }}
        >
          {experiences.map((exp, i) => {
            const normalizedOffset = (i - activeIndex);
            return (
              <ExperienceCard
                key={exp.id}
                exp={exp}
                isActive={i === activeIndex}
                normalizedOffset={normalizedOffset}
              />
            );
          })}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="mt-12 flex justify-center"
        animate={{ opacity: activeIndex === 0 ? 0.4 : 0 }}
      >
        <p className="text-xs font-mono tracking-widest text-muted-foreground">
          SCROLL OR DRAG TO EXPLORE
        </p>
      </motion.div>
    </section>
  );
};
