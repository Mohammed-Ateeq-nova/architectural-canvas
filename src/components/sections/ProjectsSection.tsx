import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export const projects = [
  {
    id: 'project-1',
    title: 'Project One',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    radius: 200,
    gridImages: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  },
  {
    id: 'project-2',
    title: 'Project Two',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    radius: 220,
    gridImages: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  },
  {
    id: 'project-3',
    title: 'Project Three',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    radius: 240,
    gridImages: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  },
];

const CharacterAnimation = ({ text, isFocused }: { text: string; isFocused: boolean }) => {
  const chars = text.split('');

  return (
    <div className="flex flex-wrap gap-0">
      {chars.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isFocused ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: index * 0.03 }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
};

const FocusedView = ({
  project,
  onClose,
}: {
  project: (typeof projects)[0];
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center overflow-hidden"
    >
      {/* Close Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        onClick={onClose}
        className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
        aria-label="Close focused view"
      >
        <X className="w-6 h-6" />
      </motion.button>

      {/* Project Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="absolute top-20 left-0 right-0 text-center text-5xl md:text-6xl font-display font-bold z-10"
      >
        {project.title}
      </motion.h2>

      {/* Image Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full h-full flex items-center justify-center px-8 md:px-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl w-full max-h-[80vh] auto-rows-max">
          {project.gridImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{
                delay: 0.4 + index * 0.08,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="aspect-square rounded-lg overflow-hidden"
            >
              <img
                src={image}
                alt={`Project image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectSection = ({ project }: { project: (typeof projects)[0] }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFocused) {
      document.body.style.overflow = 'hidden';
      setIsTransitioning(true);
      const timer = setTimeout(() => setIsTransitioning(false), 600);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const distance = Math.abs(sectionCenter - viewportCenter);
      const maxDistance = window.innerHeight;
      const progress = Math.max(0, 1 - distance / maxDistance);

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFocused]);

  const handleTitleClick = () => {
    if (!isTransitioning) {
      setIsFocused(true);
    }
  };

  const handleClose = () => {
    setIsFocused(false);
  };

  const rotation = scrollProgress * 180;
  const brightness = 0.4 + scrollProgress * 0.6;
  const tiltX = (scrollProgress - 0.5) * 10;
  const tiltY = (scrollProgress - 0.5) * 15;

  return (
    <>
      <div
        ref={sectionRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black"
      >
        {/* Title */}
        <motion.div
          className="absolute top-20 left-0 right-0 text-center z-10 cursor-pointer"
          onClick={handleTitleClick}
          animate={
            isFocused
              ? { scale: 0.8, opacity: 0 }
              : { scale: 1, opacity: 1 }
          }
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ pointerEvents: isFocused ? 'none' : 'auto' }}
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold hover:opacity-70 transition-opacity">
            <CharacterAnimation text={project.title} isFocused={isFocused} />
          </h2>
        </motion.div>

        {/* 3D Circle Container */}
        <motion.div
          style={{
            perspective: '1200px',
          }}
          animate={
            isFocused
              ? {
                  scale: 0.7,
                  opacity: 0,
                  rotateX: 45,
                  rotateY: 45,
                }
              : {
                  scale: 1,
                  opacity: 1,
                  rotateX: tiltX,
                  rotateY: tiltY,
                }
          }
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-full flex items-center justify-center"
        >
          <div
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateY(${rotation}deg) rotateX(${scrollProgress * 5}deg)`,
              transition: 'transform 0.1s linear',
            }}
            className="relative"
          >
            {project.images.map((image, index) => {
              const totalCards = project.images.length;
              const angle = (360 / totalCards) * index;
              const x = Math.cos((angle * Math.PI) / 180) * project.radius;
              const z = Math.sin((angle * Math.PI) / 180) * project.radius;
              const tangentRotation = angle + 90;

              return (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    width: '200px',
                    height: '200px',
                    left: '50%',
                    top: '50%',
                    marginLeft: '-100px',
                    marginTop: '-100px',
                    transformStyle: 'preserve-3d',
                    transform: `translateX(${x}px) translateZ(${z}px) rotateY(${tangentRotation}deg)`,
                    filter: `brightness(${brightness})`,
                    transition: 'filter 0.1s linear',
                  }}
                  className="rounded-lg overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`Project card ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Focused View Overlay */}
      <AnimatePresence>
        {isFocused && (
          <FocusedView
            project={project}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export const ProjectsSection = () => {
  return (
    <section className="relative" id="projects">
      {projects.map((project) => (
        <ProjectSection
          key={project.id}
          project={project}
        />
      ))}
    </section>
  );
};
