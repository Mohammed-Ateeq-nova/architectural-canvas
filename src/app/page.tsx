import { PageTransition } from '@/components/PageTransition';
import { SectionWrapper } from '@/components/SectionWrapper';
import {
  HeroScroll,
  AboutSection,
  ProjectsSection,
  ExperienceSection,
  ResumeSection,
  ContactSection,
  FooterSection,
} from '@/components/sections';

export default function HomePage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mohammed Ateeq",
    "url": "https://www.mohdateeqnova.in",
    "jobTitle": "Full Stack & AI Engineer",
    "knowsAbout": [
      "Full Stack Development",
      "Frontend Development",
      "Machine Learning",
      "Deep Learning",
      "Artificial Intelligence",
      "Computer Vision",
      "React",
      "Next.js",
      "TypeScript",
      "Python",
      "UI UX Design"
    ],
    "sameAs": [
      "https://github.com/Mohammed-Ateeq-nova",
      "https://www.linkedin.com/in/mohammed-ateeq/"
    ]
  };

  return (
    <PageTransition className="page-container">
      {/* Homepage Person JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      
      {/* Critical Above-The-Fold Section: Immediate Rendering */}
      <HeroScroll />
      
      {/* Primary Content Sections */}
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      
      {/* Below-The-Fold Sections: Viewport-Gated Mount */}
      <SectionWrapper minHeight="400px" rootMargin="350px">
        <ResumeSection />
      </SectionWrapper>
      
      <SectionWrapper minHeight="400px" rootMargin="350px">
        <ContactSection />
      </SectionWrapper>
      
      <SectionWrapper minHeight="200px" rootMargin="350px">
        <FooterSection />
      </SectionWrapper>
    </PageTransition>
  );
}
