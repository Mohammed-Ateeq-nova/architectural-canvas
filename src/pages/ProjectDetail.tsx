 import { useParams, Link } from 'react-router-dom';
 import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
 import { PageTransition, FadeIn, SlideIn } from '@/components/PageTransition';
 import { GlassCard, GlassCardLarge } from '@/components/GlassCard';
 import { Scene3D } from '@/components/Scene3D';
 
 // Placeholder project data
 const projectData: Record<string, {
   title: string;
   category: string;
   overview: string;
   problem: string;
   solution: string;
   tech: string[];
   liveUrl?: string;
   githubUrl?: string;
 }> = {
   'project-1': {
     title: 'Project One',
     category: 'Web Application',
     overview: 'A comprehensive overview of what this project is about. Replace with your actual content.',
     problem: 'Describe the problem this project solves. What challenge were you addressing?',
     solution: 'Explain your solution and approach. How did you solve the problem?',
     tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
     liveUrl: '#',
     githubUrl: '#',
   },
   'project-2': {
     title: 'Project Two',
     category: 'Mobile App',
     overview: 'A comprehensive overview of what this project is about. Replace with your actual content.',
     problem: 'Describe the problem this project solves.',
     solution: 'Explain your solution and approach.',
     tech: ['React Native', 'Firebase', 'Redux'],
     liveUrl: '#',
     githubUrl: '#',
   },
   'project-3': {
     title: 'Project Three',
     category: '3D Experience',
     overview: 'An immersive 3D experience showcasing creative engineering.',
     problem: 'How to create engaging digital experiences.',
     solution: 'Leveraging WebGL and modern 3D frameworks.',
     tech: ['Three.js', 'WebGL', 'GSAP', 'React'],
   },
   'project-4': {
     title: 'Project Four',
     category: 'Design System',
     overview: 'A comprehensive design system for consistent UI/UX.',
     problem: 'Maintaining design consistency across products.',
     solution: 'Building a scalable component library.',
     tech: ['Figma', 'React', 'Storybook', 'TypeScript'],
   },
 };
 
 const ProjectDetail = () => {
   const { id } = useParams<{ id: string }>();
   const project = projectData[id || ''] || {
     title: 'Project Not Found',
     category: '',
     overview: 'This project does not exist.',
     problem: '',
     solution: '',
     tech: [],
   };
 
   return (
     <PageTransition className="page-container pt-32">
       {/* Back Navigation */}
       <div className="section-container mb-8">
         <FadeIn>
           <Link
             to="/projects"
             className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-display"
           >
             <ArrowLeft className="w-4 h-4" />
             Back to Projects
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
 
       {/* Problem & Solution */}
       <section className="section-container mb-24">
         <div className="grid lg:grid-cols-2 gap-8">
           <SlideIn direction="left">
             <GlassCard className="h-full">
               <h2 className="text-display-sm mb-4">The Problem</h2>
               <p className="text-lg text-muted-foreground leading-relaxed">
                 {project.problem}
               </p>
             </GlassCard>
           </SlideIn>
           
           <SlideIn direction="right" delay={0.1}>
             <GlassCard className="h-full" variant="neon">
               <h2 className="text-display-sm mb-4">The Solution</h2>
               <p className="text-lg text-muted-foreground leading-relaxed">
                 {project.solution}
               </p>
             </GlassCard>
           </SlideIn>
         </div>
       </section>
 
       {/* Tech Stack */}
       <section className="section-container mb-24">
         <FadeIn>
           <h2 className="text-display-sm mb-8">Technology Stack</h2>
         </FadeIn>
         
         <div className="flex flex-wrap gap-4">
           {project.tech.map((tech, index) => (
             <FadeIn key={tech} delay={0.05 * index}>
               <span className="glass rounded-full px-6 py-3 font-display font-medium">
                 {tech}
               </span>
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
               to="/projects"
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