import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
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

/* ─── Card ─── */

interface CardProps {
  exp: (typeof experiences)[0];
  isActive: boolean;
  onClick: () => void;
}

const ExperienceCard = ({ exp, isActive, onClick }: CardProps) => (
  <motion.div
    className="flex-shrink-0 w-[340px] md:w-[460px] cursor-pointer"
    whileHover={{ scale: 1.03, y: -8 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    onClick={onClick}
  >
    <Link to={`/experience/${exp.id}`} className="block">
      <div
        className={`
          group relative rounded-3xl p-8 md:p-10 h-full
          glass overflow-hidden
          transition-shadow duration-700
          ${isActive
            ? 'dark:shadow-[0_0_80px_-10px_hsla(185,100%,50%,0.25)] shadow-[0_30px_80px_-20px_hsla(0,0%,0%,0.2)]'
            : 'hover:shadow-[0_20px_60px_-15px_hsla(0,0%,0%,0.15)]'}
        `}
      >
        {/* Top accent line */}
        <div
          className={`
            absolute top-0 left-0 h-[2px] transition-all duration-700
            ${isActive
              ? 'w-full bg-gradient-to-r from-transparent via-foreground dark:via-[hsl(var(--neon-cyan))] to-transparent'
              : 'w-0 bg-transparent'}
          `}
        />

        {/* Number */}
        <div className="flex items-center justify-between mb-8">
          <span
            className={`
              text-6xl md:text-7xl font-display font-black leading-none
              transition-colors duration-500
              ${isActive ? 'text-foreground/15 dark:text-[hsl(var(--neon-cyan))]/15' : 'text-foreground/5'}
            `}
          >
            {exp.num}
          </span>
          <ArrowUpRight
            className={`
              w-5 h-5 transition-all duration-500
              ${isActive ? 'opacity-100 translate-x-0 -translate-y-0' : 'opacity-0 -translate-x-2 translate-y-2'}
            `}
          />
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
              <span
                className={`
                  w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 transition-colors duration-500
                  ${isActive ? 'bg-foreground dark:bg-[hsl(var(--neon-cyan))]' : 'bg-muted-foreground/30'}
                `}
              />
              <span className="text-sm text-muted-foreground">{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  </motion.div>
);

/* ─── Section ─── */

export const ExperienceSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = container.querySelector('div')?.offsetWidth ?? 460;
    const scrollAmount = direction === 'left' ? -cardWidth - 32 : cardWidth + 32;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const cardWidth = (container.querySelector(':scope > div') as HTMLElement)?.offsetWidth ?? 460;
    const idx = Math.round(scrollLeft / (cardWidth + 32));
    setActiveIndex(Math.min(idx, TOTAL - 1));
  };

  return (
    <section
      className="relative bg-secondary/20 py-24 md:py-32 min-h-screen"
      id="experience"
    >
      {/* Header */}
      <div className="section-container mb-12 md:mb-16">
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

          {/* Nav arrows + indicator */}
          <FadeIn delay={0.2}>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {Array.from({ length: TOTAL }).map((_, i) => (
                  <div
                    key={i}
                    className={`
                      h-1.5 rounded-full transition-all duration-500
                      ${i === activeIndex
                        ? 'w-10 bg-foreground dark:bg-[hsl(var(--neon-cyan))]'
                        : 'w-4 bg-muted-foreground/20'}
                    `}
                  />
                ))}
              </div>
              <span className="text-xs font-mono text-muted-foreground tabular-nums">
                {String(activeIndex + 1).padStart(2, '0')}/{String(TOTAL).padStart(2, '0')}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => scrollTo('left')}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-foreground/10 transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollTo('right')}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-foreground/10 transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Horizontal scroll carousel */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-8 overflow-x-auto px-[max(2rem,calc((100vw-1280px)/2+2rem))] pb-8 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {experiences.map((exp, i) => (
          <div key={exp.id} className="snap-center">
            <ExperienceCard
              exp={exp}
              isActive={i === activeIndex}
              onClick={() => setActiveIndex(i)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
