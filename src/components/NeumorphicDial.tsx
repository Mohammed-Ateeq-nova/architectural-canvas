import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { useThemeContext } from '@/components/ThemeProvider';

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
const AUTO_INTERVAL = 7000;

const getThemeStyles = (isDark: boolean) => {
  if (isDark) {
    return {
      dialBg: 'hsl(0 0% 14%)',
      containerBg: 'hsl(0 0% 7%)',
      neuRing: '-10px -10px 24px rgba(255,255,255,0.06), 10px 10px 24px rgba(0,0,0,0.7)',
      neuGroove: 'inset -6px -6px 14px rgba(255,255,255,0.04), inset 6px 6px 14px rgba(0,0,0,0.6)',
      neuExtruded: '-6px -6px 14px rgba(255,255,255,0.07), 6px 6px 14px rgba(0,0,0,0.6)',
      neuInset: 'inset -4px -4px 10px rgba(255,255,255,0.05), inset 4px 4px 10px rgba(0,0,0,0.5)',
      neuPill: '-3px -3px 8px rgba(255,255,255,0.06), 3px 3px 8px rgba(0,0,0,0.5)',
      borderColor: 'rgba(255,255,255,0.06)',
      borderColorSoft: 'rgba(255,255,255,0.04)',
      separatorGradient: 'linear-gradient(90deg, transparent 15%, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.08) 90%, transparent 100%)',
      activeText: 'text-white',
      inactiveText: 'text-white/30',
      counterText: 'text-white/30',
      titleText: 'text-white',
      skillText: 'text-white/80',
      barBg: 'rgba(255,255,255,0.08)',
    };
  }
  return {
    dialBg: 'hsl(0 0% 88%)',
    containerBg: 'hsl(0 0% 93%)',
    neuRing: '-10px -10px 20px rgba(255,255,255,0.8), 10px 10px 20px rgba(0,0,0,0.15)',
    neuGroove: 'inset -6px -6px 12px rgba(255,255,255,0.7), inset 6px 6px 12px rgba(0,0,0,0.12)',
    neuExtruded: '-6px -6px 14px rgba(255,255,255,0.8), 6px 6px 14px rgba(0,0,0,0.15)',
    neuInset: 'inset -4px -4px 10px rgba(255,255,255,0.7), inset 4px 4px 10px rgba(0,0,0,0.12)',
    neuPill: '-3px -3px 8px rgba(255,255,255,0.8), 3px 3px 8px rgba(0,0,0,0.12)',
    borderColor: 'rgba(0,0,0,0.06)',
    borderColorSoft: 'rgba(0,0,0,0.04)',
    separatorGradient: 'linear-gradient(90deg, transparent 15%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.08) 90%, transparent 100%)',
    activeText: 'text-foreground',
    inactiveText: 'text-foreground/30',
    counterText: 'text-foreground/30',
    titleText: 'text-foreground',
    skillText: 'text-foreground/80',
    barBg: 'rgba(0,0,0,0.08)',
  };
};

