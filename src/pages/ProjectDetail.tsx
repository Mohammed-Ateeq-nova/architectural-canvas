import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { PageTransition, FadeIn, SlideIn } from '@/components/PageTransition';
import { GlassCard, GlassCardLarge } from '@/components/GlassCard';
import { Scene3D } from '@/components/Scene3D';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
 
// Project data with expanded documentation and tech usage
interface TechItem {
  name: string;
  usage: string;
}

interface ProjectData {
  title: string;
  category: string;
  overview: string;
  documentation: {
    context: string;
    approach: string;
    implementation: string;
    architecture?: string;
  };
  tech: TechItem[];
  liveUrl?: string;
  githubUrl?: string;
}

const projectData: Record<string, ProjectData> = {
  'project-1': {
    title: 'Project One',
    category: 'Web Application',
    overview: 'A comprehensive overview of what this project is about. Replace with your actual content.',
    documentation: {
      context: 'Describe the problem context here. What challenge were you addressing? What was the initial state before this project?',
      approach: 'Explain your solution approach. What methodology or strategy did you employ to solve the problem?',
      implementation: 'Detail the key implementation aspects. What were the critical technical decisions made during development?',
      architecture: 'Describe the system architecture if relevant. How do the components interact?',
    },
    tech: [
      { name: 'React', usage: 'Built the component-based UI architecture with hooks for state management' },
      { name: 'TypeScript', usage: 'Enforced type safety across the codebase reducing runtime errors' },
      { name: 'Node.js', usage: 'Powered the REST API backend handling authentication and data operations' },
      { name: 'PostgreSQL', usage: 'Stored relational data with complex queries for analytics' },
    ],
    liveUrl: '#',
    githubUrl: '#',
  },
  'project-2': {
    title: 'Project Two',
    category: 'Mobile App',
    overview: 'A comprehensive overview of what this project is about. Replace with your actual content.',
    documentation: {
      context: 'Describe the mobile problem space. What user needs were unmet?',
      approach: 'Explain how the app addresses these needs through its design and functionality.',
      implementation: 'Detail the key implementation aspects for mobile-specific challenges.',
    },
    tech: [
      { name: 'React Native', usage: 'Enabled cross-platform deployment from a single codebase' },
      { name: 'Firebase', usage: 'Provided real-time database sync and authentication services' },
      { name: 'Redux', usage: 'Managed complex app state across navigation stacks' },
    ],
    liveUrl: '#',
    githubUrl: '#',
  },
  'project-3': {
    title: 'Project Three',
    category: '3D Experience',
    overview: 'An immersive 3D experience showcasing creative engineering.',
    documentation: {
      context: 'How to create engaging, memorable digital experiences that stand out.',
      approach: 'Leveraging WebGL and modern 3D frameworks to build performant, interactive visuals.',
      implementation: 'Custom shader development and optimized geometry for smooth 60fps rendering.',
    },
    tech: [
      { name: 'Three.js', usage: 'Rendered the 3D scene with custom materials and lighting' },
      { name: 'WebGL', usage: 'Direct GPU access for performant real-time graphics' },
      { name: 'GSAP', usage: 'Orchestrated complex animation timelines and scroll triggers' },
      { name: 'React', usage: 'Wrapped 3D canvas in a reactive component architecture' },
    ],
  },
  'project-4': {
    title: 'Project Four',
    category: 'Design System',
    overview: 'A comprehensive design system for consistent UI/UX.',
    documentation: {
      context: 'Maintaining design consistency across multiple products and teams.',
      approach: 'Building a scalable, documented component library with clear design tokens.',
      implementation: 'Atomic design principles with comprehensive Storybook documentation.',
      architecture: 'Token-based theming system enabling brand customization.',
    },
    tech: [
      { name: 'Figma', usage: 'Created the design source of truth with component variants' },
      { name: 'React', usage: 'Implemented the component library with compound patterns' },
      { name: 'Storybook', usage: 'Documented all components with interactive examples' },
      { name: 'TypeScript', usage: 'Provided strict prop typing and autocomplete support' },
    ],
  },
};
 
