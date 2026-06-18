import { useEffect } from 'react';
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

const Home = () => {
  useEffect(() => {
    document.title = "Mohammed Ateeq — Full Stack & AI Engineer";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Mohammed Ateeq — Full Stack & AI Engineer building scalable web applications, computer vision systems, and AI-driven solutions.');
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Mohammed Ateeq — Full Stack & AI Engineer');
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', 'Building scalable web applications, computer vision systems, and AI-driven solutions.');
    }
  }, []);

  return (
    <PageTransition className="page-container">
      <HeroScroll />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <ResumeSection />
      <ContactSection />
      <FooterSection />
    </PageTransition>
  );
};

export default Home;
