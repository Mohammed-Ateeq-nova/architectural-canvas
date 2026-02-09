import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Briefcase } from 'lucide-react';
import { PageTransition, FadeIn, SlideIn } from '@/components/PageTransition';
import { GlassCard, GlassCardLarge } from '@/components/GlassCard';
import { experiences } from '@/components/sections/ExperienceSection';

interface ExperienceDetailData {
  role: string;
  company: string;
  location: string;
  period: string;
  overview: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
}

const experienceDetailData: Record<string, ExperienceDetailData> = {
  'drdo-rci': {
    role: 'Software Development Intern',
    company: 'DRDO — Research Centre Imarat (RCI)',
    location: 'Hyderabad, India',
    period: 'Jul 2025 – Sep 2025',
    overview: 'Worked at India\'s leading defense R&D organization, engineering C-based data acquisition systems for reliable hardware communication. Built diagnostic tools with real-time monitoring capabilities, directly contributing to defense software reliability and development efficiency.',
    responsibilities: [
      'Engineered a C-based data acquisition system interfacing with RS-422 and MIL-STD-1553 hardware protocols',
      'Developed a WinAPI-driven GUI enabling real-time hardware diagnostics with event-driven architecture',
      'Refined data synchronization mechanisms and error-handling logic for protocol reliability',
      'Supported ongoing defense software projects by debugging and improving code quality',
    ],
    achievements: [
      'Reduced communication errors by 35% through optimized hardware integration',
      'Achieved sub-second diagnostic response times with efficient event-driven architecture',
      'Enhanced system stability by refining data synchronization and error-handling logic',
      'Accelerated development cycles and reduced defect rates across defense software projects',
    ],
    technologies: ['C', 'WinAPI', 'RS-422', 'MIL-STD-1553', 'Hardware Integration', 'Data Acquisition'],
  },
  'sri-datta-freelance': {
    role: 'Freelance Web Developer',
    company: 'Sri Datta Electronics',
    location: 'Hyderabad, India',
    period: 'May 2025 – Jun 2025',
    overview: 'Built a complete marketing and product catalog website for Sri Datta Electronics, a company providing innovative telemetry solutions for defense, aerospace, and industrial sectors. The platform significantly improved their digital presence and client acquisition.',
    responsibilities: [
      'Designed and developed a product-centric marketing website with interactive catalog',
      'Integrated Firebase contact forms and Google Maps API for client communication',
      'Implemented responsive, SEO-optimized design for cross-device performance',
      'Created modern UI animations with TypeScript for polished user experience',
    ],
    achievements: [
      'Increased client leads by 35% through the interactive product catalog',
      'Achieved 95% form deliverability with Firebase integration, reducing support queries by 25%',
      'Improved mobile conversion by 20% with responsive Next.js implementation',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Google Maps API', 'SEO'],
  },
};

const ExperienceDetail = () => {
  const { id } = useParams<{ id: string }>();
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

  const otherExperiences = experiences.filter(exp => exp.id !== id);

  return (
    <PageTransition className="page-container pt-32">
      <div className="section-container mb-8">
        <FadeIn>
          <Link
            to="/#experience"
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
            Experience
          </span>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <h1 className="text-display-lg mb-4 dark:neon-text-cyan">{experience.role}</h1>
        </FadeIn>
        
        <FadeIn delay={0.3}>
          <p className="text-2xl text-muted-foreground mb-6">{experience.company}</p>
        </FadeIn>
        
        <FadeIn delay={0.4}>
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {experience.period}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {experience.location}
            </span>
          </div>
        </FadeIn>
      </section>

      <section className="section-container mb-16">
        <SlideIn direction="up">
          <GlassCardLarge>
            <h2 className="text-display-sm mb-6">Overview</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {experience.overview}
            </p>
          </GlassCardLarge>
        </SlideIn>
      </section>

      <section className="section-container mb-16">
        <div className="grid lg:grid-cols-2 gap-8">
          <SlideIn direction="left">
            <GlassCard className="h-full">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-5 h-5 dark:text-neon-cyan" />
                <h3 className="text-display-sm">Responsibilities</h3>
              </div>
              <ul className="space-y-4">
                {experience.responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-foreground dark:bg-neon-cyan mt-2 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </SlideIn>
          
          <SlideIn direction="right">
            <GlassCard variant="neon" className="h-full">
              <h3 className="text-display-sm mb-6">Key Achievements</h3>
              <ul className="space-y-4">
                {experience.achievements.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-foreground dark:bg-neon-magenta mt-2 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </SlideIn>
        </div>
      </section>

      <section className="section-container mb-24">
        <FadeIn>
          <h2 className="text-display-sm mb-8">Technologies Used</h2>
        </FadeIn>
        
        <div className="flex flex-wrap gap-4">
          {experience.technologies.map((tech, index) => (
            <FadeIn key={tech} delay={0.05 * index}>
              <span className="glass rounded-full px-6 py-3 font-display font-medium">
                {tech}
              </span>
            </FadeIn>
          ))}
        </div>
      </section>

      {otherExperiences.length > 0 && (
        <section className="section-container pb-24">
          <FadeIn>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-display-sm">More Experience</h2>
              <Link
                to="/#experience"
                className="text-muted-foreground hover:text-foreground transition-colors font-display"
              >
                View All →
              </Link>
            </div>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 gap-6">
            {otherExperiences.slice(0, 2).map((exp, index) => (
              <FadeIn key={exp.id} delay={0.1 * index}>
                <Link to={`/experience/${exp.id}`}>
                  <GlassCard className="group">
                    <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </div>
                    <h3 className="text-lg font-display font-bold mb-1 group-hover:dark:text-neon-cyan transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-muted-foreground">{exp.company}</p>
                  </GlassCard>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>
      )}
    </PageTransition>
  );
};

export default ExperienceDetail;
