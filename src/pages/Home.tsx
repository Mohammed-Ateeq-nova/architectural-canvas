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
