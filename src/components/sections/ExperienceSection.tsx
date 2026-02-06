import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '@/components/PageTransition';
import { GlassCard } from '@/components/GlassCard';

// Shared experience data
export const experiences = [
  {
    id: 'exp-1',
    role: 'Senior Software Engineer',
    company: 'Company Name',
    location: 'City, Country',
    period: '2022 - Present',
    description: 'Add your role description and key achievements here.',
    highlights: ['Achievement 1', 'Achievement 2', 'Achievement 3'],
  },
  {
    id: 'exp-2',
    role: 'Software Engineer',
    company: 'Previous Company',
    location: 'City, Country',
    period: '2020 - 2022',
    description: 'Add your role description and key achievements here.',
    highlights: ['Achievement 1', 'Achievement 2'],
  },
  {
    id: 'exp-3',
    role: 'Junior Developer',
    company: 'First Company',
    location: 'City, Country',
    period: '2018 - 2020',
    description: 'Add your role description and key achievements here.',
    highlights: ['Achievement 1', 'Achievement 2'],
  },
];

export const ExperienceSection = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 450;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative py-32 bg-secondary/20" id="experience">
      <div className="section-container">
        <div className="flex justify-between items-end mb-12">
          <div>
            <FadeIn>
              <span className="inline-block px-4 py-2 mb-6 text-xs font-display font-medium tracking-widest uppercase glass rounded-full">
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
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                className="p-3 glass rounded-full hover:scale-110 transition-transform"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-3 glass rounded-full hover:scale-110 transition-transform"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Horizontal Carousel - Different visual treatment than Projects */}
      <div className="relative">
        <FadeIn delay={0.3}>
          <div
            ref={carouselRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide px-8 md:px-16 lg:px-24 pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="flex-shrink-0 w-[350px] md:w-[450px] snap-start"
              >
                <Link to={`/experience/${exp.id}`}>
                  <GlassCard 
                    className="group h-full min-h-[280px] relative overflow-hidden"
                    variant={index === 0 ? 'neon' : 'default'}
                  >
                    {/* Timeline indicator */}
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-foreground/20 via-foreground dark:from-neon-cyan/20 dark:via-neon-cyan to-transparent" />
                    
                    <div className="pl-6">
                      <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </span>
                      </div>
                      
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-xl font-display font-bold group-hover:dark:text-neon-cyan transition-colors">
                          {exp.role}
                        </h3>
                        <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      </div>
                      
                      <p className="text-lg text-muted-foreground mb-4">{exp.company}</p>
                      
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {exp.description}
                      </p>
                      
                      <ul className="space-y-2">
                        {exp.highlights.slice(0, 2).map((highlight, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-foreground dark:bg-neon-cyan mt-2 shrink-0" />
                            <span className="text-sm text-muted-foreground">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
