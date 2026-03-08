import { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { BreathingGeometry } from '@/components/BreathingGeometry';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Entrance animations (one-time, not scroll-driven)
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo(badgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .fromTo(headlineRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.4')
        .fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .fromTo(linksRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .fromTo(scrollHintRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.1');

      // Scroll-driven exit: scrubbed from 0% to 30% of hero scroll
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      // Headline lifts up and blurs
      exitTl.to(headlineRef.current, {
        y: -120,
        opacity: 0,
        filter: 'blur(8px)',
        duration: 1,
        ease: 'none',
      }, 0);

      // Badge fades
      exitTl.to(badgeRef.current, {
        y: -80,
        opacity: 0,
        duration: 0.7,
        ease: 'none',
      }, 0);

      // Subtitle dissolves
      exitTl.to(subtitleRef.current, {
        y: -60,
        opacity: 0,
        filter: 'blur(4px)',
        duration: 0.8,
        ease: 'none',
      }, 0.1);

      // Social links fade
      exitTl.to(linksRef.current, {
        y: -40,
        opacity: 0,
        duration: 0.6,
        ease: 'none',
      }, 0.15);

      // Scroll hint fades out quickly
      exitTl.to(scrollHintRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: 'none',
      }, 0);

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      className="relative min-h-[120vh] flex items-center justify-center overflow-hidden"
    >
      {/* Breathing 3D Geometry */}
      <div className="absolute inset-0 z-[1]">
        <BreathingGeometry />
      </div>

      {/* Content */}
      <div className="relative z-10 section-container">
        <div className="max-w-5xl mx-auto text-center">
          <span
            ref={badgeRef}
            className="inline-block px-4 py-2 mb-8 text-sm font-display font-medium tracking-widest uppercase glass rounded-full opacity-0"
          >
            Full Stack & AI Developer
          </span>

          <div ref={headlineRef} className="opacity-0">
            <h1 className="text-display-xl mb-6">
              <span className="block">Mohammed</span>
              <span className="block dark:neon-text-cyan">Ateeq</span>
            </h1>
          </div>

          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 font-body opacity-0"
          >
            Building scalable web applications, AI-driven systems, and hardware–software integrations.
          </p>

          <div ref={linksRef} className="flex items-center justify-center gap-4 opacity-0">
            <a
              href="mailto:mohd.ateeq.march@gmail.com"
              className="glass rounded-full p-3 hover:scale-110 transition-transform"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/Mohammed-Ateeq-nova"
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-full p-3 hover:scale-110 transition-transform"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/mohammed-ateeq/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-full p-3 hover:scale-110 transition-transform"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground opacity-0"
      >
        <span className="text-xs font-display uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent animate-pulse" />
      </div>
    </section>
  );
};