export const NeumorphicDial = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cumulativeRotation = useRef(0);
  const isMobile = useIsMobile();
  const { theme } = useThemeContext();
  const isDark = theme === 'dark';
  const s = getThemeStyles(isDark);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % 4);
    cumulativeRotation.current += 90;
  }, []);

  useEffect(() => {
    const id = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [next]);

  const wheelRotation = cumulativeRotation.current;

  const dialSize = isMobile ? 360 : 520;
  const halfDial = dialSize / 2;
  const labelRadius = dialSize * 0.38;
  const hubInset = dialSize * 0.375;
  const hubButtonInset = 24;
  const grooveInset = dialSize * 0.075;

  // How much of the dial peeks into the container (visible portion from left edge)
  const dialVisible = isMobile ? halfDial : halfDial * 0.7;

  const handleSelect = (i: number) => {
    const diff = ((i - activeIndex) % 4 + 4) % 4;
    cumulativeRotation.current += diff * 90;
    setActiveIndex(i);
  };

  const dialWheel = (
    <motion.div
      animate={{ rotate: wheelRotation }}
      transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ width: dialSize, height: dialSize, position: 'relative', flexShrink: 0 }}
    >
      {/* Base ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: s.dialBg,
          boxShadow: s.neuRing,
          border: `1px solid ${s.borderColor}`,
        }}
      />

      {/* Inner groove */}
      <div
        className="absolute rounded-full"
        style={{
          inset: grooveInset,
          boxShadow: s.neuGroove,
          border: `1px solid ${s.borderColorSoft}`,
          background: s.dialBg,
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
            background: s.separatorGradient,
          }}
        />
      ))}

      {/* Category labels — tangent to circumference */}
      {categories.map((cat, i) => {
        const angle = QUADRANT_ANGLES[i];
        const rad = (angle * Math.PI) / 180;
        const x = halfDial + labelRadius * Math.cos(rad);
        const y = halfDial + labelRadius * Math.sin(rad);
        // Counter-rotate so text stays upright, then add 90° for tangent alignment
        const textRotation = -wheelRotation - angle + 90;

        return (
          <motion.button
            key={cat.title}
            onClick={() => handleSelect(i)}
            className="absolute z-20 cursor-pointer"
            style={{
              left: x,
              top: y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <motion.span
              animate={{ rotate: textRotation }}
              transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1] }}
              className={`block text-[11px] font-display font-semibold tracking-[0.25em] uppercase transition-colors duration-500 select-none whitespace-nowrap ${
                i === activeIndex ? s.activeText : s.inactiveText
              }`}
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
          boxShadow: s.neuExtruded,
          border: `1px solid ${s.borderColor}`,
          background: s.dialBg,
        }}
      >
        <div
          className="absolute rounded-full"
          style={{
            inset: hubButtonInset,
            boxShadow: s.neuInset,
            border: `1px solid ${s.borderColorSoft}`,
            background: s.dialBg,
          }}
        />
      </div>
    </motion.div>
  );

  if (isMobile) {
    return (
      <div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{ background: s.containerBg }}
      >
        {/* Dial — top half visible, curved downward */}
        <div
          className="relative w-full flex justify-center"
          style={{ height: halfDial + 20, overflow: 'hidden' }}
        >
          <div style={{ position: 'absolute', top: 0 }}>
            {dialWheel}
          </div>
        </div>

        {/* Content below */}
        <div className="relative px-6 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 30, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className={`${s.counterText} text-xs font-display tracking-[0.3em] uppercase mb-3`}>
                {String(activeIndex + 1).padStart(2, '0')} / 04
              </p>
              <h3
                className={`text-2xl font-display font-bold mb-6 ${s.titleText}`}
                style={{ textShadow: isDark ? '0 0 30px hsl(var(--neon-cyan) / 0.15)' : 'none' }}
              >
                {categories[activeIndex].title}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {categories[activeIndex].skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className={`px-4 py-2 rounded-full text-sm font-display font-medium ${s.skillText}`}
                    style={{ background: s.dialBg, boxShadow: s.neuPill, border: `1px solid ${s.borderColor}` }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-2 mt-6 justify-center">
            {categories.map((_, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className="relative w-8 h-1 rounded-full overflow-hidden"
                style={{ background: s.barBg }}
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
  }

  // Desktop / Tablet: dial on middle-left, half hidden
  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{ background: s.containerBg, minHeight: dialSize }}
    >
      {/* Dial — anchored to left edge, vertically centered */}
      <div
        className="absolute top-0 bottom-0 left-0 z-10 flex items-center"
        style={{ width: dialVisible }}
      >
        <div
          style={{
            position: 'absolute',
            left: -(dialSize - dialVisible),
            width: dialSize,
            height: dialSize,
          }}
        >
          {dialWheel}
        </div>
      </div>

      {/* Active indicator dot */}
      <div
        className="absolute top-1/2 -translate-y-1/2 z-20"
        style={{ left: dialVisible + 16 }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{
            background: 'hsl(var(--neon-cyan))',
            boxShadow: '0 0 12px hsl(var(--neon-cyan)), 0 0 24px hsl(var(--neon-cyan) / 0.3)',
          }}
        />
      </div>

      {/* Content — right side */}
      <div
        className="relative flex flex-col justify-center pr-8 md:pr-12"
        style={{ paddingLeft: dialVisible + 48, minHeight: dialSize }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 30, filter: 'blur(4px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className={`${s.counterText} text-xs font-display tracking-[0.3em] uppercase mb-3`}>
              {String(activeIndex + 1).padStart(2, '0')} / 04
            </p>
            <h3
              className={`text-2xl md:text-3xl font-display font-bold mb-6 ${s.titleText}`}
              style={{ textShadow: isDark ? '0 0 30px hsl(var(--neon-cyan) / 0.15)' : 'none' }}
            >
              {categories[activeIndex].title}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {categories[activeIndex].skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={`px-4 py-2 rounded-full text-sm font-display font-medium ${s.skillText}`}
                  style={{ background: s.dialBg, boxShadow: s.neuPill, border: `1px solid ${s.borderColor}` }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-6 right-8 flex gap-2">
          {categories.map((_, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className="relative w-8 h-1 rounded-full overflow-hidden"
              style={{ background: s.barBg }}
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
