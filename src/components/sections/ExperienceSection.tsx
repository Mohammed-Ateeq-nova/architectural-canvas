import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowUpRight, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrambleText } from '../ScrambleText';
import { FadeIn } from '@/components/PageTransition';

export const experiences = [
  {
    id: 'drdo-rci',
    role: 'Software Development Intern',
    company: 'DRDO — Research Centre Imarat',
    location: 'Hyderabad, India',
    period: 'Jul 2025 – Sep 2025',
    description:
      'Engineered C-based data acquisition systems with RS-422 and MIL-STD-1553 protocol integrations and diagnostic GUIs for defense applications.',
    highlights: [
      'Engineered a C-based data acquisition system interfacing with RS-422 and MIL-STD-1553 hardware for reliable real-time data capture',
      'Built a WinAPI-based GUI enabling real-time hardware diagnostics with sub-second response times',
      'Improved protocol compliance and reduced communication errors by 35% through close hardware integration'
    ],
    metrics: [
      { value: '35%', label: 'error reduction' },
      { value: '2', label: 'protocols mastered' },
      { value: '<1s', label: 'diagnostic response' }
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
      'Built a marketing website that increased client leads by 35% with interactive product catalog',
      'Firebase contact forms with 95% deliverability',
      'Implemented modern UI animations using Framer Motion',
      'Optimized load speeds by 40% with clean asset delivery'
    ],
    metrics: [
      { value: '35%', label: 'increase in client leads' },
      { value: '95%', label: 'contact form deliverability' },
      { value: '40%', label: 'page load speedup' }
    ],
    num: '02',
  },
];

