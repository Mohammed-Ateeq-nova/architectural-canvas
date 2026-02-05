 import { motion } from 'framer-motion';
 import { ArrowRight, Calendar, MapPin } from 'lucide-react';
 import { Link } from 'react-router-dom';
 import { PageTransition, FadeIn, SlideIn } from '@/components/PageTransition';
 import { GlassCard } from '@/components/GlassCard';
 
 // Placeholder experience data - replace with resume content
 const experiences = [
   {
     id: 1,
     role: 'Senior Software Engineer',
     company: 'Company Name',
     location: 'City, Country',
     period: '2022 - Present',
     description: 'Add your role description and key achievements here.',
     highlights: ['Achievement 1', 'Achievement 2', 'Achievement 3'],
   },
   {
     id: 2,
     role: 'Software Engineer',
     company: 'Previous Company',
     location: 'City, Country',
     period: '2020 - 2022',
     description: 'Add your role description and key achievements here.',
     highlights: ['Achievement 1', 'Achievement 2'],
   },
   {
     id: 3,
     role: 'Junior Developer',
     company: 'First Company',
     location: 'City, Country',
     period: '2018 - 2020',
     description: 'Add your role description and key achievements here.',
     highlights: ['Achievement 1', 'Achievement 2'],
   },
 ];
 
 const education = [
   {
     degree: 'Bachelor of Science in Computer Science',
     institution: 'University Name',
     year: '2018',
   },
 ];
 
 const Experience = () => {
   return (
     <PageTransition className="page-container pt-32">
       {/* Header */}
       <section className="section-container mb-16">
         <FadeIn>
           <span className="inline-block px-4 py-2 mb-6 text-xs font-display font-medium tracking-widest uppercase glass rounded-full">
             Experience
           </span>
         </FadeIn>
         
         <FadeIn delay={0.1}>
           <h1 className="text-display-lg mb-6">
             Professional <span className="dark:neon-text-cyan">Journey</span>
           </h1>
         </FadeIn>
         
         <FadeIn delay={0.2}>
           <p className="text-xl text-muted-foreground max-w-2xl">
             A timeline of growth, learning, and impactful contributions 
             across different roles and organizations.
           </p>
         </FadeIn>
       </section>
 
       {/* Timeline */}
       <section className="section-container mb-24">
         <div className="relative">
           {/* Timeline Line */}
           <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
           
           {experiences.map((exp, index) => (
             <SlideIn
               key={exp.id}
               direction={index % 2 === 0 ? 'left' : 'right'}
               delay={0.1 * index}
             >
               <div className={`relative flex items-start gap-8 mb-12 ${
                 index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
               }`}>
                 {/* Timeline Dot */}
                 <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-foreground dark:bg-neon-cyan -translate-x-1/2 mt-8 z-10" />
                 
                 {/* Content */}
                 <div className={`ml-8 md:ml-0 md:w-1/2 ${
                   index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'
                 }`}>
                   <GlassCard variant={index === 0 ? 'neon' : 'default'}>
                     <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
                       <span className="flex items-center gap-1">
                         <Calendar className="w-4 h-4" />
                         {exp.period}
                       </span>
                       <span className="flex items-center gap-1">
                         <MapPin className="w-4 h-4" />
                         {exp.location}
                       </span>
                     </div>
                     
                     <h3 className="text-xl font-display font-bold mb-1">{exp.role}</h3>
                     <p className="text-lg text-muted-foreground mb-4">{exp.company}</p>
                     
                     <p className="text-muted-foreground mb-4">{exp.description}</p>
                     
                     <ul className="space-y-2">
                       {exp.highlights.map((highlight, i) => (
                         <li key={i} className="flex items-start gap-2">
                           <span className="w-1.5 h-1.5 rounded-full bg-foreground dark:bg-neon-cyan mt-2 shrink-0" />
                           <span className="text-sm text-muted-foreground">{highlight}</span>
                         </li>
                       ))}
                     </ul>
                   </GlassCard>
                 </div>
               </div>
             </SlideIn>
           ))}
         </div>
       </section>
 
       {/* Education */}
       <section className="section-container mb-24">
         <FadeIn>
           <h2 className="text-display-sm mb-8">Education</h2>
         </FadeIn>
         
         <div className="grid md:grid-cols-2 gap-6">
           {education.map((edu, index) => (
             <FadeIn key={index} delay={0.1 * index}>
               <GlassCard>
                 <span className="text-sm text-muted-foreground mb-2 block">{edu.year}</span>
                 <h3 className="text-lg font-display font-semibold mb-1">{edu.degree}</h3>
                 <p className="text-muted-foreground">{edu.institution}</p>
               </GlassCard>
             </FadeIn>
           ))}
         </div>
       </section>
 
       {/* CTA */}
       <section className="section-container pb-24">
         <FadeIn>
           <GlassCard className="text-center py-12">
             <h3 className="text-display-sm mb-4">Want the full story?</h3>
             <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
               Download my complete resume or get in touch to discuss opportunities.
             </p>
             <div className="flex flex-wrap justify-center gap-4">
               <Link
                 to="/resume"
                 className="glass rounded-full px-6 py-3 font-display font-medium inline-flex items-center gap-2"
               >
                 View Resume
                 <ArrowRight className="w-4 h-4" />
               </Link>
               <Link
                 to="/contact"
                 className="border-2 border-foreground dark:border-neon-cyan rounded-full px-6 py-3 font-display font-medium hover:bg-foreground hover:text-background dark:hover:bg-neon-cyan transition-colors"
               >
                 Contact Me
               </Link>
             </div>
           </GlassCard>
         </FadeIn>
       </section>
     </PageTransition>
   );
 };
 
 export default Experience;