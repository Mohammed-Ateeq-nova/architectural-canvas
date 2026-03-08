import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GlassCard, GlassCardLarge } from '@/components/GlassCard';

/* ── Expertise Data ─────────────────────────── */
const expertiseCategories = [
  {
    label: 'PART 01',
    name: 'Frontend',
    description: 'Building responsive, performant interfaces with modern frameworks. From component architectures to animation systems, crafting pixel-perfect experiences that feel alive.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
  },
  {
    label: 'PART 02',
    name: 'Backend',
    description: 'Designing scalable server architectures and APIs that handle real-world load. RESTful services, real-time communication, and serverless deployments.',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'WebSockets', 'Serverless'],
  },
  {
    label: 'PART 03',
    name: 'Programming & CS',
    description: 'Strong foundations in algorithms, data structures, and computational thinking. Writing efficient, clean code across multiple paradigms and languages.',
    skills: ['C++', 'Python', 'Java', 'SQL', 'JavaScript', 'DSA'],
  },
  {
    label: 'PART 04',
    name: 'AI / Machine Learning',
    description: 'Building intelligent systems with deep learning, computer vision, and data pipelines. From model training to production deployment of AI-driven solutions.',
    skills: ['TensorFlow', 'Scikit-learn', 'OpenCV', 'Pandas', 'NumPy', 'Matplotlib'],
  },
  {
    label: 'PART 05',
    name: 'Databases',
    description: 'Designing efficient data models and managing both SQL and NoSQL databases. Optimizing queries, ensuring data integrity, and scaling storage solutions.',
    skills: ['MongoDB', 'Firebase', 'PostgreSQL', 'MySQL', 'Redis', 'Supabase'],
  },
  {
    label: 'PART 06',
    name: 'Tools & Platforms',
    description: 'Leveraging modern development toolchains for efficient workflows. Version control, containerization, design systems, and cloud deployment.',
    skills: ['Git/GitHub', 'Docker', 'Figma', 'Jupyter', 'VS Code', 'Linux'],
  },
];

const SECTION_COUNT = expertiseCategories.length;