const ExperienceBlock = ({ exp, isFirst }: { exp: typeof experiences[0]; isFirst: boolean }) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    const el = blockRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsTriggered(entry.isIntersecting);
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px'
      }
    );

    observer.observe(el);

    // Fallback if already in view
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsTriggered(true);
    }

    return () => {
      observer.unobserve(el);
    };
  }, []);

  return (
    <div
      ref={blockRef}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start relative min-h-[60vh] py-16 border-b border-border/20 last:border-b-0"
    >
      {/* Left Column (Sticky info on desktop, relative block on mobile) */}
      <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col justify-start items-start gap-4">
        {/* Ghost Numeral */}
        <div className="relative w-full mb-2">
          <motion.div 
            initial={{ opacity: 0, y: -40 }}
            animate={isTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -top-20 -left-10 experience-ghost-num pointer-events-none select-none z-0"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(160px, 22vw, 320px)', lineHeight: 0.8 }}
          >
            <ScrambleText text={exp.num} trigger={isTriggered} />
          </motion.div>

          {/* Role Title */}
          <h3 
            className="text-foreground uppercase font-normal tracking-tight relative z-10"
            style={{ fontFamily: "'Audiowide', cursive", fontSize: 'clamp(28px, 3.5vw, 44px)', lineHeight: 1.15 }}
          >
            <ScrambleText text={exp.role} trigger={isTriggered} delay={500} />
          </h3>
        </div>

        {/* Company Name */}
        <p 
          className="text-muted-foreground uppercase tracking-wider font-semibold relative z-10"
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(14px, 1.2vw, 17px)' }}
        >
          <ScrambleText text={exp.company} trigger={isTriggered} delay={650} />
        </p>

        {/* Period and Location Badges */}
        <div className="flex flex-wrap items-center gap-3 relative z-10 mt-2">
          <span className="flex items-center gap-2 text-xs border border-border/30 dark:border-border/10 glass rounded-full px-4 py-2 text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            <ScrambleText text={exp.period} trigger={isTriggered} delay={750} />
          </span>
          <span className="flex items-center gap-2 text-xs border border-border/30 dark:border-border/10 glass rounded-full px-4 py-2 text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            <ScrambleText text={exp.location} trigger={isTriggered} delay={850} />
          </span>
        </div>

        {/* Scroll Hint (Only on first entry, hidden on mobile) */}
        {isFirst && (
          <div className="hidden lg:flex flex-col items-start gap-2 text-muted-foreground/60 select-none mt-20">
            <span className="text-[10px] tracking-[0.3em] font-semibold" style={{ fontFamily: "'Courier New', monospace" }}>
              SCROLL TO EXPLORE
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="text-lg">↓</span>
            </motion.div>
          </div>
        )}
      </div>

      {/* Right Column (Details Card) */}
      <div className="lg:col-span-7 flex justify-end w-full">
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={isTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <Link 
            to={`/experience/${exp.id}`}
            className="block w-full text-left"
          >
            <div
              className="group relative w-full rounded-[32px] p-6 md:p-10 border border-border/30 dark:border-border/10 shadow-[0_20px_50px_rgba(0,0,0,0.02)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-card overflow-hidden hover:shadow-[0_25px_60px_-10px_rgba(0,229,255,0.12)] transition-all duration-500 hover:border-[#00e5ff]/30 dark:hover:border-[#00e5ff]/20"
            >
              {/* Hover top highlight */}
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#00e5ff] group-hover:w-full transition-all duration-500" />

              {/* Header / Company */}
              <h4 
                className="text-xl md:text-2xl font-bold mb-4 text-foreground uppercase tracking-wide"
                style={{ fontFamily: "'Audiowide', cursive", fontSize: 'clamp(16px, 1.8vw, 22px)' }}
              >
                <ScrambleText text={exp.company} trigger={isTriggered} delay={600} />
              </h4>

              {/* Summary */}
              <p className="text-sm md:text-base text-muted-foreground/80 leading-relaxed mb-6 font-medium">
                {exp.description}
              </p>

              {/* Metrics Row */}
              <div className="flex flex-row gap-3 md:gap-4 mb-8">
                {exp.metrics?.map((m, mIdx) => (
                  <div 
                    key={mIdx}
                    className="flex-1 bg-background/50 border border-border/20 dark:border-border/10 rounded-2xl p-4 pt-3 flex flex-col justify-start relative overflow-hidden border-t-4 border-t-[#00e5ff]/90 shadow-sm"
                  >
                    <span 
                      className="text-foreground font-normal mb-0.5"
                      style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(26px, 3.2vw, 42px)', lineHeight: 1 }}
                    >
                      <ScrambleText text={m.value} trigger={isTriggered} delay={1100 + mIdx * 120} />
                    </span>
                    <span 
                      className="text-[9px] md:text-[10px] text-muted-foreground/70 font-semibold leading-tight uppercase tracking-wider"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>

            {/* Highlights with Left Accent Bars */}
            <ul className="space-y-4 mb-8">
              {exp.highlights.map((h, hIdx) => (
                <li key={hIdx} className="flex items-stretch gap-4">
                  <div className="w-[3px] bg-[#00e5ff] rounded-full shrink-0" />
                  <span className="text-sm md:text-base text-muted-foreground py-0.5 leading-relaxed font-medium">
                    {h}
                  </span>
                </li>
              ))}
            </ul>

            {/* View Details Link */}
            <div className="flex justify-end mt-4">
              <div 
                className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-[#00e5ff] uppercase tracking-wider transition-colors duration-300"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                <span>view details</span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
    </div>
  );
};

export const ExperienceSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerTrigger, setHeaderTrigger] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setHeaderTrigger(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, []);

  return (
    <section className="relative bg-secondary/5 py-24 md:py-32" id="experience">
      {/* Scoped Styles for Experience Ghost Numerals */}
      <style dangerouslySetInnerHTML={{ __html: `
        .experience-ghost-num {
          color: rgba(60, 60, 60, 0.18) !important;
          transition: color 0.4s ease;
        }
        .dark .experience-ghost-num {
          color: rgba(0, 229, 255, 0.16) !important;
        }
      `}} />

      {/* Section Heading (Separate, not on individual blocks) */}
      <div className="section-container mb-12 md:mb-16" ref={headerRef}>
        <FadeIn>
          <span 
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-widest uppercase border border-border/30 dark:border-border/10 glass rounded-full"
            style={{ fontFamily: "'Audiowide', cursive" }}
          >
            <Briefcase className="w-3.5 h-3.5 text-foreground" />
            <ScrambleText text="EXPERIENCE" trigger={headerTrigger} />
          </span>
        </FadeIn>
      </div>

      <div className="section-container space-y-24 md:space-y-36">
        {experiences.map((exp, idx) => (
          <ExperienceBlock key={exp.id} exp={exp} isFirst={idx === 0} />
        ))}
      </div>
    </section>
  );
};