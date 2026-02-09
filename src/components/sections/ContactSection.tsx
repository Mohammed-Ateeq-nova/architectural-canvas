import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Github, Linkedin } from 'lucide-react';
import { FadeIn, SlideIn } from '@/components/PageTransition';
import { GlassCard, GlassCardLarge } from '@/components/GlassCard';
import { UnicornScene } from '@/components/UnicornScene';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:mohd.ateeq.march@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.name} (${formData.email})`;
    window.open(mailtoLink);
  };

  return (
    <section className="relative py-32" id="contact">
      <div className="section-container">
        <div className="mb-16">
          <FadeIn>
            <span className="inline-block px-4 py-2 mb-6 text-xs font-display font-medium tracking-widest uppercase glass rounded-full">
              Contact
            </span>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <h2 className="text-display-lg mb-6">
              Let's <span className="dark:neon-text-cyan">Connect</span>
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Have a project in mind? Want to collaborate? Or just want to say hello?
              I'd love to hear from you.
            </p>
          </FadeIn>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <SlideIn direction="left">
            <GlassCardLarge className="h-full">
              <h3 className="text-display-sm mb-8">Send a Message</h3>
              
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
                <h4 className="text-lg font-display font-semibold mb-4">Get in Touch</h4>
                <div className="space-y-4">
                  <a
                    href="mailto:mohd.ateeq.march@gmail.com"
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>mohd.ateeq.march@gmail.com</span>
                  </a>
                  <a
                    href="tel:+918790304479"
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span>+91 8790304479</span>
                  </a>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5" />
                    <span>Hyderabad, India</span>
                  </div>
                </div>
              </GlassCard>
            </SlideIn>
            
            <SlideIn direction="right" delay={0.3}>
              <GlassCard>
                <h4 className="text-lg font-display font-semibold mb-4">Connect</h4>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/Mohammed-Ateeq-nova"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 glass rounded-full hover:scale-110 transition-transform"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mohammed-ateeq/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 glass rounded-full hover:scale-110 transition-transform"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </GlassCard>
            </SlideIn>
          </div>
        </div>
      </div>
    </section>
  );
};
