"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Briefcase } from 'lucide-react';
import { PageTransition, FadeIn, SlideIn } from '@/components/PageTransition';
import { GlassCard, GlassCardLarge } from '@/components/GlassCard';
import { ScrambleText } from '@/components/ScrambleText';
import { ScrambleParagraph } from '@/components/ScrambleParagraph';
import { experiencesList, experienceDetailData } from '@/data/experiences';

export default function ExperienceDetailClient({ id }: { id: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [id]);

  const experience = experienceDetailData[id || ''] || {
    role: 'Experience Not Found',
    company: '',
    location: '',
    period: '',
    overview: 'This experience does not exist.',
    responsibilities: [],
    achievements: [],
    technologies: [],
  };

  const otherExperiences = experiencesList.filter(exp => exp.id !== id);

  // CreativeWork Schema for the work role
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": `${experience.role} at ${experience.company}`,
    "description": experience.overview,
    "creator": {
      "@type": "Person",
      "name": "Mohammed Ateeq"
    }
  };

  return (
    <PageTransition className="page-container pt-32 overflow-x-hidden max-w-[100vw]">
      {/* Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        h1, h2, h3, h4, h5, h6 {
          max-width: 100% !important;
          overflow-wrap: break-word !important;
          word-break: break-word !important;
          white-space: normal !important;
        }
      `}} />
      <div className="section-container mb-8">
        <FadeIn>
          <Link
            href="/#experience"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-display"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Experience
          </Link>
        </FadeIn>
      </div>

      <section className="section-container mb-16">
        <FadeIn delay={0.1}>
          <span className="inline-block px-4 py-2 mb-6 text-xs font-display font-medium tracking-widest uppercase glass rounded-full">
            <ScrambleText text="Experience" trigger={mounted} />
          </span>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <h1 
            className="mb-6 dark:neon-text-cyan uppercase font-bold tracking-tight leading-tight select-none whitespace-normal break-words"
            style={{
              fontFamily: "'Audiowide', cursive",
              fontSize: 'clamp(28px, 4.5vw, 64px)',
              maxWidth: '100%',
              overflowWrap: 'break-word',
              wordBreak: 'break-word'
            }}
          >
            <ScrambleText text={experience.role} trigger={mounted} delay={200} />
          </h1>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground font-display text-sm md:text-base mb-6">
            <span className="font-semibold text-foreground uppercase">{experience.company}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-border" />
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{experience.period}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-border" />
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{experience.location}</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <ScrambleParagraph
            text={experience.overview}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed font-medium"
            trigger={mounted}
          />
        </FadeIn>
      </section>

      <section className="section-container mb-24">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <SlideIn direction="up">
              <GlassCardLarge className="p-8 md:p-12 space-y-10">
                <div>
                  <h3 className="font-display font-bold text-lg md:text-xl mb-6 flex items-center gap-2 border-b border-border/20 pb-4 dark:text-neon-cyan">
                    <Briefcase className="w-5 h-5" />
                    <span>Responsibilities</span>
                  </h3>
                  <ul className="space-y-4">
                    {experience.responsibilities.map((resp, index) => (
                      <li key={index} className="flex gap-4 items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] mt-2 shrink-0" />
                        <span className="text-muted-foreground text-sm md:text-base leading-relaxed">
                          {resp}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-display font-bold text-lg md:text-xl mb-6 flex items-center gap-2 border-b border-border/20 pb-4 dark:text-neon-cyan">
                    <span>Key Achievements</span>
                  </h3>
                  <ul className="space-y-4">
                    {experience.achievements.map((ach, index) => (
                      <li key={index} className="flex gap-4 items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                        <span className="text-muted-foreground text-sm md:text-base leading-relaxed">
                          {ach}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCardLarge>
            </SlideIn>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <SlideIn direction="right">
              <GlassCard className="p-6 md:p-8">
                <h3 className="font-display font-bold text-sm tracking-wider uppercase mb-6 text-muted-foreground">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 text-xs font-display font-medium bg-secondary/50 border border-border/30 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </SlideIn>
          </div>
        </div>
      </section>

      {otherExperiences.length > 0 && (
        <section className="section-container pb-24">
          <FadeIn>
            <h2 className="font-display font-bold text-xl md:text-2xl mb-8 uppercase tracking-wide">
              Other Roles
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {otherExperiences.map((exp, index) => (
              <FadeIn key={exp.id} delay={0.1 * index}>
                <Link href={`/experience/${exp.id}`}>
                  <GlassCard className="p-6 group hover:border-[#00e5ff]/30 dark:hover:border-[#00e5ff]/20">
                    <span className="text-xs font-display text-[#00e5ff] uppercase tracking-widest font-semibold block mb-2">
                      {exp.period}
                    </span>
                    <h3 className="font-display font-bold text-lg mb-1 group-hover:dark:text-neon-cyan transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-muted-foreground uppercase font-semibold">
                      {exp.company}
                    </p>
                  </GlassCard>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>
      )}
    </PageTransition>
  );
}
