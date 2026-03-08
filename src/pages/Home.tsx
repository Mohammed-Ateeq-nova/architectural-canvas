import { PageTransition } from '@/components/PageTransition';
import {
  HeroSection,
  AboutSection,
  ProjectsSection,
  ExperienceSection,
  ResumeSection,
  ContactSection,
  FooterSection,
} from '@/components/sections';

const Home = () => {
  return (
    <PageTransition className="page-container">
      <HeroSection />
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
