import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/PageTransition';
import { NeumorphicDial } from '@/components/NeumorphicDial';
import { ScrambleText } from '../ScrambleText';

// Custom Count-up Component for Metric Values
const CountUp = ({ value, trigger, delay = 0 }: { value: string; trigger: boolean; delay?: number }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    const numberMatch = value.match(/\d+/);
    if (!numberMatch) return;
    const target = parseInt(numberMatch[0], 10);

    let startTimestamp: number | null = null;
    const duration = 900; // 900ms count-up
    let animFrame: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress * (2 - progress); // easeOutQuad
      const currentVal = Math.floor(easeProgress * target);
      setCurrent(currentVal);

      if (progress < 1) {
        animFrame = window.requestAnimationFrame(step);
      } else {
        setCurrent(target);
      }
    };

    const timeoutId = setTimeout(() => {
      animFrame = window.requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (animFrame) window.cancelAnimationFrame(animFrame);
    };
  }, [trigger, value, delay]);

  const displayValue = value.replace(/\d+/, current.toString());
  return <span>{displayValue}</span>;
};

// Animation Variants
const lineVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.08,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

const stripVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.12,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

const ghostVariants = {
  hidden: { opacity: 0 },
  visible: (custom: { opacity: number; delay: number }) => ({
    opacity: custom.opacity,
    transition: {
      delay: custom.delay,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

const barVariants = {
  hidden: { width: 0 },
  visible: (custom: { width: string; delay: number }) => ({
    width: custom.width,
    transition: {
      delay: custom.delay,
      duration: 0.8,
      ease: "easeOut"
    }
  })
};

const metricsData = [
  { value: '400+', label: 'Hackathon Participants', sublabel: 'Hacktivate — 24hr, 3 domains' },
  { value: '150+', label: 'Contest Questions Designed', sublabel: 'Across 5 coding contests' },
  { value: '200+', label: 'Workshop Attendees', sublabel: 'Debugging & optimization sessions' },
  { value: '50%', label: 'YOY Engagement Growth', sublabel: 'Year-over-year increase' }
];

const awardsData = [
  {
    roman: 'I',
    rank: '// WINNER',
    rankColorClass: 'text-[#00e5ff]',
    title: 'Winner — Code Wars',
    subtitle: '1st among 200 participants',
    detail: 'College-level coding contest · first-year',
    progressWidth: '100%',
    ghostOpacity: 0.07
  },
  {
    roman: 'II',
    rank: '// WINNER',
    rankColorClass: 'text-[#00e5ff]',
    title: 'Winner — Code Maze',
    subtitle: 'University-level contest',
    detail: 'GFG Student Chapter organized',
    progressWidth: '100%',
    ghostOpacity: 0.045
  },
  {
    roman: 'III',
    rank: '// RUNNER-UP',
    rankColorClass: 'text-muted-foreground/80',
    title: '2nd Place — Tech Hack III',
    subtitle: 'Data Analytics domain',
    detail: 'Inter-college hackathon · Anurag University',
    progressWidth: '50%',
    ghostOpacity: 0.025
  }
];

export const AboutSection = () => {
  const leadershipRef = useRef<HTMLDivElement>(null);
  const [leadershipTrigger, setLeadershipTrigger] = useState(false);

  useEffect(() => {
    const el = leadershipRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setLeadershipTrigger(entry.isIntersecting);
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px'
      }
    );

    observer.observe(el);

    // Fallback: if element is already in viewport on mount, trigger immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setLeadershipTrigger(true);
    }

    return () => {
      observer.unobserve(el);
    };
  }, []);

  return (
    <section className="relative py-32" id="about">
      <div className="section-container">
        {/* Skills Section — Neumorphic Dial */}
        <div className="mt-12">
          <FadeIn>
            <ScrambleText
              text="Technical Expertise"
              as="h3"
              className="text-display-md text-center mb-12"
            />
          </FadeIn>

          <NeumorphicDial />
        </div>

        {/* Leadership & Achievements Section Redesign */}
        <div className="leadership-wrapper mt-24" ref={leadershipRef}>
          {/* Scoped Custom CSS Styles */}
          <style dangerouslySetInnerHTML={{ __html: `
            .leadership-wrapper {
              width: 100%;
              padding: 5rem 0;
              overflow: hidden;
              position: relative;
            }

            .leadership-content {
              position: relative;
              z-index: 1;
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              gap: clamp(2rem, 4vw, 5rem);
              padding: 0 clamp(1.5rem, 6vw, 6rem);
            }

            .leadership-left-col {
              width: 50%;
            }

            .leadership-right-col {
              width: 50%;
              border-left: 1px solid var(--border);
              padding-left: clamp(1.5rem, 3vw, 3rem);
            }

            .metric-row {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: baseline;
              padding: 1.25rem 0;
              border-bottom: 1px solid var(--border);
            }

            .awards-container {
              display: flex;
              flex-direction: row;
              margin: 0 clamp(1.5rem, 6vw, 6rem);
              border-top: 1px solid var(--border);
              border-bottom: 1px solid var(--border);
            }

            .award-strip {
              flex: 1;
              position: relative;
              overflow: hidden;
              padding: 2.5rem 2rem 0 2rem;
              min-height: clamp(260px, 32vw, 400px);
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              background: transparent;
              transition: background 0.4s ease;
            }

            .award-strip:hover {
              background-color: hsl(var(--secondary));
            }

            .award-strip-1, .award-strip-2 {
              border-right: 1px solid var(--border);
            }

            .award-strip .ghost-num {
              position: absolute;
              top: -0.12em;
              right: 0.1em;
              line-height: 1;
              font-family: 'Bebas Neue', sans-serif;
              font-size: clamp(90px, 14vw, 170px);
              pointer-events: none;
              z-index: 0;
              transition: color 0.4s ease;
            }

            /* Light Mode Colors & Hover Opacities */
            .award-strip-1 .ghost-num {
              color: rgba(100, 100, 100, 0.08);
            }
            .award-strip-1:hover .ghost-num {
              color: rgba(100, 100, 100, 0.16) !important;
            }

            .award-strip-2 .ghost-num {
              color: rgba(100, 100, 100, 0.05);
            }
            .award-strip-2:hover .ghost-num {
              color: rgba(100, 100, 100, 0.10) !important;
            }

            .award-strip-3 .ghost-num {
              color: rgba(100, 100, 100, 0.03);
            }
            .award-strip-3:hover .ghost-num {
              color: rgba(100, 100, 100, 0.06) !important;
            }

            /* Dark Mode Colors & Hover Opacities */
            .dark .award-strip-1 .ghost-num {
              color: rgba(0, 229, 255, 0.07);
            }
            .dark .award-strip-1:hover .ghost-num {
              color: rgba(0, 229, 255, 0.14) !important;
            }

            .dark .award-strip-2 .ghost-num {
              color: rgba(0, 229, 255, 0.045);
            }
            .dark .award-strip-2:hover .ghost-num {
              color: rgba(0, 229, 255, 0.09) !important;
            }

            .dark .award-strip-3 .ghost-num {
              color: rgba(0, 229, 255, 0.025);
            }
            .dark .award-strip-3:hover .ghost-num {
              color: rgba(0, 229, 255, 0.06) !important;
            }

            @media (max-width: 1024px) and (min-width: 641px) {
              .leadership-content {
                gap: 2rem;
              }
              .leadership-left-col {
                width: 50%;
              }
              .leadership-right-col {
                width: 50%;
                padding-left: 1.5rem;
              }
              .award-strip {
                padding: 2.5rem 1.5rem 0 1.5rem;
              }
            }

            @media (max-width: 640px) {
              .leadership-content {
                flex-direction: column;
                gap: 2rem;
              }
              .leadership-left-col {
                width: 100%;
              }
              .leadership-right-col {
                width: 100%;
                border-left: none;
                border-top: 1px solid var(--border);
                padding-left: 0;
                padding-top: 2rem;
              }
              .awards-container {
                flex-direction: column;
              }
              .award-strip {
                min-height: 180px;
                padding: 2rem 1.5rem 0 1.5rem;
              }
              .award-strip-1, .award-strip-2 {
                border-right: none;
                border-bottom: 1px solid var(--border);
              }
              .award-strip-3 {
                border-bottom: none;
              }
              .award-strip .ghost-num {
                font-size: clamp(80px, 20vw, 120px);
              }
            }
          `}} />

          {/* Ghost Watermark Layer */}
          <div
            className="absolute top-0 left-0 right-0 text-center pointer-events-none z-0 select-none text-foreground opacity-[0.06] dark:opacity-[0.04]"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(80px, 16vw, 200px)',
              letterSpacing: '0.08em',
              whiteSpace: 'nowrap'
            }}
          >
            <ScrambleText text="ACHIEVEMENTS" trigger={leadershipTrigger} />
          </div>

          {/* Block 1 — Leadership Content Layer */}
          <div className="leadership-content">
            {/* Left Column */}
            <div className="leadership-left-col">
              <span 
                className="text-gray-700 dark:text-[#00e5ff] uppercase block mb-4"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.35em', fontWeight: 400 }}
              >
                <ScrambleText text="LEADERSHIP" trigger={leadershipTrigger} />
              </span>

              <h3 
                style={{ fontFamily: "'Audiowide', cursive", fontSize: 'clamp(20px, 3.2vw, 44px)', lineHeight: 1.1, letterSpacing: '0.02em' }} 
                className="text-foreground uppercase flex flex-col font-normal select-none mb-6"
              >
                <motion.span custom={0} variants={lineVariants} animate={leadershipTrigger ? "visible" : "hidden"} initial="hidden">
                  <ScrambleText text="EXPERTISE," trigger={leadershipTrigger} delay={0} />
                </motion.span>
                <motion.span custom={1} variants={lineVariants} animate={leadershipTrigger ? "visible" : "hidden"} initial="hidden">
                  <ScrambleText text="LEADERSHIP" trigger={leadershipTrigger} delay={80} />
                </motion.span>
                <motion.span custom={2} variants={lineVariants} animate={leadershipTrigger ? "visible" : "hidden"} initial="hidden">
                  <ScrambleText text="& IMPACT" trigger={leadershipTrigger} delay={160} /><span className="text-[#00e5ff]">.</span>
                </motion.span>
              </h3>

              <h4
                className="text-muted-foreground uppercase block font-bold"
                style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(13px, 1.4vw, 17px)', letterSpacing: '0.15em', fontWeight: 700, marginTop: '1.5rem' }}
              >
                <ScrambleText text="EXECUTIVE CHAIRPERSON" trigger={leadershipTrigger} delay={240} />
              </h4>

              <div 
                className="text-muted-foreground/70"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 400, marginTop: '0.4rem' }}
              >
                GeeksforGeeks Student Chapter, Anurag University
              </div>
            </div>

            {/* Right Column */}
            <div className="leadership-right-col">
              {metricsData.map((metric, idx) => (
                <div key={idx} className="metric-row">
                  {/* Left Side — Metric Value Count-up */}
                  <span
                    className="text-foreground font-normal"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(38px, 4.5vw, 58px)', lineHeight: 1 }}
                  >
                    <CountUp value={metric.value} trigger={leadershipTrigger} delay={idx * 120} />
                  </span>

                  {/* Right Side — Label Group */}
                  <div className="text-right flex flex-col">
                    <span 
                      className="text-foreground/80 font-medium"
                      style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px' }}
                    >
                      {metric.label}
                    </span>
                    <span 
                      className="text-muted-foreground block"
                      style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', marginTop: '2px' }}
                    >
                      {metric.sublabel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Editorial Divider */}
          <div 
            className="flex items-center w-full my-12"
            style={{ padding: '0 clamp(1.5rem, 6vw, 6rem)' }}
          >
            <div className="flex-1 h-[1px] bg-border/40" />
            <span 
              className="text-muted-foreground/50 uppercase select-none px-4"
              style={{ fontFamily: "'Courier New', monospace", fontSize: '10px', letterSpacing: '0.45em', whiteSpace: 'nowrap' }}
            >
              RECOGNITION
            </span>
            <div className="flex-1 h-[1px] bg-border/40" />
          </div>

          {/* Block 2 — Awards Label */}
          <div style={{ margin: '0 clamp(1.5rem, 6vw, 6rem) 2rem' }}>
            <span 
              className="text-gray-700 dark:text-[#00e5ff] uppercase block"
              style={{ fontFamily: "'Audiowide', cursive", fontSize: '11px', letterSpacing: '0.35em' }}
            >
              <ScrambleText text="AWARDS" trigger={leadershipTrigger} />
            </span>
          </div>

          {/* Awards Strips Container */}
          <div className="awards-container">
            {awardsData.map((award, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={stripVariants}
                animate={leadershipTrigger ? "visible" : "hidden"}
                initial="hidden"
                className={`award-strip award-strip-${idx + 1}`}
              >
                {/* Ghost Roman Numeral */}
                <motion.div
                  custom={{ opacity: 1, delay: idx * 0.1 }}
                  variants={ghostVariants}
                  animate={leadershipTrigger ? "visible" : "hidden"}
                  initial="hidden"
                  className="ghost-num"
                >
                  {award.roman}
                </motion.div>

                {/* Strip Top Area */}
                <div className="relative z-10">
                  <span
                    className={award.rankColorClass}
                    style={{ fontFamily: "'Courier New', monospace", fontSize: '11px', letterSpacing: '0.15em', fontWeight: 'bold' }}
                  >
                    {award.rank}
                  </span>
                </div>

                {/* Strip Bottom Area */}
                <div className="relative z-10 w-full mt-auto">
                  <h4
                    className="text-foreground uppercase font-normal mb-1"
                    style={{ fontFamily: "'Audiowide', cursive", fontSize: 'clamp(12px, 1.3vw, 17px)', letterSpacing: '-0.01em', lineHeight: 1.2 }}
                  >
                    <ScrambleText text={award.title} trigger={leadershipTrigger} delay={idx * 150} />
                  </h4>
                  <p 
                    className="text-muted-foreground"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 400, marginTop: '4px' }}
                  >
                    {award.subtitle}
                  </p>
                  <p 
                    className="text-muted-foreground/60"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 400, marginTop: '2px', marginBottom: '1.5rem' }}
                  >
                    {award.detail}
                  </p>
                </div>

                {/* Rank Progress Bar */}
                <motion.div
                  custom={{ width: award.progressWidth, delay: idx * 0.15 }}
                  variants={barVariants}
                  animate={leadershipTrigger ? "visible" : "hidden"}
                  initial="hidden"
                  className="absolute bottom-0 left-0 h-[2px] bg-[#00e5ff]"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
