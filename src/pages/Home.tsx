import { PageTransition } from '@/components/PageTransition';
import { ScrollEngine } from '@/components/ScrollEngine';
import { PersistentCanvas } from '@/components/PersistentCanvas';
import { VelocityBlur } from '@/components/VelocityBlur';
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
    <ScrollEngine>
      {/* Persistent evolving background canvas */}
      <PersistentCanvas />

      <VelocityBlur>
        <PageTransition className="page-container relative z-[1]">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ExperienceSection />
          <ResumeSection />
          <ContactSection />
          <FooterSection />
        </PageTransition>
      </VelocityBlur>
    </ScrollEngine>
  );
};

export default Home;
