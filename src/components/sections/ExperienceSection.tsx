import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowUpRight, Briefcase } from 'lucide-react';
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
  offset: number; // -1 = left, 0 = center, 1 = right (continuous)
  isActive: boolean;
}

const ExperienceCard = ({ exp, offset, isActive }: CardProps) => {
  // Clamp extreme offsets
  const clamped = Math.max(-1.5, Math.min(1.5, offset));

  const x = clamped * 110; // % offset from center
  const rotateY = clamped * -35; // 3D tilt
  const scale = 1 - Math.abs(clamped) * 0.2;
  const opacity = 1 - Math.abs(clamped) * 0.6;
  const z = -Math.abs(clamped) * 200;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        perspective: '1200px',
        pointerEvents: isActive ? 'auto' : 'none',
      }}
    >
      <motion.div
        animate={{
          x: `${x}%`,
          rotateY,
          scale,
          opacity,
          z,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 40, mass: 0.8 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Link to={`/experience/${exp.id}`} className="block">
          <div
            className={`
              group relative w-[340px] md:w-[460px] rounded-3xl p-8 md:p-10
              glass overflow-hidden
              transition-shadow duration-700
              ${isActive ? 'dark:shadow-[0_0_80px_-10px_hsla(185,100%,50%,0.25)] shadow-[0_30px_80px_-20px_hsla(0,0%,0%,0.2)]' : ''}
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
            <p className="text-sm text-muted-foreground/80 leading-relaxed mb-6 line-clamp-2">
              {exp.description}
            </p>

            {/* Highlights */}
            <ul className="space-y-2.5">
              {exp.highlights.slice(0, 2).map((h, i) => (
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
    </motion.div>
  );
};

/* ─── Progress Bar ─── */

const ProgressBar = ({
  progress,
  activeIndex,
}: {
  progress: number;
  activeIndex: number;
}) => (
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
  </div>
);

/* ─── Section ─── */

export const ExperienceSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => setActiveIndex((prev) => Math.min(prev + 1, TOTAL - 1));
  const handlePrev = () => setActiveIndex((prev) => Math.max(prev - 1, 0));

  return (
    <section
      className="relative bg-secondary/20 py-24 md:py-32"
      id="experience"
    >
      {/* Header */}
      <div className="section-container mb-12 md:mb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
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
          <FadeIn delay={0.2}>
            <div className="flex items-center gap-4">
              <ProgressBar progress={0} activeIndex={activeIndex} />
              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center disabled:opacity-30 transition-opacity"
                  aria-label="Previous"
                >
                  <ArrowUpRight className="w-4 h-4 rotate-[-135deg]" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={activeIndex === TOTAL - 1}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center disabled:opacity-30 transition-opacity"
                  aria-label="Next"
                >
                  <ArrowUpRight className="w-4 h-4 rotate-45" />
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Carousel area */}
      <div className="relative h-[500px] md:h-[560px] flex items-center justify-center overflow-hidden">
        {experiences.map((exp, i) => (
          <ExperienceCard
            key={exp.id}
            exp={exp}
            offset={i - activeIndex}
            isActive={i === activeIndex}
          />
        ))}
      </div>
    </section>
  );
};
