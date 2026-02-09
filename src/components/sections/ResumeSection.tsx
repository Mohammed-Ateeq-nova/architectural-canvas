import { Download } from 'lucide-react';
import { FadeIn } from '@/components/PageTransition';
import { GlassCard } from '@/components/GlassCard';

export const ResumeSection = () => {
  return (
    <section className="relative py-32" id="resume">
      <div className="section-container">
        <div className="mb-16">
          <FadeIn>
            <span className="inline-block px-4 py-2 mb-6 text-xs font-display font-medium tracking-widest uppercase glass rounded-full">
              Resume
            </span>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <h2 className="text-display-lg mb-6">
              Curriculum <span className="dark:neon-text-cyan">Vitae</span>
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <p className="text-xl text-muted-foreground max-w-2xl mb-8">
              A comprehensive overview of qualifications, experience, and achievements.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <a
              href="/Mohammed_Ateeq_CV.pdf"
              download
              className="glass rounded-full px-6 py-3 font-display font-medium inline-flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
          </FadeIn>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { label: 'Education', value: '8.8' , suffix: 'CGPA' },
            { label: 'Projects Completed', value: '4+', suffix: '' },
            { label: 'Technologies', value: '20+', suffix: '' },
            { label: 'Hackathon Wins', value: '3', suffix: '' },
          ].map((stat, index) => (
            <FadeIn key={stat.label} delay={0.1 * index}>
              <GlassCard className="text-center">
                <span className="text-4xl font-display font-bold dark:text-neon-cyan block mb-1">
                  {stat.value}
                </span>
                {stat.suffix && (
                  <span className="text-sm text-muted-foreground block mb-1">{stat.suffix}</span>
                )}
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
