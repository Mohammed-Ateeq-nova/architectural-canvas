import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '@/components/PageTransition';
import { GlassCard } from '@/components/GlassCard';

// Shared project data
export const projects = [
  {
    id: 'project-1',
    title: 'Project One',
    category: 'Web Application',
    description: 'Add your project description here. This is placeholder content.',
    tech: ['React', 'TypeScript', 'Node.js'],
    featured: true,
  },
  {
    id: 'project-2',
    title: 'Project Two',
    category: 'Mobile App',
    description: 'Add your project description here. This is placeholder content.',
    tech: ['React Native', 'Firebase'],
    featured: true,
  },
  {
    id: 'project-3',
    title: 'Project Three',
    category: '3D Experience',
    description: 'Add your project description here. This is placeholder content.',
    tech: ['Three.js', 'WebGL', 'GSAP'],
    featured: false,
  },
  {
    id: 'project-4',
    title: 'Project Four',
    category: 'Design System',
    description: 'Add your project description here. This is placeholder content.',
    tech: ['Figma', 'React', 'Storybook'],
    featured: false,
  },
];

export const ProjectsSection = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 400;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative py-32 broken-grid" id="projects">
      <div className="section-container">
        <div className="flex justify-between items-end mb-12">
          <div>
            <FadeIn>
              <span className="inline-block px-4 py-2 mb-6 text-xs font-display font-medium tracking-widest uppercase glass rounded-full">
                Projects
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-display-lg">
                Selected <span className="dark:neon-text-cyan">Work</span>
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

      {/* Horizontal Carousel */}
      <div className="relative">
        <FadeIn delay={0.3}>
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-8 md:px-16 lg:px-24 pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="flex-shrink-0 w-[320px] md:w-[400px] snap-start"
              >
                <Link to={`/projects/${project.id}`}>
                  <GlassCard className="group h-full" variant={project.featured ? 'neon' : 'default'}>
                    {/* Project Image Placeholder */}
                    <div className="aspect-[4/3] bg-muted rounded-xl mb-6 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-muted-foreground font-display text-sm">Add Image</span>
                      </div>
                    </div>
                    
                    <span className="text-xs font-display uppercase tracking-widest text-muted-foreground mb-2 block">
                      {project.category}
                    </span>
                    
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-xl font-display font-bold group-hover:dark:text-neon-cyan transition-colors">
                        {project.title}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all flex-shrink-0" />
                    </div>
                    
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-display bg-secondary rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
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
