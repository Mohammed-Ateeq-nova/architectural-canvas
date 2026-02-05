 import { motion } from 'framer-motion';
 import { ArrowDown, ArrowRight } from 'lucide-react';
 import { Link } from 'react-router-dom';
 import { PageTransition, FadeIn, SlideIn } from '@/components/PageTransition';
 import { Scene3D } from '@/components/Scene3D';
 import { UnicornScene } from '@/components/UnicornScene';
 import { GlassCard } from '@/components/GlassCard';
 
 const Home = () => {
   return (
     <PageTransition className="page-container">
       {/* Hero Section */}
       <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
         {/* 3D Background */}
         <div className="absolute inset-0 opacity-30 dark:opacity-40">
           <Scene3D 
             scale={0.8}
             position={[0, -2, -5]}
             interactive={false}
           />
         </div>
         
         {/* Content */}
         <div className="relative z-10 section-container">
           <div className="max-w-5xl mx-auto text-center">
             <FadeIn delay={0.2}>
               <span className="inline-block px-4 py-2 mb-8 text-sm font-display font-medium tracking-widest uppercase glass rounded-full">
                 Creative Engineer & Digital Architect
               </span>
             </FadeIn>
             
             <FadeIn delay={0.4}>
               <h1 className="text-display-xl mb-6">
                 <span className="block">Building</span>
                 <span className="block dark:neon-text-cyan">
                   Digital Worlds
                 </span>
               </h1>
             </FadeIn>
             
             <FadeIn delay={0.6}>
               <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 font-body">
                 A platform showcasing the intersection of code, creativity, and experiential design.
               </p>
             </FadeIn>
             
             <FadeIn delay={0.8}>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <Link
                   to="/projects"
                   className="glass rounded-full px-8 py-4 font-display font-medium inline-flex items-center justify-center gap-2 group hover:scale-105 transition-transform"
                 >
                   Explore Projects
                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </Link>
                 <Link
                   to="/contact"
                   className="border-2 border-foreground dark:border-neon-cyan rounded-full px-8 py-4 font-display font-medium inline-flex items-center justify-center gap-2 hover:bg-foreground hover:text-background dark:hover:bg-neon-cyan dark:hover:text-background transition-colors"
                 >
                   Get in Touch
                 </Link>
               </div>
             </FadeIn>
           </div>
         </div>
         
         {/* Scroll Indicator */}
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1.5 }}
           className="absolute bottom-12 left-1/2 -translate-x-1/2"
         >
           <motion.div
             animate={{ y: [0, 10, 0] }}
             transition={{ repeat: Infinity, duration: 2 }}
             className="flex flex-col items-center gap-2 text-muted-foreground"
           >
             <span className="text-xs font-display uppercase tracking-widest">Scroll</span>
             <ArrowDown className="w-4 h-4" />
           </motion.div>
         </motion.div>
       </section>
 
       {/* Embedded Unicorn Scene Section */}
       <section className="relative py-32 overflow-hidden">
         <div className="section-container">
           <SlideIn direction="left" delay={0.2}>
             <h2 className="text-display-md mb-4">
               Immersive <span className="dark:neon-text-magenta">Experiences</span>
             </h2>
             <p className="text-lg text-muted-foreground max-w-xl mb-12">
               Where technology meets artistry. Every project is a new world to explore.
             </p>
           </SlideIn>
           
           <div className="grid lg:grid-cols-2 gap-8 items-center">
             <SlideIn direction="left" delay={0.3}>
               <GlassCard className="aspect-video" hover={false}>
                 <UnicornScene 
                   projectId="7zy6yQ45eJ7kBZoyipZ1"
                   className="w-full h-full rounded-xl overflow-hidden"
                 />
               </GlassCard>
             </SlideIn>
             
             <SlideIn direction="right" delay={0.4}>
               <div className="space-y-6">
                 <div className="glass rounded-xl p-6">
                   <h3 className="text-display-sm mb-2">Interactive Design</h3>
                   <p className="text-muted-foreground">
                     Creating experiences that respond and evolve with user interaction.
                   </p>
                 </div>
                 <div className="glass rounded-xl p-6">
                   <h3 className="text-display-sm mb-2">Technical Excellence</h3>
                   <p className="text-muted-foreground">
                     Built on solid foundations with cutting-edge technologies.
                   </p>
                 </div>
                 <div className="glass rounded-xl p-6">
                   <h3 className="text-display-sm mb-2">Creative Vision</h3>
                   <p className="text-muted-foreground">
                     Every pixel, every interaction, designed with purpose.
                   </p>
                 </div>
               </div>
             </SlideIn>
           </div>
         </div>
       </section>
 
       {/* Featured Section */}
       <section className="relative py-32 broken-grid">
         <div className="section-container">
           <div className="text-center mb-16">
             <FadeIn>
               <h2 className="text-display-lg mb-4">Featured Work</h2>
               <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                 A selection of projects that push boundaries and define new experiences.
               </p>
             </FadeIn>
           </div>
           
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {[1, 2, 3].map((_, index) => (
               <FadeIn key={index} delay={0.1 * index}>
                 <Link to="/projects">
                   <GlassCard className="group">
                     <div className="aspect-[4/3] bg-muted rounded-lg mb-4 overflow-hidden">
                       <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 group-hover:scale-105 transition-transform duration-500" />
                     </div>
                     <span className="text-xs font-display uppercase tracking-widest text-muted-foreground mb-2 block">
                       Coming Soon
                     </span>
                     <h3 className="text-xl font-display font-semibold mb-2">
                       Project {index + 1}
                     </h3>
                     <p className="text-sm text-muted-foreground">
                       Add your resume content to populate this section.
                     </p>
                   </GlassCard>
                 </Link>
               </FadeIn>
             ))}
           </div>
           
           <FadeIn delay={0.5}>
             <div className="text-center mt-12">
               <Link
                 to="/projects"
                 className="inline-flex items-center gap-2 text-lg font-display font-medium dark:text-neon-cyan group"
               >
                 View All Projects
                 <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
               </Link>
             </div>
           </FadeIn>
         </div>
       </section>
 
       {/* CTA Section */}
       <section className="relative py-32">
         <div className="section-container">
           <GlassCard className="text-center py-16 px-8 md:px-16" variant="neon">
             <FadeIn>
               <h2 className="text-display-md mb-6">
                 Let's Create Together
               </h2>
               <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                 Ready to bring your vision to life? Let's discuss your next project.
               </p>
               <Link
                 to="/contact"
                 className="inline-flex items-center gap-2 bg-foreground text-background dark:bg-neon-cyan dark:text-background px-8 py-4 rounded-full font-display font-medium hover:scale-105 transition-transform"
               >
                 Start a Conversation
                 <ArrowRight className="w-5 h-5" />
               </Link>
             </FadeIn>
           </GlassCard>
         </div>
       </section>
 
       {/* Footer */}
       <footer className="relative py-12 border-t border-border">
         <div className="section-container">
           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
             <p className="text-sm text-muted-foreground font-display">
               © {new Date().getFullYear()} Portfolio Platform
             </p>
             <div className="flex gap-6">
               <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                 LinkedIn
               </a>
               <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                 GitHub
               </a>
               <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                 Twitter
               </a>
             </div>
           </div>
         </div>
       </footer>
     </PageTransition>
   );
 };
 
 export default Home;