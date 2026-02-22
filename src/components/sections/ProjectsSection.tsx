import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';

export const projects = [
  {
    id: 'heart-risk-detection',
    title: 'Contactless Heart Risk Detection',
    tagline: 'Real-time camera-based physiological analysis with AI-driven risk prediction',
    category: 'AI / Healthcare',
    year: '2025',
    role: 'Full Stack Developer',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  },
  {
    id: 'face-liveness-detection',
    title: 'Face Liveness Detection',
    tagline: 'Browser-based real-time liveness classification with serverless inference',
    category: 'Machine Learning',
    year: '2024',
    role: 'ML Engineer',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  },
  {
    id: 'docchat-ai',
    title: 'DocChat AI',
    tagline: 'Document-aware conversational system with intelligent querying',
    category: 'AI / Web App',
    year: '2025',
    role: 'Full Stack Developer',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  },
  {
    id: 'sri-datta-electronics',
    title: 'Sri Datta Electronics',
    tagline: 'Product marketing platform with lead generation and modern UI',
    category: 'Freelance / Web',
    year: '2025',
    role: 'Freelance Developer',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  },
];

const ProjectCard = ({
  project,
  index,
  isActive,
  onSelect,
  rotation,
  cardRef,
}: {
  project: (typeof projects)[0];
  index: number;
  isActive: boolean;
  onSelect: () => void;
  rotation: number;
  cardRef: (el: HTMLDivElement | null) => void;
}) => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visibility, setVisibility] = useState(0);
  const [dimensions, setDimensions] = useState({ cardSize: 160, radius: 180 });

  // Responsive sizing based on viewport
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile - smaller cards and tighter radius
        setDimensions({ cardSize: 140, radius: 150 });
      } else if (width < 1024) {
        // Tablet
        setDimensions({ cardSize: 160, radius: 180 });
      } else {
        // Desktop
        setDimensions({ cardSize: 200, radius: 230 });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const rect = scrollRef.current.getBoundingClientRect();
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

  const handleNavigate = () => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <div
      ref={(el) => {
        scrollRef.current = el;
        cardRef(el);
      }}
      className="relative min-h-[80vh] flex items-center justify-center"
    >
      <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div className="space-y-6 order-2 lg:order-1">
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono text-muted-foreground">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="h-px flex-1 bg-border max-w-[60px]" />
            <span className="text-sm uppercase tracking-widest text-muted-foreground">
              {project.category}
            </span>
          </div>

          <h3 className="text-display-sm text-foreground">
            {project.title}
          </h3>

          <p className="text-lg text-muted-foreground max-w-md">
            {project.tagline}
          </p>

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

          <motion.button
            onClick={handleNavigate}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-3 glass rounded-full px-6 py-3 mt-4 hover:bg-foreground/5 transition-colors"
          >
            <span className="font-medium">View Project</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>

        <div
          className="relative aspect-square max-w-md mx-auto order-1 lg:order-2 cursor-pointer"
          onClick={handleNavigate}
          style={{ perspective: '1200px' }}
        >
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
              const cardAngle = (360 / totalCards) * imgIndex;
              const x = Math.cos((cardAngle * Math.PI) / 180) * dimensions.radius;
              const z = Math.sin((cardAngle * Math.PI) / 180) * dimensions.radius;
              const tangentRotation = cardAngle + 90;

              const halfCard = dimensions.cardSize / 2;

              return (
                <div
                  key={imgIndex}
                  style={{
                    position: 'absolute',
                    width: `${dimensions.cardSize}px`,
                    height: `${dimensions.cardSize}px`,
                    left: '50%',
                    top: '50%',
                    marginLeft: `-${halfCard}px`,
                    marginTop: `-${halfCard}px`,
                    transformStyle: 'preserve-3d',
                    transform: `translateX(${x}px) translateZ(${z}px) rotateY(${tangentRotation}deg)`,
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

          <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-sm rounded-full opacity-0 hover:opacity-100 transition-opacity">
            <div className="glass rounded-full p-4">
              <ArrowRight className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {index < projects.length - 1 && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-border to-transparent" />
      )}
    </div>
  );
};

export const ProjectsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [projectRotations, setProjectRotations] = useState<number[]>(
    projects.map(() => 0)
  );
  const lastScrollY = useRef(0);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      // Update rotation for each project based on its visibility
      setProjectRotations((prevRotations) =>
        prevRotations.map((rotation, index) => {
          const projectElement = projectRefs.current[index];
          if (!projectElement) return rotation;

          // Check if this project is in viewport
          const rect = projectElement.getBoundingClientRect();
          const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

          // Only rotate if in viewport
          if (isInViewport) {
            return rotation + delta * 0.15;
          }
          return rotation;
        })
      );

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
      <div className="section-container mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-4">
            <Layers className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium">
              Selected Work
            </span>
          </div>

          <h2 className="text-display-lg text-foreground">
            Projects
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            A curated collection of projects spanning AI-driven systems, full-stack web applications, 
            and real-time processing — each built to solve a real problem.
          </p>

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

      <div className="space-y-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            isActive={index === activeIndex}
            onSelect={() => setActiveIndex(index)}
            rotation={projectRotations[index] || 0}
            cardRef={(el) => {
              projectRefs.current[index] = el;
            }}
          />
        ))}
      </div>
    </section>
  );
};