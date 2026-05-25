import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';
import { ScrambleText } from '../ScrambleText';
import { ScrambleParagraph } from '../ScrambleParagraph';

export const projects = [
  {
    id: 'heart-risk-detection',
    title: 'Contactless Heart Risk Detection',
    tagline: 'Real-time camera-based physiological analysis with AI-driven risk prediction',
    category: 'AI / Healthcare',
    year: '2026',
    role: 'University Minor Project',
    images: [
      '/projects/heart-risk/dashboard.png',
      '/projects/heart-risk/upload.png',
      '/projects/heart-risk/analysis.png',
      '/projects/heart-risk/record.png',
    ],
  },
  {
    id: 'factguard-ai',
    title: 'Misinformation Tackling Conversational AI',
    tagline: 'Real-time claim verification and evidence evaluation platform powered by local Llama 3.1',
    category: 'AI / Conversational',
    year: '2026',
    role: 'University Major Project',
    images: [
      '/projects/factguard/home.png',
      '/projects/factguard/auth.png',
      '/projects/factguard/report.png',
      '/projects/factguard/history.png',
    ],
  },
  {
    id: 'vidyaai',
    title: 'CBSE Curriculum AI Learning System',
    tagline: 'Syllabus-aligned conversational tutoring and client-side RAG pipeline',
    category: 'AI / Education',
    year: '2026',
    role: 'Personal Project',
    images: [
      '/projects/vidhya-ai/home.png',
      '/projects/vidhya-ai/pre_loaded.png',
      '/projects/vidhya-ai/upload.png',
      '/projects/vidhya-ai/response.png',
    ],
  },
  {
    id: 'docchat-ai',
    title: 'DocChat AI',
    tagline: 'Document-aware conversational system with intelligent querying',
    category: 'AI / Web App',
    year: '2025',
    role: 'Personal Project',
    images: [
      '/projects/docchat/home.png',
      '/projects/docchat/upload.png',
      '/projects/docchat/response.png',
      '/projects/docchat/auth.png',
    ],
  },
  {
    id: 'sri-datta-electronics',
    title: 'Sri Datta Electronics',
    tagline: 'Product marketing platform with lead generation and modern UI',
    category: 'Freelance / Web',
    year: '2025',
    role: 'Freelance Developer',
    images: [
      '/projects/sri-datta/home.png',
      '/projects/sri-datta/about.png',
      '/projects/sri-datta/products.png',
      '/projects/sri-datta/projuct_details.png',
    ],
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
  const [cardTrigger, setCardTrigger] = useState(false);

  // IntersectionObserver for card scroll-entry trigger
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setCardTrigger(entry.isIntersecting);
        });
      },
      {
        threshold: 0.20,
        rootMargin: '0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, []);

  // Responsive sizing based on viewport
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile - scaled cube (reduced 20%)
        setDimensions({ cardSize: 112, radius: 104 });
      } else if (width < 1024) {
        // Tablet (reduced 20%)
        setDimensions({ cardSize: 176, radius: 160 });
      } else {
        // Desktop (reduced 20% for optimized screen balance)
        setDimensions({ cardSize: 256, radius: 288 });
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
      className="relative min-h-screen w-full flex flex-col lg:flex-row items-center justify-center bg-white dark:bg-black overflow-hidden py-24 lg:py-0 transition-colors duration-500"
    >
      {/* Element 1 — Top-Left Label */}
      <div className="absolute top-[2.5rem] left-[2.5rem] flex items-center gap-4 z-20">
        <span className="font-['DM_Sans',sans-serif] text-[13px] text-muted-foreground font-normal leading-none select-none">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="w-[60px] h-[1px] bg-border" />
        <span className="font-['DM_Sans',sans-serif] text-[13px] text-muted-foreground font-normal tracking-[0.18em] uppercase leading-none select-none">
          <ScrambleText text={project.category} trigger={cardTrigger} />
        </span>
      </div>

      {/* Content wrapper for responsive flow */}
      <div className="w-full flex flex-col items-center justify-center gap-8 lg:gap-0 mt-8 lg:mt-0 relative">
        {/* Element 2a — Desktop Title (Left Side, stacked words, horizontal text) */}
        <h3 className="hidden lg:flex flex-col absolute left-[2.5rem] top-1/2 -translate-y-1/2 font-['Audiowide',cursive] text-[#0a0a0a]/12 dark:text-white/12 text-left uppercase tracking-[0.04em] select-none text-[clamp(28px,3.2vw,48px)] leading-[1.05] z-0 w-full max-w-[420px] pointer-events-none whitespace-normal transition-colors duration-500">
          {project.title.toUpperCase().split(' ').map((word, wIdx) => (
            <ScrambleText key={wIdx} text={word} className="block" trigger={cardTrigger} delay={wIdx * 250} />
          ))}
        </h3>

        {/* Element 2b — Tablet/Mobile Title (Top Centered, horizontal text, flows naturally) */}
        <ScrambleText
          text={project.title}
          as="h3"
          className="lg:hidden text-center font-['Audiowide',cursive] text-[#0a0a0a]/12 dark:text-white/12 uppercase tracking-[0.04em] select-none text-[clamp(22px,5.5vw,36px)] sm:text-[clamp(30px,4.5vw,48px)] leading-[1.1] mt-6 sm:mt-0 px-6 z-20 pointer-events-none w-full max-w-[90%] sm:max-w-[80%] transition-colors duration-500 block"
          trigger={cardTrigger}
        />

        {/* Element 3 — Center 3D Cube (Hero) - Made 20% smaller */}
        <div
          className="relative flex items-center justify-center w-[192px] h-[192px] sm:w-[256px] sm:h-[256px] lg:w-[336px] lg:h-[336px] lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 cursor-pointer z-10 group/cube"
          onClick={handleNavigate}
        >
          {/* Warm spotlight glow behind the cube */}
          <div className="absolute w-[224px] h-[224px] sm:w-[304px] sm:h-[304px] lg:w-[400px] lg:h-[400px] bg-[radial-gradient(ellipse_at_center,_rgba(255,220,150,0.3)_0%,_transparent_70%)] rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none" />

          {/* Ground shadow beneath the cube */}
          <div className="absolute w-[120px] h-[16px] sm:w-[160px] sm:h-[24px] lg:w-[224px] lg:h-[32px] bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.18)_0%,_transparent_70%)] rounded-full bottom-[12%] left-1/2 -translate-x-1/2 -z-10 pointer-events-none" />

          {/* Floating Wrapper */}
          <div className="animate-float-custom-mobile sm:animate-float-custom w-full h-full relative flex items-center justify-center" style={{ perspective: '1200px' }}>
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
                    className="group/card rounded-xl overflow-hidden shadow-lg ring-1 ring-border/50 transition-all duration-300 hover:shadow-[0_0_35px_rgba(234,179,8,0.9)] hover:ring-[#eab308] cursor-pointer"
                  >
                    <img
                      src={image}
                      alt={`${project.title} preview ${imgIndex + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                    />
                  </div>
                );
              })}
            </div>

            {/* Element 3a — Arrow Overlay (Small circle, fades in on hover over cube container) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#2a2a2a]/95 dark:bg-white/95 text-white dark:text-neutral-900 flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.25)] transition-all duration-300 opacity-0 group-hover/cube:opacity-100 group-hover/cube:scale-105 pointer-events-none z-30">
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
        </div>

        {/* Element 4 — Right Info Placard */}
        <div className="relative lg:absolute lg:right-[3rem] lg:top-[55%] lg:-translate-y-1/2 w-full max-w-[90%] lg:max-w-[340px] text-center lg:text-left flex flex-col items-center lg:items-start justify-center px-[1.5rem] sm:px-0 mt-8 lg:mt-0 z-20">
          <ScrambleParagraph
            text={project.tagline}
            className="font-['DM_Sans',sans-serif] text-[16px] sm:text-[18px] leading-relaxed text-[#444] dark:text-[#ccc] mb-[1.8rem] transition-colors duration-500"
            wordStaggerMs={50}
            trigger={cardTrigger}
          />

          <div className="flex flex-wrap gap-[0.6rem] mb-[1.8rem] justify-center lg:justify-start">
            <div className="font-['DM_Sans',sans-serif] text-[13px] sm:text-[14px] border border-[#bbb] dark:border-[#555] rounded-full px-[20px] py-[8px] text-[#222] dark:text-[#eee] bg-white/80 dark:bg-black/80 font-medium transition-colors duration-500">
              Year: <strong className="font-semibold">{project.year}</strong>
            </div>
            <div className="font-['DM_Sans',sans-serif] text-[13px] sm:text-[14px] border border-[#bbb] dark:border-[#555] rounded-full px-[20px] py-[8px] text-[#222] dark:text-[#eee] bg-white/80 dark:bg-black/80 font-medium transition-colors duration-500">
              Role: <strong className="font-semibold">{project.role}</strong>
            </div>
          </div>

          <button
            onClick={handleNavigate}
            className="font-['DM_Sans',sans-serif] font-semibold text-[15px] sm:text-[16px] border border-[#333] dark:border-white rounded-full px-[32px] py-[14px] text-[#0a0a0a] dark:text-white bg-white/80 dark:bg-black/80 hover:bg-[#0a0a0a] hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 ease-in-out cursor-pointer"
          >
            View Project →
          </button>
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

  const headerRef = useRef<HTMLDivElement>(null);
  const [headerTrigger, setHeaderTrigger] = useState(false);
  const [descTrigger, setDescTrigger] = useState(false);
  const [countTrigger, setCountTrigger] = useState(false);

  // IntersectionObserver for the header container
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setHeaderTrigger(entry.isIntersecting);
        });
      },
      {
        threshold: 0.25,
        rootMargin: '0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, []);

  // Staggered triggers for the description and count label
  useEffect(() => {
    if (headerTrigger) {
      const t1 = window.setTimeout(() => setDescTrigger(true), 600);
      const t2 = window.setTimeout(() => setCountTrigger(true), 3800);
      return () => {
        window.clearTimeout(t1);
        window.clearTimeout(t2);
      };
    } else {
      setDescTrigger(false);
      setCountTrigger(false);
    }
  }, [headerTrigger]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      // Update rotation for each project based on its visibility
      setProjectRotations((prevRotations) => {
        // Ensure state size matches projects length dynamically (highly robust against HMR or catalog shifts)
        let currentRotations = [...prevRotations];
        if (currentRotations.length !== projects.length) {
          currentRotations = projects.map((_, i) => prevRotations[i] || 0);
        }
        return currentRotations.map((rotation, index) => {
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
        });
      });

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
      <div className="section-container mb-16 md:mb-24" ref={headerRef}>
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
              <ScrambleText text="Selected Work" trigger={headerTrigger} delay={0} />
            </span>
          </div>

          <h2 className="text-display-lg text-foreground font-['Audiowide',cursive]">
            <ScrambleText text="Projects" trigger={headerTrigger} delay={350} />
          </h2>

          <ScrambleParagraph
            text="A curated collection of projects spanning AI-driven systems, full-stack web applications, and real-time processing — each built to solve a real problem."
            className="text-lg md:text-xl text-muted-foreground max-w-2xl"
            wordStaggerMs={50}
            trigger={descTrigger}
          />

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
              <ScrambleText text={`${projects.length} Projects`} trigger={countTrigger} />
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