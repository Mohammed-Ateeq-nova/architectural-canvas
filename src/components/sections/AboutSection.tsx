import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GlassCard, GlassCardLarge } from '@/components/GlassCard';

/* ── Expertise Data ─────────────────────────── */
const expertiseCategories = [
  { name: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'] },
  { name: 'Backend', skills: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'WebSockets', 'Serverless'] },
  { name: 'Programming & CS', skills: ['C++', 'Python', 'Java', 'SQL', 'JavaScript', 'DSA'] },
  { name: 'AI / ML', skills: ['TensorFlow', 'Scikit-learn', 'OpenCV', 'Pandas', 'NumPy', 'Matplotlib'] },
  { name: 'Databases', skills: ['MongoDB', 'Firebase', 'PostgreSQL', 'MySQL', 'Redis', 'Supabase'] },
  { name: 'Tools & Platforms', skills: ['Git/GitHub', 'Docker', 'Figma', 'Jupyter', 'VS Code', 'Linux'] },
];

/* ── Circular Expertise Module ──────────────── */
const ExpertiseCircle = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % expertiseCategories.length);
    }, 5000);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  const go = (dir: -1 | 1) => {
    setActiveIdx((prev) => (prev + dir + expertiseCategories.length) % expertiseCategories.length);
    resetTimer();
  };

  const active = expertiseCategories[activeIdx];

  return (
    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
      {/* Circle */}
      <div className="relative flex-shrink-0">
        {/* Outer glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            background: 'conic-gradient(from 0deg, hsl(var(--neon-cyan)), transparent 30%, hsl(var(--neon-magenta)), transparent 70%, hsl(var(--neon-cyan)))',
            opacity: 0.3,
            filter: 'blur(8px)',
          }}
        />

        {/* Main circle */}
        <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-full glass flex items-center justify-center border border-border/50 dark:border-neon-cyan/20">
          {/* Pulsing inner glow */}
          <motion.div
            className="absolute inset-4 rounded-full dark:bg-neon-cyan/5"
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Category dots around the circle */}
          {expertiseCategories.map((_, i) => {
            const angle = (i / expertiseCategories.length) * 360 - 90;
            const rad = (angle * Math.PI) / 180;
            const r = 50;
            return (
              <motion.button
                key={i}
                onClick={() => { setActiveIdx(i); resetTimer(); }}
                className="absolute w-3 h-3 rounded-full transition-colors duration-300 cursor-pointer"
                style={{
                  left: `calc(50% + ${Math.cos(rad) * r}% - 6px)`,
                  top: `calc(50% + ${Math.sin(rad) * r}% - 6px)`,
                }}
                animate={{
                  backgroundColor: i === activeIdx ? 'hsl(var(--neon-cyan))' : 'hsl(var(--muted-foreground))',
                  scale: i === activeIdx ? 1.4 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
            );
          })}

          {/* Active category name */}
          <AnimatePresence mode="wait">
            <motion.span
              key={active.name}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 text-lg md:text-xl font-display font-bold text-center px-4 dark:neon-text-cyan"
            >
              {active.name}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Navigation arrows */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <button
            onClick={() => go(-1)}
            className="glass rounded-full p-2 hover:scale-110 transition-transform"
            aria-label="Previous category"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-display text-muted-foreground tabular-nums">
            {activeIdx + 1} / {expertiseCategories.length}
          </span>
          <button
            onClick={() => go(1)}
            className="glass rounded-full p-2 hover:scale-110 transition-transform"
            aria-label="Next category"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Skills display */}
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.name}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <h4 className="text-display-sm mb-6 dark:neon-text-cyan">{active.name}</h4>
            <div className="grid grid-cols-2 gap-3">
              {active.skills.map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="glass rounded-xl px-4 py-3 text-sm font-body text-foreground/80 dark:text-foreground/90"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ── About Section ──────────────────────────── */
export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY1 = useTransform(scrollYProgress, [0, 1], ['30px', '-30px']);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], ['50px', '-50px']);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden" id="about">
      {/* Parallax background element */}
      <motion.div
        style={{ y: parallaxY2 }}
        className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full bg-neon-cyan/3 dark:bg-neon-cyan/5 blur-[100px] pointer-events-none"
      />

      <div className="section-container relative z-10">
        {/* Section header */}
        <motion.div
          style={{ y: parallaxY1 }}
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block px-4 py-2 mb-6 text-xs font-display font-medium tracking-widest uppercase glass rounded-full">
            About
          </span>
          <h2 className="text-display-lg mb-8">
            The Developer Behind the
            <span className="block dark:neon-text-cyan">Digital Experiences</span>
          </h2>
        </motion.div>

        {/* Story sections */}
        <div className="space-y-24">
          {/* Journey */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="grid lg:grid-cols-5 gap-8 items-start"
          >
            <div className="lg:col-span-2">
              <span className="text-xs font-display uppercase tracking-[0.3em] text-muted-foreground">01 — Journey</span>
            </div>
            <div className="lg:col-span-3">
              <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-body">
                I'm a Computer Science undergraduate at Anurag University, Hyderabad,
                passionate about building scalable, clean, and modern systems. From full-stack
                web applications to AI-integrated solutions and hardware-software integrations
                at DRDO, I focus on writing efficient, maintainable code that solves real problems.
              </p>
            </div>
          </motion.div>

          {/* Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="grid lg:grid-cols-5 gap-8 items-start"
          >
            <div className="lg:col-span-2">
              <span className="text-xs font-display uppercase tracking-[0.3em] text-muted-foreground">02 — Philosophy</span>
            </div>
            <div className="lg:col-span-3">
              <GlassCardLarge hover={false}>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  I believe great software emerges from the intersection of clean architecture,
                  user-centric design, and relentless iteration. Whether it's a real-time heart
                  risk detection system or a marketing platform that drives leads, the approach
                  stays the same — understand the problem deeply, build with precision, and let
                  the results speak.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Clean Code', 'Performance', 'User Impact', 'Continuous Learning'].map((value) => (
                    <span
                      key={value}
                      className="px-4 py-2 text-sm font-display glass rounded-full dark:text-neon-cyan"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </GlassCardLarge>
            </div>
          </motion.div>

          {/* Strengths */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="grid lg:grid-cols-5 gap-8 items-start"
          >
            <div className="lg:col-span-2">
              <span className="text-xs font-display uppercase tracking-[0.3em] text-muted-foreground">03 — Strengths</span>
            </div>
            <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
              {[
                { title: 'Fullstack Mastery', desc: 'End-to-end development from database design to pixel-perfect UI' },
                { title: 'AI Integration', desc: 'Building intelligent systems with TensorFlow, OpenCV, and ML pipelines' },
                { title: 'Defense-Grade Rigor', desc: 'Data acquisition systems at DRDO with precision and reliability' },
                { title: 'Technical Leadership', desc: 'Organized hackathons, coding contests, and workshops for 400+ participants' },
              ].map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <GlassCard hover={false}>
                    <h4 className="font-display font-semibold mb-2 dark:text-neon-cyan">{s.title}</h4>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Technical Expertise Module */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-32"
        >
          <div className="text-center mb-16">
            <span className="text-xs font-display uppercase tracking-[0.3em] text-muted-foreground">04 — Expertise</span>
            <h3 className="text-display-md mt-4">
              Technical <span className="dark:neon-text-magenta">Mastery</span>
            </h3>
          </div>

          <div className="glass rounded-3xl p-8 md:p-12 lg:p-16">
            <ExpertiseCircle />
          </div>
        </motion.div>

        {/* Leadership & Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-32"
        >
          <div className="text-center mb-16">
            <span className="text-xs font-display uppercase tracking-[0.3em] text-muted-foreground">05 — Impact</span>
            <h3 className="text-display-md mt-4">
              Leadership & <span className="dark:neon-text-cyan">Achievements</span>
            </h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <GlassCardLarge>
              <h4 className="text-display-sm mb-4 dark:text-neon-cyan">Executive Chairperson</h4>
              <p className="text-lg text-muted-foreground mb-4">GeeksforGeeks Student Chapter, Anurag University</p>
              <ul className="space-y-3">
                {[
                  'Organized Hacktivate — a 24-hour hackathon with 400+ participants across 3 domains',
                  'Led 5 coding contests, designing 150+ questions with 50% YOY engagement increase',
                  'Conducted 3 workshops (200+ attendees) on debugging and code optimization',
                  'Hosted webinars with GFG Resource Persons reaching 400+ registrations',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground dark:bg-neon-cyan mt-2.5 shrink-0" />
                    <span className="text-muted-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCardLarge>

            <GlassCard variant="neon">
              <h4 className="text-display-sm mb-6">Awards</h4>
              <ul className="space-y-5">
                {[
                  { title: '1st Place — Tech Hack III', desc: 'Data Analytics domain, inter-college hackathon at Anurag University' },
                  { title: 'Winner — Code Wars', desc: '1st among 200 first-year participants in college-level coding contest' },
                  { title: 'Runner-up — Code Maze', desc: 'University-level coding contest by GFG Student Chapter' },
                ].map((award, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <p className="font-display font-semibold">{award.title}</p>
                    <p className="text-sm text-muted-foreground">{award.desc}</p>
                  </motion.li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
