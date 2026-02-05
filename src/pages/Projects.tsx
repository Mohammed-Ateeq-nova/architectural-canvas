 import { motion } from 'framer-motion';
 import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
 import { Link } from 'react-router-dom';
 import { PageTransition, FadeIn, SlideIn } from '@/components/PageTransition';
 import { GlassCard } from '@/components/GlassCard';
 
 // Placeholder projects - to be replaced with resume content
 const projects = [
   {
     id: 'project-1',
     title: 'Project One',
     category: 'Web Application',
     description: 'Add your project description here. This is placeholder content.',
     tech: ['React', 'TypeScript', 'Node.js'],
     featured: true,
   },
   {
     id: 'project-2',
     title: 'Project Two',
     category: 'Mobile App',
     description: 'Add your project description here. This is placeholder content.',
     tech: ['React Native', 'Firebase'],
     featured: true,
   },
   {
     id: 'project-3',
     title: 'Project Three',
     category: '3D Experience',
     description: 'Add your project description here. This is placeholder content.',
     tech: ['Three.js', 'WebGL', 'GSAP'],
     featured: false,
   },
   {
     id: 'project-4',
     title: 'Project Four',
     category: 'Design System',
     description: 'Add your project description here. This is placeholder content.',
     tech: ['Figma', 'React', 'Storybook'],
     featured: false,
   },
 ];
 
 const Projects = () => {
   return (
     <PageTransition className="page-container pt-32">
       {/* Header */}
       <section className="section-container mb-16">
         <FadeIn>
           <span className="inline-block px-4 py-2 mb-6 text-xs font-display font-medium tracking-widest uppercase glass rounded-full">
             Projects
           </span>
         </FadeIn>
         
         <FadeIn delay={0.1}>
           <h1 className="text-display-lg mb-6">
             Selected <span className="dark:neon-text-cyan">Work</span>
           </h1>
         </FadeIn>
         
         <FadeIn delay={0.2}>
           <p className="text-xl text-muted-foreground max-w-2xl">
             A curated collection of projects showcasing problem-solving, 
             technical excellence, and creative execution.
           </p>
         </FadeIn>
       </section>
 
       {/* Featured Projects */}
       <section className="section-container mb-24">
         <FadeIn>
           <h2 className="text-display-sm mb-8">Featured</h2>
         </FadeIn>
         
         <div className="grid lg:grid-cols-2 gap-8">
           {projects.filter(p => p.featured).map((project, index) => (
             <SlideIn key={project.id} direction={index % 2 === 0 ? 'left' : 'right'} delay={0.1 * index}>
               <Link to={`/projects/${project.id}`}>
                 <GlassCard className="group h-full" variant="neon">
                   {/* Project Image Placeholder */}
                   <div className="aspect-video bg-muted rounded-xl mb-6 overflow-hidden relative">
                     <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 group-hover:scale-105 transition-transform duration-700" />
                     <div className="absolute inset-0 flex items-center justify-center">
                       <span className="text-muted-foreground font-display">Add Project Image</span>
                     </div>
                   </div>
                   
                   <span className="text-xs font-display uppercase tracking-widest text-muted-foreground mb-2 block">
                     {project.category}
                   </span>
                   
                   <div className="flex items-start justify-between gap-4 mb-4">
                     <h3 className="text-2xl font-display font-bold group-hover:dark:text-neon-cyan transition-colors">
                       {project.title}
                     </h3>
                     <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                   </div>
                   
                   <p className="text-muted-foreground mb-6">
                     {project.description}
                   </p>
                   
                   <div className="flex flex-wrap gap-2">
                     {project.tech.map((tech) => (
                       <span
                         key={tech}
                         className="px-3 py-1 text-xs font-display bg-secondary rounded-full"
                       >
                         {tech}
                       </span>
                     ))}
                   </div>
                 </GlassCard>
               </Link>
             </SlideIn>
           ))}
         </div>
       </section>
 
       {/* All Projects Grid */}
       <section className="section-container pb-24">
         <FadeIn>
           <h2 className="text-display-sm mb-8">All Projects</h2>
         </FadeIn>
         
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           {projects.map((project, index) => (
             <FadeIn key={project.id} delay={0.05 * index}>
               <Link to={`/projects/${project.id}`}>
                 <GlassCard className="group h-full">
                   <div className="aspect-[4/3] bg-muted rounded-lg mb-4 overflow-hidden">
                     <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                       <span className="text-sm text-muted-foreground font-display">Image</span>
                     </div>
                   </div>
                   
                   <span className="text-xs font-display uppercase tracking-widest text-muted-foreground mb-1 block">
                     {project.category}
                   </span>
                   
                   <h3 className="text-lg font-display font-semibold mb-2 group-hover:dark:text-neon-cyan transition-colors">
                     {project.title}
                   </h3>
                   
                   <p className="text-sm text-muted-foreground line-clamp-2">
                     {project.description}
                   </p>
                 </GlassCard>
               </Link>
             </FadeIn>
           ))}
         </div>
       </section>
 
       {/* Note */}
       <section className="section-container pb-24">
         <FadeIn>
           <GlassCard className="text-center py-12">
             <p className="text-muted-foreground">
               <strong>Note:</strong> Replace these placeholder projects with your actual work from your resume.
               Each project will have its own dedicated page with detailed case studies.
             </p>
           </GlassCard>
         </FadeIn>
       </section>
     </PageTransition>
   );
 };
 
 export default Projects;