/* ── Scroll-Driven Expertise Module ─────────── */
const ExpertiseDrum = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll to continuous progress across all sections
  const totalProgress = useTransform(scrollYProgress, [0, 1], [0, SECTION_COUNT - 1]);

  // Circle rotations — outer clockwise, inner counter-clockwise
  const outerRotation = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const innerRotation = useTransform(scrollYProgress, [0, 1], [0, -120]);

  // Parallax layers: circle fastest, content medium
  const circleY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);

  return (
    <div
      ref={containerRef}
      style={{ height: `${(SECTION_COUNT + 1) * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* ── LEFT: Rotating Circle Mechanism ── */}
        <motion.div
          style={{ y: circleY }}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[35%] md:-translate-x-[25%] pointer-events-none"
        >
          {/* Outer circle */}
          <motion.div
            style={{ rotate: outerRotation }}
            className="w-[70vh] h-[70vh] md:w-[80vh] md:h-[80vh] rounded-full border border-foreground/[0.08] dark:border-foreground/[0.12] relative"
          >
            {/* Category labels printed on the outer ring */}
            {expertiseCategories.map((cat, i) => {
              const angle = (i / SECTION_COUNT) * 360;
              return (
                <div
                  key={cat.label}
                  className="absolute left-1/2 top-1/2 origin-center"
                  style={{
                    transform: `rotate(${angle}deg) translateY(-50%) translateX(-50%)`,
                  }}
                >
                  <span
                    className="absolute text-[10px] md:text-xs font-display font-bold uppercase tracking-[0.3em] text-foreground/20 dark:text-foreground/25 whitespace-nowrap"
                    style={{
                      transform: `translateY(-${70 * 0.45}vh) rotate(90deg)`,
                      transformOrigin: 'center center',
                    }}
                  >
                    {cat.label}
                  </span>
                </div>
              );
            })}
          </motion.div>

          {/* Inner circle */}
          <motion.div
            style={{ rotate: innerRotation }}
            className="absolute inset-[15%] rounded-full border border-foreground/[0.06] dark:border-foreground/[0.10]"
          />

          {/* Center glow */}
          <div className="absolute inset-[35%] rounded-full bg-neon-cyan/3 dark:bg-neon-cyan/8 blur-[40px]" />
        </motion.div>

        {/* ── Vertical drum labels (inside circle area) ── */}
        <div className="absolute left-[8%] md:left-[12%] top-0 h-full flex items-center pointer-events-none">
          <div className="relative h-[60vh] overflow-hidden">
            <motion.div
              style={{
                y: useTransform(totalProgress, (v) => `${-v * 25}vh`),
              }}
            >
              {expertiseCategories.map((cat, i) => (
                <div key={cat.label} className="h-[25vh] flex items-center">
                  <div className="transform rotate-90 origin-center whitespace-nowrap">
                    <span className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground/[0.06] dark:text-foreground/[0.08] uppercase tracking-wider select-none">
                      {cat.label}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── RIGHT: Content ── */}
        <motion.div
          style={{ y: contentY }}
          className="relative z-10 ml-auto w-full md:w-[55%] lg:w-[50%] pr-4 md:pr-8 lg:pr-12 pl-4 md:pl-0"
        >
          <div className="relative h-[70vh] overflow-hidden">
            <motion.div
              style={{
                y: useTransform(totalProgress, (v) => `${-v * (70 / SECTION_COUNT)}vh`),
              }}
            >
              {expertiseCategories.map((cat, i) => (
                <div
                  key={cat.name}
                  className="flex flex-col justify-center"
                  style={{ height: `${70 / SECTION_COUNT}vh` }}
                >
                  {/* Category headline */}
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4 md:mb-6 leading-tight">
                    {cat.name}
                  </h3>

                  {/* Divider line */}
                  <div className="w-16 md:w-20 h-px bg-foreground/60 dark:bg-neon-cyan/60 mb-4 md:mb-6" />

                  {/* Description */}
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg mb-4 md:mb-6">
                    {cat.description}
                  </p>

                  {/* Skills as minimal tags */}
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs md:text-sm font-display text-foreground/60 dark:text-foreground/70 border border-border/40 dark:border-foreground/10 rounded-full px-3 py-1"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Scroll progress indicator */}
          <div className="absolute bottom-4 right-4 md:right-8 lg:right-12 flex flex-col items-end gap-2">
            <motion.span
              className="text-xs font-display text-muted-foreground tabular-nums"
              style={{
                content: useTransform(totalProgress, (v) => `${Math.round(v) + 1}`),
              }}
            >
              <ProgressCounter progress={totalProgress} />
            </motion.span>
            <div className="w-px h-16 bg-border relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-full bg-foreground dark:bg-neon-cyan"
                style={{
                  height: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/* ── Progress counter helper ── */
import { useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

const ProgressCounter = ({ progress }: { progress: ReturnType<typeof useTransform> }) => {
  const [current, setCurrent] = useState(0);
  useMotionValueEvent(progress, 'change', (v: number) => {
    setCurrent(Math.round(v));
  });
  return (
    <span>
      {String(current + 1).padStart(2, '0')} / {String(SECTION_COUNT).padStart(2, '0')}
    </span>
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
    <section ref={sectionRef} className="relative overflow-hidden" id="about">
      {/* Parallax background element */}
      <motion.div
        style={{ y: parallaxY2 }}
        className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full bg-neon-cyan/3 dark:bg-neon-cyan/5 blur-[100px] pointer-events-none"
      />

      <div className="section-container relative z-10 py-32">
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
      </div>

      {/* Technical Expertise — Scroll-driven drum */}
      <div className="relative">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-8 pt-16"
          >
            <span className="text-xs font-display uppercase tracking-[0.3em] text-muted-foreground">04 — Expertise</span>
            <h3 className="text-display-md mt-4">
              Technical <span className="dark:neon-text-magenta">Mastery</span>
            </h3>
          </motion.div>
        </div>

        <ExpertiseDrum />
      </div>

      {/* Leadership & Achievements */}
      <div className="section-container relative z-10 py-32">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
