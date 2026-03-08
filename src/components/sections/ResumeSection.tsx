import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ChevronDown, GraduationCap, Briefcase, Award, Users } from 'lucide-react';

/* ── Data ──────────────────────────────────── */
const timelineData = {
  experience: [
    {
      title: 'Summer Intern — DRDO (DRDL)',
      period: 'May 2025 – Jul 2025',
      details: [
        'Developed data acquisition and signal processing systems for defense applications',
        'Built hardware-software integrations with real-time telemetry systems',
        'Worked on precision data logging pipelines with strict reliability requirements',
      ],
    },
    {
      title: 'Frontend Developer — Coneixia (Startup)',
      period: 'Oct 2024 – Feb 2025',
      details: [
        'Built marketing website with Next.js, React, and Tailwind CSS',
        'Integrated AI-powered chatbot, boosting lead engagement by 30%',
        'Designed and shipped responsive UI components for the platform',
      ],
    },
  ],
  education: [
    {
      title: 'B.Tech in Computer Science',
      period: '2022 – 2026',
      details: ['Anurag University, Hyderabad', 'CGPA: 8.8', 'Relevant coursework: DSA, DBMS, OS, AI/ML, Computer Networks'],
    },
    {
      title: 'Intermediate (MPC)',
      period: '2020 – 2022',
      details: ['Narayana Junior College', 'Percentage: 96.6%'],
    },
  ],
  leadership: [
    {
      title: 'Executive Chairperson — GFG Student Chapter',
      period: '2023 – Present',
      details: [
        'Organized Hacktivate, a 24-hour hackathon with 400+ participants',
        'Led 5 coding contests with 150+ questions, increasing engagement by 50%',
        'Conducted workshops on debugging and optimization for 200+ attendees',
      ],
    },
  ],
  achievements: [
    {
      title: '1st Place — Tech Hack III',
      period: '2024',
      details: ['Inter-college hackathon, Data Analytics domain'],
    },
    {
      title: 'Winner — Code Wars',
      period: '2023',
      details: ['1st among 200 first-year participants'],
    },
    {
      title: 'Runner-up — Code Maze',
      period: '2023',
      details: ['University-level coding contest by GFG Chapter'],
    },
  ],
};

type Category = keyof typeof timelineData;

const categoryMeta: { key: Category; label: string; icon: typeof Briefcase }[] = [
  { key: 'experience', label: 'Experience', icon: Briefcase },
  { key: 'education', label: 'Education', icon: GraduationCap },
  { key: 'leadership', label: 'Leadership', icon: Users },
  { key: 'achievements', label: 'Achievements', icon: Award },
];

/* ── Timeline Item ─────────────────────────── */
const TimelineItem = ({ item, index }: { item: (typeof timelineData.experience)[0]; index: number }) => {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-8 pb-8 last:pb-0 group"
    >
      {/* Timeline line */}
      <div className="absolute left-[7px] top-3 bottom-0 w-px bg-border dark:bg-border group-last:hidden" />
      {/* Dot */}
      <div className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full border-2 border-foreground dark:border-neon-cyan bg-background z-10" />

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="font-display font-semibold text-lg">{item.title}</h4>
            <span className="text-sm text-muted-foreground font-display">{item.period}</span>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="mt-1 shrink-0"
          >
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden mt-3 space-y-2"
          >
            {item.details.map((detail, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 shrink-0" />
                {detail}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ── Resume Section ────────────────────────── */
export const ResumeSection = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('experience');

  return (
    <section className="relative py-32" id="resume">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <span className="inline-block px-4 py-2 mb-6 text-xs font-display font-medium tracking-widest uppercase glass rounded-full">
            Resume
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-display-lg mb-4">
                Curriculum <span className="dark:neon-text-cyan">Vitae</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl">
                A curated overview of qualifications, experience, and achievements.
              </p>
            </div>
            <a
              href="/Mohammed_Ateeq_CV.pdf"
              download
              className="glass rounded-full px-6 py-3 font-display font-medium text-sm inline-flex items-center gap-2 hover:scale-105 transition-transform shrink-0 self-start md:self-auto"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {[
            { value: '8.8', suffix: 'CGPA', label: 'Education' },
            { value: '4+', suffix: '', label: 'Projects' },
            { value: '20+', suffix: '', label: 'Technologies' },
            { value: '3', suffix: '', label: 'Hackathon Wins' },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-5 text-center">
              <span className="text-3xl font-display font-bold dark:text-neon-cyan block">
                {stat.value}
              </span>
              {stat.suffix && (
                <span className="text-xs text-muted-foreground block">{stat.suffix}</span>
              )}
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {categoryMeta.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`glass rounded-full px-5 py-2.5 font-display font-medium text-sm inline-flex items-center gap-2 transition-all duration-300 ${
                activeCategory === key
                  ? 'dark:shadow-glow-cyan dark:text-neon-cyan border-foreground/30 dark:border-neon-cyan/40'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </motion.div>

        {/* Timeline */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-3xl p-8 md:p-12"
          >
            {timelineData[activeCategory].map((item, i) => (
              <TimelineItem key={item.title} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
