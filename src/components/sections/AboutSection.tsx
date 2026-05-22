import { motion } from 'framer-motion';
import { FadeIn, SlideIn } from '@/components/PageTransition';
import { GlassCard, GlassCardLarge } from '@/components/GlassCard';
import { NeumorphicDial } from '@/components/NeumorphicDial';

export const AboutSection = () => {
  return (
    <section className="relative py-32" id="about">
      <div className="section-container">
        {/* Skills Section — Neumorphic Dial */}
        <div className="mt-12">
          <FadeIn>
            <h3 className="text-display-md text-center mb-12">
              Technical <span className="dark:neon-text-magenta">Expertise</span>
            </h3>
          </FadeIn>

          <NeumorphicDial />
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
