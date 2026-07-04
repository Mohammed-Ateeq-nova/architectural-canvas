import { PageTransition } from '@/components/PageTransition';
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
      
      <HeroScroll />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <ResumeSection />
      <ContactSection />
      <FooterSection />
    </PageTransition>
  );
}
