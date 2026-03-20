import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

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

// Neumorphic shadow values for dark gray surface
const NEU_EXTRUDED = '-6px -6px 14px rgba(255,255,255,0.07), 6px 6px 14px rgba(0,0,0,0.6)';
const NEU_INSET = 'inset -4px -4px 10px rgba(255,255,255,0.05), inset 4px 4px 10px rgba(0,0,0,0.5)';
const NEU_RING = '-10px -10px 24px rgba(255,255,255,0.06), 10px 10px 24px rgba(0,0,0,0.7)';
const NEU_GROOVE = 'inset -6px -6px 14px rgba(255,255,255,0.04), inset 6px 6px 14px rgba(0,0,0,0.6)';
const NEU_PILL = '-3px -3px 8px rgba(255,255,255,0.06), 3px 3px 8px rgba(0,0,0,0.5)';

const DIAL_BG = 'hsl(0 0% 14%)';

export const NeumorphicDial = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % 4);
  }, []);

  useEffect(() => {
    const id = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [next]);

  const wheelRotation = -90 * activeIndex;

  // Dial sizing: mobile=400, tablet/desktop=520
  const dialSize = isMobile ? 400 : 520;
  const halfDial = dialSize / 2;
  const labelRadius = dialSize * 0.4;
  const hubInset = dialSize * 0.375;
  const hubButtonInset = 30;
  const grooveInset = dialSize * 0.075;

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{ background: DIAL_BG }}
    >
      {/* Mobile: vertical stack. Desktop: side-by-side */}
      <div className={`relative ${isMobile ? 'flex flex-col items-center' : ''}`}
        style={{ minHeight: isMobile ? 'auto' : Math.max(420, dialSize * 0.77) }}
      >
        {/* === DIAL === */}
        <div
          className={`relative z-10 ${isMobile ? '' : 'absolute top-1/2 left-0'}`}
          style={
            isMobile
              ? { width: '100%', height: halfDial + 20, overflow: 'hidden' }
              : { transform: `translateY(-50%) translateX(-${halfDial}px)` }
          }
        >
          <motion.div
            animate={{ rotate: wheelRotation }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
            style={
              isMobile
                ? {
                    width: dialSize,
                    height: dialSize,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    position: 'absolute',
                    top: 0,
                  }
                : { width: dialSize, height: dialSize }
            }
          >
            {/* Base ring */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: DIAL_BG,
                boxShadow: NEU_RING,
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            />

            {/* Inner groove */}
            <div
              className="absolute rounded-full"
              style={{
                inset: grooveInset,
                boxShadow: NEU_GROOVE,
                border: '1px solid rgba(255,255,255,0.04)',
                background: DIAL_BG,
              }}
            />

            {/* Separators */}
            {SEPARATOR_ANGLES.map((angle) => (
              <div
                key={angle}
                className="absolute top-1/2 left-1/2 origin-left"
                style={{
                  width: halfDial,
                  height: 1,
                  transform: `rotate(${angle}deg)`,
                  background:
                    'linear-gradient(90deg, transparent 15%, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.08) 90%, transparent 100%)',
                }}
              />
            ))}

            {/* Category labels on perimeter */}
            {categories.map((cat, i) => {
              const angle = QUADRANT_ANGLES[i];
              const textRotation = -angle - wheelRotation;
              const rad = (angle * Math.PI) / 180;
              const x = halfDial + labelRadius * Math.cos(rad);
              const y = halfDial + labelRadius * Math.sin(rad);

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
                    className={`block text-[10px] font-display font-semibold tracking-[0.25em] uppercase transition-colors duration-500 select-none whitespace-nowrap ${
                      i === activeIndex
                        ? 'text-white'
                        : 'text-white/30'
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
                inset: hubInset,
                boxShadow: NEU_EXTRUDED,
                border: '1px solid rgba(255,255,255,0.06)',
                background: DIAL_BG,
              }}
            >
              <div
                className="absolute rounded-full"
                style={{
                  inset: hubButtonInset,
                  boxShadow: NEU_INSET,
                  border: '1px solid rgba(255,255,255,0.05)',
                  background: DIAL_BG,
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Active indicator dot */}
        {!isMobile && (
          <div className="absolute top-1/2 left-[18px] -translate-y-1/2 z-20">
            <div
              className="w-2 h-2 rounded-full"
              style={{
                background: 'hsl(var(--neon-cyan))',
                boxShadow: '0 0 12px hsl(var(--neon-cyan)), 0 0 24px hsl(var(--neon-cyan) / 0.3)',
              }}
            />
          </div>
        )}

        {/* === CONTENT === */}
        <div
          className={
            isMobile
              ? 'relative w-full px-6 py-8'
              : 'absolute inset-0 flex flex-col justify-center pr-8 md:pr-12'
          }
          style={isMobile ? {} : { paddingLeft: `${halfDial + 40}px` }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 30, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Counter */}
              <p className="text-white/30 text-xs font-display tracking-[0.3em] uppercase mb-3">
                {String(activeIndex + 1).padStart(2, '0')} / 04
              </p>

              {/* Title */}
              <h3
                className="text-2xl md:text-3xl font-display font-bold mb-6 text-white"
                style={{
                  textShadow: '0 0 30px hsl(var(--neon-cyan) / 0.15)',
                }}
              >
                {categories[activeIndex].title}
              </h3>

              {/* Skill bubbles */}
              <div className="flex flex-wrap gap-2.5">
                {categories[activeIndex].skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.06 * i,
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="px-4 py-2 rounded-full text-sm font-display font-medium text-white/80"
                    style={{
                      background: DIAL_BG,
                      boxShadow: NEU_PILL,
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom nav bars */}
          <div className={`flex gap-2 ${isMobile ? 'mt-6 justify-center' : 'absolute bottom-6 right-8'}`}>
            {categories.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="relative w-8 h-1 rounded-full overflow-hidden transition-colors duration-300"
                style={{ background: 'rgba(255,255,255,0.08)' }}
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
    </div>
  );
};

export default NeumorphicDial;
