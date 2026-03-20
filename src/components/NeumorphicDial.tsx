import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  {
    title: 'Programming',
    skills: ['C++', 'Python', 'Java', 'SQL', 'JavaScript', 'DSA'],
  },
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 'Tailwind CSS'],
  },
  {
    title: 'AI & Data',
    skills: ['TensorFlow', 'Scikit-learn', 'OpenCV', 'Pandas', 'NumPy', 'Matplotlib'],
  },
  {
    title: 'Tools',
    skills: ['Git/GitHub', 'Firebase', 'MongoDB', 'Figma', 'Jupyter', 'Docker'],
  },
];

const QUADRANT_ANGLES = [0, 90, 180, 270];
const SEPARATOR_ANGLES = [45, 135, 225, 315];
const AUTO_INTERVAL = 5000;

export const NeumorphicDial = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % 4);
  }, []);

  useEffect(() => {
    const id = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [next]);

  const wheelRotation = -90 * activeIndex;

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden"
      style={{
        height: 600,
        background: 'hsl(var(--background))',
        boxShadow: 'inset 0 0 80px rgba(0,0,0,0.4)',
      }}
    >
      {/* === DIAL (left side) === */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-[400px] z-10">
        <motion.div
          animate={{ rotate: wheelRotation }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
          style={{ width: 800, height: 800 }}
        >
          {/* Base ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow:
                '-15px -15px 30px rgba(255,255,255,0.02), 15px 15px 30px rgba(0,0,0,0.8)',
              border: '1px solid rgba(255,255,255,0.04)',
            }}
          />

          {/* Inner groove */}
          <div
            className="absolute rounded-full"
            style={{
              inset: 60,
              boxShadow:
                'inset -8px -8px 16px rgba(255,255,255,0.03), inset 8px 8px 16px rgba(0,0,0,0.7)',
              border: '1px solid rgba(255,255,255,0.03)',
            }}
          />

          {/* Separators */}
          {SEPARATOR_ANGLES.map((angle) => (
            <div
              key={angle}
              className="absolute top-1/2 left-1/2 origin-left"
              style={{
                width: 400,
                height: 1,
                transform: `rotate(${angle}deg)`,
                background:
                  'linear-gradient(90deg, transparent 15%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.06) 90%, transparent 100%)',
              }}
            />
          ))}

          {/* Category labels on perimeter */}
          {categories.map((cat, i) => {
            const angle = QUADRANT_ANGLES[i];
            // counter-rotate so text stays readable when wheel spins
            const textRotation = -angle - wheelRotation;
            const radius = 320;
            const rad = (angle * Math.PI) / 180;
            const x = 400 + radius * Math.cos(rad);
            const y = 400 + radius * Math.sin(rad);

            return (
              <motion.button
                key={cat.title}
                onClick={() => setActiveIndex(i)}
                className="absolute z-20 cursor-pointer"
                style={{
                  left: x,
                  top: y,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <motion.span
                  animate={{ rotate: textRotation }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className={`block text-[11px] font-display font-semibold tracking-[0.25em] uppercase transition-colors duration-500 select-none ${
                    i === activeIndex
                      ? 'text-foreground'
                      : 'text-muted-foreground/50'
                  }`}
                  style={{ display: 'inline-block' }}
                >
                  {cat.title}
                </motion.span>
              </motion.button>
            );
          })}

          {/* Central hub */}
          <div
            className="absolute rounded-full"
            style={{
              inset: 300,
              boxShadow:
                '-10px -10px 20px rgba(255,255,255,0.03), 10px 10px 20px rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.05)',
              background: 'hsl(var(--background))',
            }}
          >
            {/* Inner inset button */}
            <div
              className="absolute rounded-full"
              style={{
                inset: 30,
                boxShadow:
                  'inset -4px -4px 8px rgba(255,255,255,0.03), inset 4px 4px 8px rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.04)',
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Active indicator dot on the rim */}
      <div className="absolute top-1/2 left-[22px] -translate-y-1/2 z-20">
        <div
          className="w-2 h-2 rounded-full"
          style={{
            background: 'hsl(var(--neon-cyan))',
            boxShadow: '0 0 12px hsl(var(--neon-cyan)), 0 0 24px hsl(var(--neon-cyan) / 0.3)',
          }}
        />
      </div>

      {/* === CONTENT (right side) === */}
      <div className="absolute inset-0 pl-[42%] md:pl-[46%] flex flex-col justify-center pr-8 md:pr-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 40, filter: 'blur(6px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Counter */}
            <p className="text-muted-foreground/40 text-xs font-display tracking-[0.3em] uppercase mb-3">
              {String(activeIndex + 1).padStart(2, '0')} / 04
            </p>

            {/* Title */}
            <h3
              className="text-3xl md:text-4xl font-display font-bold mb-8"
              style={{
                color: 'hsl(var(--foreground))',
                textShadow: '0 0 40px hsl(var(--neon-cyan) / 0.15)',
              }}
            >
              {categories[activeIndex].title}
            </h3>

            {/* Skill bubbles */}
            <div className="flex flex-wrap gap-3">
              {categories[activeIndex].skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08 * i,
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="px-5 py-2.5 rounded-full text-sm font-display font-medium text-foreground/80"
                  style={{
                    background: 'hsl(var(--background))',
                    boxShadow:
                      '-4px -4px 10px rgba(255,255,255,0.03), 4px 4px 10px rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom nav dots */}
        <div className="absolute bottom-8 right-8 flex gap-2">
          {categories.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="relative w-8 h-1 rounded-full overflow-hidden transition-colors duration-300"
              style={{
                background: 'rgba(255,255,255,0.06)',
              }}
            >
              {i === activeIndex && (
                <motion.div
                  layoutId="dial-indicator"
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'hsl(var(--neon-cyan))' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NeumorphicDial;
