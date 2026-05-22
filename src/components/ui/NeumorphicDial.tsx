import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DOMAINS = [
  { title: 'Programming & CS', skills: ['C++', 'Python', 'Java', 'SQL', 'JavaScript', 'DSA'] },
  { title: 'Frontend & Backend', skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 'Tailwind CSS'] },
  { title: 'AI & Data', skills: ['TensorFlow', 'Scikit-learn', 'OpenCV', 'Pandas', 'NumPy', 'Matplotlib'] },
  { title: 'Tools & Platforms', skills: ['Git/GitHub', 'Firebase', 'MongoDB', 'Figma', 'Jupyter', 'Docker'] },
];

export const NeumorphicDial = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DOMAINS.length);
    }, 8000); // 8 seconds interval
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[600px] flex items-center overflow-hidden rounded-3xl bg-background border border-white/5 my-16">

      {/* The Dial (Left Anchored) */}
      <div className="absolute top-1/2 left-0 -translate-x-[270px] -translate-y-1/2 w-[540px] h-[540px] z-10 pointer-events-none">

        {/* Rotating Container */}
        <motion.div
          className="w-full h-full relative"
          animate={{ rotate: activeIndex * -90 }}
          transition={{ duration: 2.4, ease: [0.25, 1, 0.5, 1] }}
        >
          {/* Outer Ring Neumorphism Base */}
          <div className="absolute inset-0 rounded-full bg-background shadow-[-15px_-15px_30px_rgba(255,255,255,0.02),_15px_15px_30px_rgba(0,0,0,0.8)] border border-white/5" />

          {/* Inner Groove (Inset Neumorphism) */}
          <div className="absolute inset-[100px] rounded-full bg-background shadow-[inset_-10px_-10px_20px_rgba(255,255,255,0.02),_inset_10px_10px_20px_rgba(0,0,0,0.8)] border border-white/5" />

          {/* Central Hub Neumorphism Popping out */}
          <div className="absolute inset-[170px] rounded-full bg-background shadow-[-10px_-10px_20px_rgba(255,255,255,0.02),_10px_10px_20px_rgba(0,0,0,0.8)] flex items-center justify-center border border-white/5">
            <div className="w-[80px] h-[80px] rounded-full shadow-[inset_-5px_-5px_10px_rgba(255,255,255,0.02),_inset_5px_5px_10px_rgba(0,0,0,0.5)]" />
          </div>

          {/* Radial Separator Lines */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={`line-${i}`}
              className="absolute top-1/2 left-1/2 w-[270px] h-px bg-white/10 origin-left"
              style={{ transform: `rotate(${i * 90 - 45}deg)` }}
            />
          ))}

          {/* Domain Labels */}
          {DOMAINS.map((domain, i) => {
            // Base angle positions: 0 -> Top(-90), 1 -> Right(0), 2 -> Bottom(90), 3 -> Left(180)
            const baseRotation = i * 90 - 90;
            return (
              <div
                key={domain.title}
                className="absolute top-1/2 left-1/2 origin-left w-[240px] flex justify-end"
                style={{ transform: `rotate(${baseRotation}deg)` }}
              >
                {/* Rotated text to align mathematically matching the image */}
                <div
                  className="font-display font-medium text-2xl tracking-[0.1em] uppercase text-muted-foreground whitespace-nowrap opacity-60"
                  style={{ transform: 'rotate(90deg)', transformOrigin: 'right center', marginTop: '-15px' }}
                >
                  <span className={activeIndex === i ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-1000' : 'transition-colors duration-1000'}>
                    {domain.title}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Content Area (Right Side) */}
      <div className="relative z-20 w-full h-full flex flex-col justify-center pl-[50%] pr-12 md:pr-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          >
            <h3 className="text-display-sm mb-6 dark:neon-text-cyan font-display">
              {DOMAINS[activeIndex].title}
            </h3>

            <div className="flex flex-wrap gap-4 mt-8">
              {DOMAINS[activeIndex].skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.15 + 0.2, duration: 0.8, ease: 'easeOut' }}
                  className="px-6 py-3 rounded-full bg-background border border-white/5 font-display font-medium text-muted-foreground hover:text-white"
                  style={{
                    boxShadow: '-4px -4px 10px rgba(255,255,255,0.02), 4px 4px 10px rgba(0,0,0,0.5)'
                  }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>

            {/* Subtle floating decorative pulse mimicking data processing */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-12 opacity-20 pointer-events-none">
              <motion.div
                className="w-[300px] h-[300px] rounded-full border border-cyan/30"
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
