import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Briefcase } from 'lucide-react';
import { PageTransition, FadeIn, SlideIn } from '@/components/PageTransition';
import { GlassCard, GlassCardLarge } from '@/components/GlassCard';
import { experiences } from '@/components/sections/ExperienceSection';

// Extended experience data for detail pages
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
  'exp-1': {
    role: 'Senior Software Engineer',
    company: 'Company Name',
    location: 'City, Country',
    period: '2022 - Present',
    overview: 'Add a comprehensive overview of your role and responsibilities. This is placeholder content - replace with your actual experience.',
    responsibilities: [
      'Led development of key features',
      'Mentored junior developers',
      'Collaborated with cross-functional teams',
      'Implemented best practices and code standards',
    ],
    achievements: [
      'Achievement 1 - Add your specific accomplishment',
      'Achievement 2 - Add your specific accomplishment',
      'Achievement 3 - Add your specific accomplishment',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
  },
  'exp-2': {
    role: 'Software Engineer',
    company: 'Previous Company',
    location: 'City, Country',
    period: '2020 - 2022',
    overview: 'Add a comprehensive overview of your role and responsibilities. This is placeholder content.',
    responsibilities: [
      'Developed and maintained web applications',
      'Participated in code reviews',
      'Worked on API development',
    ],
    achievements: [
      'Achievement 1 - Add your specific accomplishment',
      'Achievement 2 - Add your specific accomplishment',
    ],
    technologies: ['React', 'JavaScript', 'Node.js', 'MongoDB'],
  },
  'exp-3': {
    role: 'Junior Developer',
    company: 'First Company',
    location: 'City, Country',
    period: '2018 - 2020',
    overview: 'Add a comprehensive overview of your role and responsibilities. This is placeholder content.',
    responsibilities: [
      'Assisted in frontend development',
      'Fixed bugs and improved code quality',
      'Learned from senior developers',
    ],
    achievements: [
      'Achievement 1 - Add your specific accomplishment',
      'Achievement 2 - Add your specific accomplishment',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'React'],
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

  // Get other experiences for "More Experience" section
  const otherExperiences = experiences.filter(exp => exp.id !== id);

  return (
    <PageTransition className="page-container pt-32">
      {/* Back Navigation */}
      <div className="section-container mb-8">
        <FadeIn>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-display"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </FadeIn>
      </div>

      {/* Header */}
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

      {/* Overview */}
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

      {/* Responsibilities & Achievements */}
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

      {/* Technologies */}
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

      {/* More Experience */}
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
