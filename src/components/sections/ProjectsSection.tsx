import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';

export const projects = [
  {
    id: 'project-1',
    title: 'Project One',
    tagline: 'Reimagining digital experiences',
    category: 'Web Application',
    year: '2024',
    role: 'Lead Developer',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    radius: 180,
  },
  {
    id: 'project-2',
    title: 'Project Two',
    tagline: 'AI-powered analytics platform',
    category: 'Machine Learning',
    year: '2023',
    role: 'Full Stack Engineer',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    radius: 180,
  },
  {
    id: 'project-3',
    title: 'Project Three',
    tagline: 'Next-gen mobile experience',
    category: 'Mobile App',
    year: '2023',
    role: 'Frontend Architect',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    radius: 180,
  },
];

const ProjectCard = ({
  project,
  index,
  isActive,
  onSelect,
  globalRotation,
}: {
  project: (typeof projects)[0];
  index: number;
  isActive: boolean;
  onSelect: () => void;
  globalRotation: number;
}) => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const [visibility, setVisibility] = useState(0);

  // Track visibility for brightness only (not rotation)
  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const distance = Math.abs(sectionCenter - viewportCenter);
      const maxDistance = window.innerHeight;
      const progress = Math.max(0, 1 - distance / maxDistance);
      setVisibility(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use global rotation with per-project offset for visual variety
  const rotation = globalRotation + index * 30;

  const handleNavigate = () => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative min-h-[80vh] flex items-center justify-center"
    >
      {/* Content Grid */}
      <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left: Project Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 order-2 lg:order-1"
        >
          {/* Project Number & Category */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono text-muted-foreground">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="h-px flex-1 bg-border max-w-[60px]" />
            <span className="text-sm uppercase tracking-widest text-muted-foreground">
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-display-sm text-foreground">
            {project.title}
          </h3>

          {/* Tagline */}
          <p className="text-lg text-muted-foreground max-w-md">
            {project.tagline}
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="glass rounded-full px-4 py-2">
              <span className="text-muted-foreground">Year:</span>{' '}
              <span className="text-foreground font-medium">{project.year}</span>
            </div>
            <div className="glass rounded-full px-4 py-2">
              <span className="text-muted-foreground">Role:</span>{' '}
              <span className="text-foreground font-medium">{project.role}</span>
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            onClick={handleNavigate}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-3 glass rounded-full px-6 py-3 mt-4 hover:bg-foreground/5 transition-colors"
          >
            <span className="font-medium">View Project</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>

        {/* Right: 3D Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative aspect-square max-w-md mx-auto order-1 lg:order-2 cursor-pointer"
          onClick={handleNavigate}
          style={{ perspective: '1200px' }}
        >
          {/* 3D Rotating Container */}
          <div
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateY(${rotation}deg) rotateX(${visibility * 5}deg)`,
              transition: 'transform 0.1s linear',
            }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {project.images.map((image, imgIndex) => {
              const totalCards = project.images.length;
              const angle = (360 / totalCards) * imgIndex;
              const x = Math.cos((angle * Math.PI) / 180) * project.radius;
              const z = Math.sin((angle * Math.PI) / 180) * project.radius;
              const tangentRotation = angle + 90;

              // Per-card brightness based on angular position after rotation
              // Cards facing forward (higher Z in world space) are brighter
              const effectiveAngle = angle + rotation;
              const normalizedZ = Math.sin((effectiveAngle * Math.PI) / 180);
              // Range: 0.3 (back) to 1.0 (front)
              const cardBrightness = 0.3 + 0.7 * (1 + normalizedZ) / 2;

              return (
                <div
                  key={imgIndex}
                  style={{
                    position: 'absolute',
                    width: '160px',
                    height: '160px',
                    left: '50%',
                    top: '50%',
                    marginLeft: '-80px',
                    marginTop: '-80px',
                    transformStyle: 'preserve-3d',
                    transform: `translateX(${x}px) translateZ(${z}px) rotateY(${tangentRotation}deg)`,
                    filter: `brightness(${cardBrightness})`,
                    transition: 'filter 0.05s linear',
                  }}
                  className="rounded-xl overflow-hidden shadow-lg ring-1 ring-border/50"
                >
                  <img
                    src={image}
                    alt={`${project.title} preview ${imgIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            })}
          </div>

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-sm rounded-full"
          >
            <div className="glass rounded-full p-4">
              <ArrowRight className="w-6 h-6" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Divider */}
      {index < projects.length - 1 && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-border to-transparent" />
      )}
    </motion.div>
  );
};

export const ProjectsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [globalRotation, setGlobalRotation] = useState(0);
  const lastScrollY = useRef(0);

  // Track global scroll to derive monotonic rotation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      
      // Anti-clockwise on scroll down (positive delta), clockwise on scroll up (negative delta)
      // Increased sensitivity for satisfying rotation feel
      setGlobalRotation((prev) => prev + delta * 0.5);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="projects"
      className="relative py-24 md:py-32 bg-secondary dark:bg-background transition-colors duration-500"
    >
      {/* Section Header */}
      <div className="section-container mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Section Label */}
          <div className="flex items-center gap-4">
            <Layers className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium">
              Selected Work
            </span>
          </div>

          {/* Section Title */}
          <h2 className="text-display-lg text-foreground">
            Projects
          </h2>

          {/* Section Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            A curated collection of work spanning web applications, machine learning, 
            and interactive experiences. Each project represents a unique challenge 
            and creative solution.
          </p>

          {/* Project Count */}
          <div className="flex items-center gap-3 pt-4">
            <div className="flex items-center gap-2">
              {projects.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === activeIndex
                      ? 'bg-foreground'
                      : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {projects.length} Projects
            </span>
          </div>
        </motion.div>
      </div>

      {/* Projects List */}
      <div className="space-y-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            isActive={index === activeIndex}
            onSelect={() => setActiveIndex(index)}
            globalRotation={globalRotation}
          />
        ))}
      </div>
    </section>
  );
};
