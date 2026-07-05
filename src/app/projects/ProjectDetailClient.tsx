"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { PageTransition, FadeIn, SlideIn } from '@/components/PageTransition';
import { GlassCard } from '@/components/GlassCard';
import { ScrambleText } from '@/components/ScrambleText';
import { ScrambleParagraph } from '@/components/ScrambleParagraph';
import { projectData } from '@/data/projects';

export default function ProjectDetailClient({ id }: { id: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(t);
  }, []);

  const project = projectData[id || ''] || {
    title: 'Project Not Found',
    category: '',
    overview: 'This project does not exist.',
    documentation: {
      context: '',
      approach: '',
      implementation: '',
    },
    tech: [],
  };

  // Structured Data (JSON-LD) for SoftwareSourceCode
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "name": project.title,
    "description": project.overview,
    "codeRepository": project.githubUrl || "https://github.com/Mohammed-Ateeq-nova",
    "programmingLanguage": project.tech.map(t => t.name).join(", "),
    "author": {
      "@type": "Person",
      "name": "Mohammed Ateeq"
    }
  };

  return (
    <PageTransition className="page-container pt-32 overflow-x-hidden max-w-[100vw]">
      {/* Dynamic JSON-LD injection */}
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
      
      {/* Back Navigation */}
      <div className="section-container mb-8">
        <FadeIn>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-display"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </FadeIn>
      </div>

      {/* Header */}
      <section className="section-container mb-16">
        <FadeIn delay={0.1}>
          <span className="inline-block px-4 py-2 mb-6 text-xs font-display font-medium tracking-widest uppercase glass rounded-full">
            <ScrambleText text={project.category || 'Project'} trigger={mounted} delay={0} />
          </span>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <h1 
            className="mb-6 dark:neon-text-cyan uppercase font-bold tracking-tight leading-tight select-none whitespace-normal break-words"
            style={{
              fontFamily: "'Audiowide', cursive",
              fontSize: 'clamp(28px, 5vw, 72px)',
              maxWidth: '100%',
              overflowWrap: 'break-word',
              wordBreak: 'break-word'
            }}
          >
            <ScrambleText text={project.title} trigger={mounted} delay={200} />
          </h1>
        </FadeIn>
        
        <FadeIn delay={0.3}>
          <ScrambleParagraph
            text={project.overview}
            className="text-xl text-muted-foreground max-w-3xl"
            trigger={mounted}
            wordStaggerMs={40}
          />
        </FadeIn>
        
        {/* Action Buttons */}
        <FadeIn delay={0.4}>
          <div className="flex flex-wrap gap-4 mt-8">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-full px-6 py-3 font-display font-medium inline-flex items-center gap-2 group hover:scale-105 transition-transform"
              >
                Live Demo
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-foreground dark:border-neon-cyan rounded-full px-6 py-3 font-display font-medium inline-flex items-center gap-2 hover:bg-foreground hover:text-background dark:hover:bg-neon-cyan transition-colors"
              >
                <Github className="w-4 h-4" />
                View Code
              </a>
            )}
          </div>
        </FadeIn>
      </section>

      {/* Project Hero Image / Video */}
      {(project.youtubeId || project.image) && (
        <section className="section-container mb-16">
          <FadeIn delay={0.5}>
            <div className="w-full aspect-[16/9] rounded-[24px] overflow-hidden border border-border/30 dark:border-border/10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.2)] bg-card relative">
              {project.youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${project.youtubeId}&controls=1&rel=0&playsinline=1`}
                  title={`${project.title} video demonstration`}
                  className="w-full h-full absolute inset-0 border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <img 
                  src={project.image} 
                  alt={`${project.title} preview`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </FadeIn>
        </section>
      )}

      {/* Documentation Section */}
      <section className="section-container mb-24">
        <FadeIn>
          <ScrambleText text="Documentation" as="h2" className="text-display-sm mb-8 block" />
        </FadeIn>
        
        <SlideIn direction="up">
          <GlassCard hover={false} className="space-y-8">
            <div>
              <ScrambleText text="Context" as="h3" className="font-display font-semibold text-lg mb-3 dark:text-neon-cyan block" />
              <p className="text-muted-foreground leading-relaxed">
                {project.documentation.context}
              </p>
            </div>
            
            <div>
              <ScrambleText text="Approach" as="h3" className="font-display font-semibold text-lg mb-3 dark:text-neon-cyan block" />
              <p className="text-muted-foreground leading-relaxed">
                {project.documentation.approach}
              </p>
            </div>
            
            <div>
              <ScrambleText text="Implementation" as="h3" className="font-display font-semibold text-lg mb-3 dark:text-neon-cyan block" />
              <p className="text-muted-foreground leading-relaxed">
                {project.documentation.implementation}
              </p>
            </div>
            
            {project.documentation.architecture && (
              <div>
                <ScrambleText text="Architecture" as="h3" className="font-display font-semibold text-lg mb-3 dark:text-neon-cyan block" />
                <p className="text-muted-foreground leading-relaxed">
                  {project.documentation.architecture}
                </p>
              </div>
            )}
          </GlassCard>
        </SlideIn>
      </section>

      {/* Tech Stack */}
      <section className="section-container mb-24">
        <FadeIn>
          <ScrambleText text="Technology Stack" as="h2" className="text-display-sm mb-8 block" />
        </FadeIn>
        
        <div className="flex flex-wrap gap-4">
          {project.tech.map((tech, index) => (
            <FadeIn key={tech.name} delay={0.05 * index} className="relative group">
              <span className="glass rounded-full px-6 py-3 font-display font-medium cursor-pointer transition-all duration-300 hover:scale-105 dark:hover:shadow-glow-cyan inline-block">
                {tech.name}
              </span>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 glass-heavy p-4 rounded-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none transition-all duration-300 z-50 text-left border-0 shadow-lg">
                <div className="space-y-2">
                  <h4 className="font-display font-semibold dark:text-neon-cyan">
                    {tech.name}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tech.usage}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* More Projects */}
      <section className="section-container pb-24">
        <FadeIn>
          <div className="flex justify-between items-center mb-8">
            <ScrambleText text="More Projects" as="h2" className="text-display-sm block" />
            <Link
              href="/#projects"
              className="text-muted-foreground hover:text-foreground transition-colors font-display"
            >
              View All →
            </Link>
          </div>
        </FadeIn>
        
        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(projectData)
            .filter(([key]) => key !== id)
            .slice(0, 3)
            .map(([key, proj], index) => (
              <FadeIn key={key} delay={0.1 * index}>
                <Link href={`/projects/${key}`}>
                  <GlassCard className="group">
                    <div className="aspect-[4/3] rounded-lg mb-4 overflow-hidden border border-border/20 dark:border-border/10 bg-muted">
                      {proj.image ? (
                        <img 
                          src={proj.image} 
                          alt={proj.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted" />
                      )}
                    </div>
                    <span className="text-xs font-display uppercase tracking-widest text-muted-foreground mb-1 block">
                      {proj.category}
                    </span>
                    <h3 className="font-display font-semibold group-hover:dark:text-neon-cyan transition-colors">
                      {proj.title}
                    </h3>
                  </GlassCard>
                </Link>
              </FadeIn>
            ))}
        </div>
      </section>
    </PageTransition>
  );
}