const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projectData[id || ''] || {
    title: 'Project Not Found',
    category: '',
    overview: 'This project does not exist.',
    documentation: {
      context: '',
      approach: '',
      implementation: '',
    },
    tech: [],
  };
 
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
             {project.category}
           </span>
         </FadeIn>
         
         <FadeIn delay={0.2}>
           <h1 className="text-display-lg mb-6 dark:neon-text-cyan">{project.title}</h1>
         </FadeIn>
         
         <FadeIn delay={0.3}>
           <p className="text-xl text-muted-foreground max-w-3xl">
             {project.overview}
           </p>
         </FadeIn>
         
         {/* Action Buttons */}
         <FadeIn delay={0.4}>
           <div className="flex flex-wrap gap-4 mt-8">
             {project.liveUrl && (
               <a
                 href={project.liveUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="glass rounded-full px-6 py-3 font-display font-medium inline-flex items-center gap-2 group hover:scale-105 transition-transform"
               >
                 Live Demo
                 <ExternalLink className="w-4 h-4" />
               </a>
             )}
             {project.githubUrl && (
               <a
                 href={project.githubUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="border-2 border-foreground dark:border-neon-cyan rounded-full px-6 py-3 font-display font-medium inline-flex items-center gap-2 hover:bg-foreground hover:text-background dark:hover:bg-neon-cyan transition-colors"
               >
                 <Github className="w-4 h-4" />
                 View Code
               </a>
             )}
           </div>
         </FadeIn>
       </section>
 
       {/* Media Section - Device Mockup */}
       <section className="section-container mb-24">
         <SlideIn direction="up">
           <GlassCardLarge className="overflow-hidden">
             <div className="aspect-video relative rounded-xl overflow-hidden">
               {/* 3D Device Frame - can be enhanced with actual device mockup */}
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="relative w-full max-w-2xl">
                   {/* Phone/Device Frame */}
                   <div className="glass rounded-3xl p-4 mx-auto max-w-xs">
                     <div className="bg-muted rounded-2xl aspect-[9/16] flex items-center justify-center">
                       <span className="text-muted-foreground font-display text-sm">
                         Add Video/Demo Here
                       </span>
                     </div>
                   </div>
                 </div>
               </div>
               
               {/* 3D Background */}
               <div className="absolute inset-0 -z-10 opacity-30">
                 <Scene3D scale={0.4} position={[3, -1, 0]} interactive={false} />
               </div>
             </div>
           </GlassCardLarge>
         </SlideIn>
       </section>
 
        {/* Documentation Section */}
        <section className="section-container mb-24">
          <FadeIn>
            <h2 className="text-display-sm mb-8">Documentation</h2>
          </FadeIn>
          
          <SlideIn direction="up">
            <GlassCard hover={false} className="space-y-8">
              {/* Context */}
              <div>
                <h3 className="font-display font-semibold text-lg mb-3 dark:text-neon-cyan">
                  Context
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.documentation.context}
                </p>
              </div>
              
              {/* Approach */}
              <div>
                <h3 className="font-display font-semibold text-lg mb-3 dark:text-neon-cyan">
                  Approach
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.documentation.approach}
                </p>
              </div>
              
              {/* Implementation */}
              <div>
                <h3 className="font-display font-semibold text-lg mb-3 dark:text-neon-cyan">
                  Implementation
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.documentation.implementation}
                </p>
              </div>
              
              {/* Architecture (optional) */}
              {project.documentation.architecture && (
                <div>
                  <h3 className="font-display font-semibold text-lg mb-3 dark:text-neon-cyan">
                    Architecture
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.documentation.architecture}
                  </p>
                </div>
              )}
            </GlassCard>
          </SlideIn>
        </section>
 
        {/* Tech Stack with Hover */}
        <section className="section-container mb-24">
          <FadeIn>
            <h2 className="text-display-sm mb-8">Technology Stack</h2>
          </FadeIn>
          
          <div className="flex flex-wrap gap-4">
            {project.tech.map((tech, index) => (
              <FadeIn key={tech.name} delay={0.05 * index}>
                <HoverCard openDelay={200} closeDelay={100}>
                  <HoverCardTrigger asChild>
                    <span className="glass rounded-full px-6 py-3 font-display font-medium cursor-pointer transition-all duration-300 hover:scale-105 dark:hover:shadow-glow-cyan inline-block">
                      {tech.name}
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent 
                    className="glass-heavy w-72 border-0 p-4"
                    sideOffset={8}
                  >
                    <div className="space-y-2">
                      <h4 className="font-display font-semibold dark:text-neon-cyan">
                        {tech.name}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {tech.usage}
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </FadeIn>
            ))}
          </div>
        </section>
 
        {/* More Projects */}
        <section className="section-container pb-24">
        <FadeIn>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-display-sm">More Projects</h2>
            <Link
              to="/#projects"
              className="text-muted-foreground hover:text-foreground transition-colors font-display"
            >
              View All →
            </Link>
          </div>
        </FadeIn>
          
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(projectData)
              .filter(([key]) => key !== id)
              .slice(0, 3)
              .map(([key, proj], index) => (
                <FadeIn key={key} delay={0.1 * index}>
                  <Link to={`/projects/${key}`}>
                    <GlassCard className="group">
                      <div className="aspect-[4/3] bg-muted rounded-lg mb-4" />
                      <span className="text-xs font-display uppercase tracking-widest text-muted-foreground mb-1 block">
                        {proj.category}
                      </span>
                      <h3 className="font-display font-semibold group-hover:dark:text-neon-cyan transition-colors">
                        {proj.title}
                      </h3>
                    </GlassCard>
                  </Link>
                </FadeIn>
              ))}
          </div>
        </section>
     </PageTransition>
   );
 };
 
 export default ProjectDetail;