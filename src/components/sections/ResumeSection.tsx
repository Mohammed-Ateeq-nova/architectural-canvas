"use client";
import { useRef, useState, useEffect } from 'react';
import { Download, ExternalLink, FileText } from 'lucide-react';
import { FadeIn, SlideIn } from '@/components/PageTransition';
import { ScrambleText } from '../ScrambleText';

export const ResumeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [sectionTrigger, setSectionTrigger] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setSectionTrigger(entry.isIntersecting);
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, []);

  return (
    <section className="relative py-32 bg-white dark:bg-black transition-colors duration-500 overflow-hidden" id="resume" ref={sectionRef}>
      {/* Background radial accent glow */}
      <div className="absolute right-0 top-1/4 w-[350px] h-[350px] bg-[radial-gradient(circle,_rgba(0,229,255,0.06)_0%,_transparent_70%)] rounded-full pointer-events-none" />

      <div className="section-container">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: CV Details & Quick Stats */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <FadeIn>
              <span className="inline-block px-4 py-2 mb-6 text-xs font-display font-medium tracking-widest uppercase glass rounded-full">
                <ScrambleText text="Resume" trigger={sectionTrigger} />
              </span>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <h2 className="text-display-md mb-6 leading-tight">
                <ScrambleText text="Curriculum" trigger={sectionTrigger} delay={200} />{' '}
                <span className="dark:neon-text-cyan">
                  <ScrambleText text="Vitae" trigger={sectionTrigger} delay={1000} />
                </span>
              </h2>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                A comprehensive showcase of academic qualifications, core technical capabilities, software internship experiences, and AI engineering milestones. Feel free to view the interactive document directly or download a copy for offline access.
              </p>
            </FadeIn>
            
            {/* Quick Actions */}
            <FadeIn delay={0.3}>
              <div className="flex flex-wrap gap-4 mb-10">
                <a
                  href="/Mohammed_Ateeq_CV.pdf"
                  download="Mohammed_Ateeq_CV.pdf"
                  className="bg-[#0a0a0a] text-white dark:bg-white dark:text-[#0a0a0a] hover:bg-neutral-800 dark:hover:bg-neutral-100 rounded-full px-6 py-3 font-display font-semibold inline-flex items-center gap-2 transition-transform duration-300 hover:scale-105 shadow-md"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </a>
                <a
                  href="/Mohammed_Ateeq_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-full px-6 py-3 font-display font-medium inline-flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Full Screen
                </a>
              </div>
            </FadeIn>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Education', value: '8.8', suffix: 'CGPA' },
                { label: 'Projects Completed', value: '4+', suffix: 'Systems' },
                { label: 'Technologies', value: '20+', suffix: 'Tools' },
                { label: 'Hackathon Wins', value: '3', suffix: 'Awards' },
              ].map((stat, index) => (
                <FadeIn key={stat.label} delay={0.1 * index}>
                  <div className="glass p-5 rounded-2xl border border-border/20 hover:border-[#00e5ff]/50 transition-all duration-300 hover:scale-[1.02] text-left group">
                    <span className="text-2xl sm:text-3xl font-display font-bold dark:text-neon-cyan block mb-1">
                      {stat.value}
                    </span>
                    <span className="text-[11px] uppercase tracking-widest text-[#00e5ff] font-semibold block mb-1">
                      {stat.suffix}
                    </span>
                    <span className="text-sm text-muted-foreground block font-medium group-hover:text-foreground transition-colors duration-300">
                      <ScrambleText text={stat.label} trigger={sectionTrigger} delay={500 + index * 100} />
                    </span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Right Column: PDF Viewer Container */}
          <div className="lg:col-span-7 w-full">
            <SlideIn direction="right" delay={0.2}>
              {/* Premium Desktop Browser Wrapper */}
              <div className="w-full rounded-2xl overflow-hidden border border-border/40 dark:border-border/10 bg-card shadow-[0_15px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,229,255,0.06)] hover:dark:shadow-[0_20px_50px_rgba(0,229,255,0.12)] transition-all duration-500">
                
                {/* Browser-like window header */}
                <div className="w-full bg-[#f4f4f5] dark:bg-[#0d0d0d] px-6 py-4 flex items-center justify-between border-b border-border/40 dark:border-border/10">
                  {/* window dots */}
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  {/* Title tab */}
                  <div className="flex items-center gap-2 bg-white dark:bg-[#1a1a1a] px-5 py-1.5 rounded-lg border border-border/20 text-xs font-display font-medium text-muted-foreground tracking-wide">
                    <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>Mohammed_Ateeq_CV.pdf</span>
                  </div>
                  <div className="w-12" /> {/* spacer */}
                </div>

                {/* PDF rendering frame */}
                <div className="relative w-full aspect-[4/5] sm:h-[650px] bg-muted flex flex-col items-center justify-center">
                  <iframe 
                    src="/Mohammed_Ateeq_CV.pdf#toolbar=0&navpanes=0&scrollbar=1" 
                    title="Mohammed Ateeq CV"
                    className="w-full h-full border-0 select-none bg-white dark:bg-neutral-900"
                  />
                </div>
              </div>
            </SlideIn>
          </div>

        </div>
      </div>
    </section>
  );
};
