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
              The Architect Behind the
              <span className="block dark:neon-text-cyan">Digital Experiences</span>
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Add your bio and personal story here. This section is designed to 
              showcase your journey, philosophy, and the passion that drives 
              your creative engineering work.
            </p>
          </FadeIn>
        </div>

        {/* Identity Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          <SlideIn direction="up" delay={0.1} className="lg:col-span-2">
            <GlassCardLarge className="h-full">
              <h3 className="text-display-sm mb-6">Philosophy</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Your design philosophy and approach goes here. Describe how you 
                think about problems, your creative process, and what makes 
                your work unique.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                This is placeholder text - populate with your actual content 
                from your resume or personal narrative.
              </p>
            </GlassCardLarge>
          </SlideIn>
          
          <SlideIn direction="up" delay={0.2}>
            <GlassCard variant="neon" className="h-full">
              <h3 className="text-display-sm mb-6">Core Values</h3>
              <ul className="space-y-4">
                {['Innovation', 'Craftsmanship', 'Collaboration', 'Impact'].map((value, index) => (
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
              { title: 'Frontend', skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'] },
              { title: 'Backend', skills: ['Node.js', 'Python', 'PostgreSQL', 'GraphQL'] },
              { title: '3D & Motion', skills: ['Three.js', 'GSAP', 'Framer Motion', 'WebGL'] },
              { title: 'Tools', skills: ['Git', 'Docker', 'Figma', 'AWS'] },
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
      </div>
    </section>
  );
};
