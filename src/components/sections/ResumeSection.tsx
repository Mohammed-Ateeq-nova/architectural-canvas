import { Download, ExternalLink } from 'lucide-react';
import { FadeIn, SlideIn } from '@/components/PageTransition';
import { GlassCard, GlassCardLarge } from '@/components/GlassCard';

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
            <button className="glass rounded-full px-6 py-3 font-display font-medium inline-flex items-center gap-2 hover:scale-105 transition-transform">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </FadeIn>
        </div>

        {/* Resume Preview */}
        <SlideIn direction="up">
          <GlassCardLarge className="overflow-hidden max-w-4xl mx-auto">
            <div className="aspect-[8.5/11] bg-card rounded-xl flex items-center justify-center relative overflow-hidden max-h-[600px]">
              <div className="absolute inset-8 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
                  <ExternalLink className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-4">
                  Resume Preview
                </h3>
                <p className="text-muted-foreground max-w-sm mb-6">
                  Upload your resume PDF to display it here.
                </p>
                <div className="glass rounded-lg px-4 py-2 text-sm font-display">
                  Supports: PDF, DOCX
                </div>
              </div>
              
              <div className="absolute top-4 left-4 right-4 flex justify-between text-xs text-muted-foreground font-display">
                <span>RESUME</span>
                <span>{new Date().getFullYear()}</span>
              </div>
            </div>
          </GlassCardLarge>
        </SlideIn>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mt-16">
          {[
            { label: 'Years Experience', value: '0+' },
            { label: 'Projects Completed', value: '0+' },
            { label: 'Technologies', value: '0+' },
            { label: 'Certifications', value: '0' },
          ].map((stat, index) => (
            <FadeIn key={stat.label} delay={0.1 * index}>
              <GlassCard className="text-center">
                <span className="text-4xl font-display font-bold dark:text-neon-cyan block mb-2">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
