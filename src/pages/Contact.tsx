 import { useState } from 'react';
 import { motion } from 'framer-motion';
 import { Send, Mail, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
 import { PageTransition, FadeIn, SlideIn } from '@/components/PageTransition';
 import { GlassCard, GlassCardLarge } from '@/components/GlassCard';
 import { UnicornScene } from '@/components/UnicornScene';
 
 const Contact = () => {
   const [formData, setFormData] = useState({
     name: '',
     email: '',
     message: '',
   });
 
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     // Handle form submission - integrate with your backend
     console.log('Form submitted:', formData);
   };
 
   return (
     <PageTransition className="page-container pt-32">
       {/* Header */}
       <section className="section-container mb-16">
         <FadeIn>
           <span className="inline-block px-4 py-2 mb-6 text-xs font-display font-medium tracking-widest uppercase glass rounded-full">
             Contact
           </span>
         </FadeIn>
         
         <FadeIn delay={0.1}>
           <h1 className="text-display-lg mb-6">
             Let's <span className="dark:neon-text-cyan">Connect</span>
           </h1>
         </FadeIn>
         
         <FadeIn delay={0.2}>
           <p className="text-xl text-muted-foreground max-w-2xl">
             Have a project in mind? Want to collaborate? Or just want to say hello?
             I'd love to hear from you.
           </p>
         </FadeIn>
       </section>
 
       {/* Contact Grid */}
       <section className="section-container mb-24">
         <div className="grid lg:grid-cols-2 gap-8">
           {/* Contact Form */}
           <SlideIn direction="left">
             <GlassCardLarge className="h-full">
               <h2 className="text-display-sm mb-8">Send a Message</h2>
               
               <form onSubmit={handleSubmit} className="space-y-6">
                 <div>
                   <label className="block text-sm font-display font-medium mb-2">
                     Name
                   </label>
                   <input
                     type="text"
                     value={formData.name}
                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                     className="w-full px-4 py-3 glass rounded-xl bg-transparent border border-border focus:border-foreground dark:focus:border-neon-cyan outline-none transition-colors font-body"
                     placeholder="Your name"
                     required
                   />
                 </div>
                 
                 <div>
                   <label className="block text-sm font-display font-medium mb-2">
                     Email
                   </label>
                   <input
                     type="email"
                     value={formData.email}
                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                     className="w-full px-4 py-3 glass rounded-xl bg-transparent border border-border focus:border-foreground dark:focus:border-neon-cyan outline-none transition-colors font-body"
                     placeholder="your@email.com"
                     required
                   />
                 </div>
                 
                 <div>
                   <label className="block text-sm font-display font-medium mb-2">
                     Message
                   </label>
                   <textarea
                     value={formData.message}
                     onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                     className="w-full px-4 py-3 glass rounded-xl bg-transparent border border-border focus:border-foreground dark:focus:border-neon-cyan outline-none transition-colors font-body resize-none"
                     rows={6}
                     placeholder="Tell me about your project..."
                     required
                   />
                 </div>
                 
                 <motion.button
                   type="submit"
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   className="w-full bg-foreground text-background dark:bg-neon-cyan dark:text-background py-4 rounded-xl font-display font-medium inline-flex items-center justify-center gap-2"
                 >
                   Send Message
                   <Send className="w-4 h-4" />
                 </motion.button>
               </form>
             </GlassCardLarge>
           </SlideIn>
 
           {/* Contact Info & Scene */}
           <div className="space-y-6">
             <SlideIn direction="right" delay={0.1}>
               <GlassCard className="aspect-video" hover={false}>
                 <UnicornScene 
                   projectId="7zy6yQ45eJ7kBZoyipZ1"
                   className="w-full h-full rounded-xl overflow-hidden"
                 />
               </GlassCard>
             </SlideIn>
             
             <SlideIn direction="right" delay={0.2}>
               <GlassCard>
                 <h3 className="text-lg font-display font-semibold mb-4">Get in Touch</h3>
                 <div className="space-y-4">
                   <a
                     href="mailto:your@email.com"
                     className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                   >
                     <Mail className="w-5 h-5" />
                     <span>your@email.com</span>
                   </a>
                   <div className="flex items-center gap-3 text-muted-foreground">
                     <MapPin className="w-5 h-5" />
                     <span>City, Country</span>
                   </div>
                 </div>
               </GlassCard>
             </SlideIn>
             
             <SlideIn direction="right" delay={0.3}>
               <GlassCard>
                 <h3 className="text-lg font-display font-semibold mb-4">Connect</h3>
                 <div className="flex gap-4">
                   <a
                     href="#"
                     className="p-3 glass rounded-full hover:scale-110 transition-transform"
                     aria-label="GitHub"
                   >
                     <Github className="w-5 h-5" />
                   </a>
                   <a
                     href="#"
                     className="p-3 glass rounded-full hover:scale-110 transition-transform"
                     aria-label="LinkedIn"
                   >
                     <Linkedin className="w-5 h-5" />
                   </a>
                   <a
                     href="#"
                     className="p-3 glass rounded-full hover:scale-110 transition-transform"
                     aria-label="Twitter"
                   >
                     <Twitter className="w-5 h-5" />
                   </a>
                 </div>
               </GlassCard>
             </SlideIn>
           </div>
         </div>
       </section>
 
       {/* Note */}
       <section className="section-container pb-24">
         <FadeIn>
           <GlassCard className="text-center py-8">
             <p className="text-muted-foreground">
               <strong>Note:</strong> Update the contact information and social links with your actual details.
               Integrate the form with your preferred backend service to receive messages.
             </p>
           </GlassCard>
         </FadeIn>
       </section>
     </PageTransition>
   );
 };
 
 export default Contact;