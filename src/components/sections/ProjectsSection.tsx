import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const projects = [
  {
    id: 'project-1',
    title: 'Project One',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    radius: 200,
  },
  {
    id: 'project-2',
    title: 'Project Two',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    radius: 220,
  },
  {
    id: 'project-3',
    title: 'Project Three',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    radius: 240,
  },
];

const CharacterAnimation = ({ text }: { text: string }) => {
  const chars = text.split('');

  return (
    <div className="flex flex-wrap gap-0">
      {chars.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: index * 0.03 }}
          viewport={{ once: false, amount: 0.5 }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
};

const ProjectSection = ({ project, isInView }: { project: typeof projects[0]; isInView: boolean }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  const rotation = scrollProgress * 180;
  const brightness = 0.4 + scrollProgress * 0.6;
  const tiltX = (scrollProgress - 0.5) * 10;
  const tiltY = (scrollProgress - 0.5) * 15;

  return (
    <div
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Title */}
      <div className="absolute top-20 left-0 right-0 text-center z-10">
        <h2 className="text-5xl md:text-7xl font-display font-bold">
          <CharacterAnimation text={project.title} />
        </h2>
      </div>

      {/* 3D Circle Container */}
      <div
        style={{
          perspective: '1200px',
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
        }}
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
      </div>
    </div>
  );
};

export const ProjectsSection = () => {
  return (
    <section className="relative" id="projects">
      {projects.map((project, index) => (
        <ProjectSection
          key={project.id}
          project={project}
          isInView={true}
        />
      ))}
    </section>
  );
};
