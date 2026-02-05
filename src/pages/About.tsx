 import { motion } from 'framer-motion';
 import { ArrowRight } from 'lucide-react';
 import { Link } from 'react-router-dom';
 import { PageTransition, FadeIn, SlideIn } from '@/components/PageTransition';
 import { GlassCard, GlassCardLarge } from '@/components/GlassCard';
 import { Scene3D } from '@/components/Scene3D';
 
 const About = () => {
   return (
     <PageTransition className="page-container pt-32">
       {/* Hero */}
       <section className="relative min-h-[70vh] flex items-center">
         <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 dark:opacity-30">
           <Scene3D 
             scale={0.6}
             position={[0, -1, 0]}
             interactive={false}
           />
         </div>
         
         <div className="section-container relative z-10">
           <div className="max-w-3xl">
             <FadeIn>
               <span className="inline-block px-4 py-2 mb-6 text-xs font-display font-medium tracking-widest uppercase glass rounded-full">
                 About
               </span>
             </FadeIn>
             
             <FadeIn delay={0.1}>
               <h1 className="text-display-lg mb-8">
                 The Architect Behind the
                 <span className="block dark:neon-text-cyan">Digital Experiences</span>
               </h1>
             </FadeIn>
             
             <FadeIn delay={0.2}>
               <p className="text-xl text-muted-foreground leading-relaxed">
                 Add your bio and personal story here. This section is designed to 
                 showcase your journey, philosophy, and the passion that drives 
                 your creative engineering work.
               </p>
             </FadeIn>
           </div>
         </div>
       </section>
 
       {/* Identity Grid */}
       <section className="relative py-24">
         <div className="section-container">
           <div className="grid lg:grid-cols-3 gap-6">
             <SlideIn direction="up" delay={0.1} className="lg:col-span-2">
               <GlassCardLarge className="h-full">
                 <h2 className="text-display-sm mb-6">Philosophy</h2>
                 <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                   Your design philosophy and approach goes here. Describe how you 
                   think about problems, your creative process, and what makes 
                   your work unique.
                 </p>
                 <p className="text-lg text-muted-foreground leading-relaxed">
                   This is placeholder text - populate with your actual content 
                   from your resume or personal narrative.
                 </p>
               </GlassCardLarge>
             </SlideIn>
             
             <SlideIn direction="up" delay={0.2}>
               <GlassCard variant="neon" className="h-full">
                 <h3 className="text-display-sm mb-6">Core Values</h3>
                 <ul className="space-y-4">
                   {['Innovation', 'Craftsmanship', 'Collaboration', 'Impact'].map((value, index) => (
                     <motion.li
                       key={value}
                       initial={{ opacity: 0, x: -20 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ delay: 0.3 + index * 0.1 }}
                       className="flex items-center gap-3 text-lg"
                     >
                       <span className="w-2 h-2 rounded-full bg-foreground dark:bg-neon-cyan" />
                       {value}
                     </motion.li>
                   ))}
                 </ul>
               </GlassCard>
             </SlideIn>
           </div>
         </div>
       </section>
 
       {/* Skills Section */}
       <section className="relative py-24 bg-secondary/30">
         <div className="section-container">
           <FadeIn>
             <h2 className="text-display-md text-center mb-16">
               Technical <span className="dark:neon-text-magenta">Expertise</span>
             </h2>
           </FadeIn>
           
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
             {[
               { title: 'Frontend', skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'] },
               { title: 'Backend', skills: ['Node.js', 'Python', 'PostgreSQL', 'GraphQL'] },
               { title: '3D & Motion', skills: ['Three.js', 'GSAP', 'Framer Motion', 'WebGL'] },
               { title: 'Tools', skills: ['Git', 'Docker', 'Figma', 'AWS'] },
             ].map((category, index) => (
               <FadeIn key={category.title} delay={0.1 * index}>
                 <GlassCard>
                   <h3 className="text-lg font-display font-semibold mb-4 dark:text-neon-cyan">
                     {category.title}
                   </h3>
                   <ul className="space-y-2">
                     {category.skills.map((skill) => (
                       <li key={skill} className="text-muted-foreground">
                         {skill}
                       </li>
                     ))}
                   </ul>
                 </GlassCard>
               </FadeIn>
             ))}
           </div>
           
           <FadeIn delay={0.5}>
             <p className="text-center text-muted-foreground mt-8">
               Update these skills to match your actual expertise from your resume.
             </p>
           </FadeIn>
         </div>
       </section>
 
       {/* CTA */}
       <section className="relative py-24">
         <div className="section-container">
           <FadeIn>
             <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
               <Link
                 to="/experience"
                 className="glass rounded-full px-8 py-4 font-display font-medium inline-flex items-center gap-2 group"
               >
                 View Experience
                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </Link>
               <Link
                 to="/resume"
                 className="border-2 border-foreground dark:border-neon-cyan rounded-full px-8 py-4 font-display font-medium inline-flex items-center gap-2 hover:bg-foreground hover:text-background dark:hover:bg-neon-cyan dark:hover:text-background transition-colors"
               >
                 View Resume
               </Link>
             </div>
           </FadeIn>
         </div>
       </section>
     </PageTransition>
   );
 };
 
 export default About;