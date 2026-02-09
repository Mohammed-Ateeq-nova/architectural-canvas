import { motion } from 'framer-motion';
import { FadeIn, SlideIn } from '@/components/PageTransition';
import { GlassCard, GlassCardLarge } from '@/components/GlassCard';

export const AboutSection = () => {
  return (
    <section className="relative py-32" id="about">
      <div className="section-container">
        <div className="mb-16">
          <FadeIn>
            <span className="inline-block px-4 py-2 mb-6 text-xs font-display font-medium tracking-widest uppercase glass rounded-full">
              About
            </span>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <h2 className="text-display-lg mb-8">
              The Developer Behind the
              <span className="block dark:neon-text-cyan">Digital Experiences</span>
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              I'm a Computer Science undergraduate at Anurag University, Hyderabad, 
              passionate about building scalable, clean, and modern systems. From full-stack 
              web applications to AI-integrated solutions and hardware-software integrations 
              at DRDO, I focus on writing efficient, maintainable code that solves real problems 
              and delivers measurable impact.
            </p>
          </FadeIn>
        </div>

        {/* Identity Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          <SlideIn direction="up" delay={0.1} className="lg:col-span-2">
            <GlassCardLarge className="h-full">
              <h3 className="text-display-sm mb-6">Philosophy</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I believe great software emerges from the intersection of clean architecture, 
                user-centric design, and relentless iteration. Whether it's a real-time heart 
                risk detection system or a marketing platform that drives leads, the approach 
                stays the same — understand the problem deeply, build with precision, and let 
                the results speak.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                My experience spans defense-grade data acquisition systems, AI-powered diagnostics, 
                and modern web platforms. I bring the same rigor to every project, regardless of scale.
              </p>
            </GlassCardLarge>
          </SlideIn>
          
          <SlideIn direction="up" delay={0.2}>
            <GlassCard variant="neon" className="h-full">
              <h3 className="text-display-sm mb-6">Core Values</h3>
              <ul className="space-y-4">
                {['Clean Code', 'Performance', 'User Impact', 'Continuous Learning'].map((value, index) => (
                  <motion.li
                    key={value}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3 text-lg"
                  >
                    <span className="w-2 h-2 rounded-full bg-foreground dark:bg-neon-cyan" />
                    {value}
                  </motion.li>
                ))}
              </ul>
            </GlassCard>
          </SlideIn>
        </div>

        {/* Skills Section */}
        <div className="mt-24">
          <FadeIn>
            <h3 className="text-display-md text-center mb-16">
              Technical <span className="dark:neon-text-magenta">Expertise</span>
            </h3>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Programming & CS', skills: ['C++', 'Python', 'Java', 'SQL', 'JavaScript', 'DSA'] },
              { title: 'Frontend & Backend', skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 'Tailwind CSS'] },
              { title: 'AI & Data', skills: ['TensorFlow', 'Scikit-learn', 'OpenCV', 'Pandas', 'NumPy', 'Matplotlib'] },
              { title: 'Tools & Platforms', skills: ['Git/GitHub', 'Firebase', 'MongoDB', 'Figma', 'Jupyter', 'Docker'] },
            ].map((category, index) => (
              <FadeIn key={category.title} delay={0.1 * index}>
                <GlassCard>
                  <h4 className="text-lg font-display font-semibold mb-4 dark:text-neon-cyan">
                    {category.title}
                  </h4>
                  <ul className="space-y-2">
                    {category.skills.map((skill) => (
                      <li key={skill} className="text-muted-foreground">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Leadership & Achievements */}
        <div className="mt-24">
          <FadeIn>
            <h3 className="text-display-md text-center mb-16">
              Leadership & <span className="dark:neon-text-cyan">Achievements</span>
            </h3>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-6">
            <SlideIn direction="up" delay={0.1}>
              <GlassCardLarge className="h-full">
                <h4 className="text-display-sm mb-4 dark:text-neon-cyan">Executive Chairperson</h4>
                <p className="text-lg text-muted-foreground mb-2">GeeksforGeeks Student Chapter, Anurag University</p>
                <ul className="space-y-3 mt-4">
                  {[
                    'Organized Hacktivate — a 24-hour hackathon with 400+ participants across 3 domains',
                    'Led 5 coding contests, designing 150+ questions with 50% YOY engagement increase',
                    'Conducted 3 workshops (200+ attendees) on debugging and code optimization',
                    'Hosted webinars with GFG Resource Persons reaching 400+ registrations',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-foreground dark:bg-neon-cyan mt-2 shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCardLarge>
            </SlideIn>

            <SlideIn direction="up" delay={0.2}>
              <GlassCard variant="neon" className="h-full">
                <h4 className="text-display-sm mb-6">Awards</h4>
                <ul className="space-y-4">
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
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <p className="font-display font-semibold">{award.title}</p>
                      <p className="text-sm text-muted-foreground">{award.desc}</p>
                    </motion.li>
                  ))}
                </ul>
              </GlassCard>
            </SlideIn>
          </div>
        </div>
      </div>
    </section>
  );
};
