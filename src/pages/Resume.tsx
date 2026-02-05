 import { Download, ExternalLink } from 'lucide-react';
 import { PageTransition, FadeIn, SlideIn } from '@/components/PageTransition';
 import { GlassCard, GlassCardLarge } from '@/components/GlassCard';
 
 const Resume = () => {
   return (
     <PageTransition className="page-container pt-32">
       {/* Header */}
       <section className="section-container mb-16">
         <FadeIn>
           <span className="inline-block px-4 py-2 mb-6 text-xs font-display font-medium tracking-widest uppercase glass rounded-full">
             Resume
           </span>
         </FadeIn>
         
         <FadeIn delay={0.1}>
           <h1 className="text-display-lg mb-6">
             Curriculum <span className="dark:neon-text-cyan">Vitae</span>
           </h1>
         </FadeIn>
         
         <FadeIn delay={0.2}>
           <p className="text-xl text-muted-foreground max-w-2xl mb-8">
             A comprehensive overview of qualifications, experience, and achievements.
           </p>
         </FadeIn>
         
         <FadeIn delay={0.3}>
           <button className="glass rounded-full px-6 py-3 font-display font-medium inline-flex items-center gap-2 hover:scale-105 transition-transform">
             <Download className="w-4 h-4" />
             Download PDF
           </button>
         </FadeIn>
       </section>
 
       {/* Resume Viewer */}
       <section className="section-container mb-24">
         <SlideIn direction="up">
           <GlassCardLarge className="overflow-hidden">
             {/* Resume Container */}
             <div className="aspect-[8.5/11] bg-card rounded-xl flex items-center justify-center relative overflow-hidden">
               {/* Placeholder for PDF/Resume content */}
               <div className="absolute inset-8 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-center p-8">
                 <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
                   <ExternalLink className="w-8 h-8 text-muted-foreground" />
                 </div>
                 <h3 className="text-xl font-display font-semibold mb-4">
                   Resume Preview
                 </h3>
                 <p className="text-muted-foreground max-w-sm mb-6">
                   Upload your resume PDF to display it here. The viewer will render 
                   your document in a beautifully framed glass container.
                 </p>
                 <div className="glass rounded-lg px-4 py-2 text-sm font-display">
                   Supports: PDF, DOCX
                 </div>
               </div>
               
               {/* Decorative Elements */}
               <div className="absolute top-4 left-4 right-4 flex justify-between text-xs text-muted-foreground font-display">
                 <span>RESUME</span>
                 <span>{new Date().getFullYear()}</span>
               </div>
             </div>
           </GlassCardLarge>
         </SlideIn>
       </section>
 
       {/* Quick Stats */}
       <section className="section-container mb-24">
         <div className="grid md:grid-cols-4 gap-6">
           {[
             { label: 'Years Experience', value: '0+' },
             { label: 'Projects Completed', value: '0+' },
             { label: 'Technologies', value: '0+' },
             { label: 'Certifications', value: '0' },
           ].map((stat, index) => (
             <FadeIn key={stat.label} delay={0.1 * index}>
               <GlassCard className="text-center">
                 <span className="text-4xl font-display font-bold dark:text-neon-cyan block mb-2">
                   {stat.value}
                 </span>
                 <span className="text-sm text-muted-foreground">{stat.label}</span>
               </GlassCard>
             </FadeIn>
           ))}
         </div>
         
         <FadeIn delay={0.5}>
           <p className="text-center text-muted-foreground mt-8 text-sm">
             Update these statistics with your actual numbers from your resume.
           </p>
         </FadeIn>
       </section>
 
       {/* Certifications / Awards */}
       <section className="section-container pb-24">
         <FadeIn>
           <h2 className="text-display-sm mb-8">Certifications & Awards</h2>
         </FadeIn>
         
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           {[1, 2, 3].map((_, index) => (
             <FadeIn key={index} delay={0.1 * index}>
               <GlassCard>
                 <span className="text-xs font-display uppercase tracking-widest text-muted-foreground mb-2 block">
                   Certification
                 </span>
                 <h3 className="font-display font-semibold mb-2">
                   Certification Name
                 </h3>
                 <p className="text-sm text-muted-foreground">
                   Issuing Organization • Year
                 </p>
               </GlassCard>
             </FadeIn>
           ))}
         </div>
         
         <FadeIn delay={0.5}>
           <p className="text-center text-muted-foreground mt-8 text-sm">
             Add your certifications and awards from your resume.
           </p>
         </FadeIn>
       </section>
     </PageTransition>
   );
 };
 
 export default Resume;