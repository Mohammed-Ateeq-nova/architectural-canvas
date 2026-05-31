import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Github, Linkedin } from 'lucide-react';
import { FadeIn, SlideIn } from '@/components/PageTransition';
import { GlassCard, GlassCardLarge } from '@/components/GlassCard';
import { ScrambleText } from '../ScrambleText';
import { ScrambleParagraph } from '../ScrambleParagraph';
import { toast } from 'sonner';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const [sectionTrigger, setSectionTrigger] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const [formTrigger, setFormTrigger] = useState(false);

  // Section Observer
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setSectionTrigger(entry.isIntersecting);
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, []);

  // Form Observer
  useEffect(() => {
    const el = formRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setFormTrigger(entry.isIntersecting);
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, []);

  const generateFormattedEmail = (name: string, email: string, message: string) => {
    const dateStr = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium'
    });

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Portfolio Contact Form Submission</title>
        <style>
          body { margin: 0; padding: 0; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #050505; color: #e5e5e5; }
          .container { max-width: 600px; margin: 20px auto; background-color: #0c0c0c; border: 1px solid #1a1a1a; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 229, 255, 0.05); }
          .header { background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%); padding: 30px; border-bottom: 2px solid #00e5ff; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 0.1em; color: #ffffff; text-shadow: 0 0 10px rgba(0, 229, 255, 0.3); }
          .header p { margin: 10px 0 0; font-size: 13px; color: #00e5ff; text-transform: uppercase; letter-spacing: 0.15em; }
          .content { padding: 30px; }
          .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 25px; }
          .meta-box { background-color: #121212; border: 1px solid #222; border-radius: 8px; padding: 12px 15px; }
          .meta-label { font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
          .meta-value { font-size: 14px; font-weight: 600; color: #ffffff; }
          .message-box { background-color: #121212; border: 1px solid #222; border-left: 3px solid #00e5ff; border-radius: 4px 8px 8px 4px; padding: 20px; margin-bottom: 20px; }
          .message-text { font-size: 15px; line-height: 1.6; color: #d1d1d1; white-space: pre-wrap; margin: 0; }
          .footer { background-color: #080808; padding: 20px; border-top: 1px solid #111; text-align: center; font-size: 12px; color: #666; }
          .footer a { color: #00e5ff; text-decoration: none; }
          .header img { width: 48px; height: 48px; border-radius: 12px; margin-bottom: 16px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="${window.location.origin}/favicon.png" alt="Portfolio Logo" />
            <h1>PORTFOLIO TRANSMISSION</h1>
            <p>New Contact Form Submission</p>
          </div>
          <div class="content">
            <div class="meta-grid">
              <div class="meta-box">
                <div class="meta-label">Sender Name</div>
                <div class="meta-value">${name}</div>
              </div>
              <div class="meta-box">
                <div class="meta-label">Email Address</div>
                <div class="meta-value">${email}</div>
              </div>
            </div>
            <div class="meta-box" style="margin-bottom: 25px;">
              <div class="meta-label">Received Timestamp (IST)</div>
              <div class="meta-value">${dateStr}</div>
            </div>
            <div class="meta-label" style="margin-bottom: 8px;">Message Content</div>
            <div class="message-box">
              <pre class="message-text">${message}</pre>
            </div>
          </div>
          <div class="footer">
            Received via Portfolio Contact System • <a href="mailto:${email}">Reply to Sender</a>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const loadingToastId = toast.loading('Establishing secure transmission tunnel...');

    try {
      const htmlContent = generateFormattedEmail(formData.name, formData.email, formData.message);

      const response = await fetch('https://qwertymailingservice.onrender.com/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_MAILING_API_KEY
        },
        body: JSON.stringify({
          to: ['mohd.ateeq.march@gmail.com'],
          subject: `💼 Portfolio Contact from ${formData.name}`,
          html: htmlContent,
          replyTo: formData.email
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.dismiss(loadingToastId);
        toast.success('Message dispatched successfully! I will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.dismiss(loadingToastId);
        toast.error(data.message || 'Failed to dispatch email. Please try again.');
      }
    } catch (error) {
      console.error('Contact transmission failure:', error);
      toast.dismiss(loadingToastId);
      toast.error('Transmission failed. Please try again or email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-32" id="contact" ref={sectionRef}>
      <div className="section-container">
        <div className="mb-16">
          <FadeIn>
            <span className="inline-block px-4 py-2 mb-6 text-xs font-display font-medium tracking-widest uppercase glass rounded-full">
              <ScrambleText text="Contact" trigger={sectionTrigger} />
            </span>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <h2 className="text-display-lg mb-6">
              <ScrambleText text="Let's" trigger={sectionTrigger} delay={200} /> <span className="dark:neon-text-cyan"><ScrambleText text="Connect" trigger={sectionTrigger} delay={1000} /></span>
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <ScrambleParagraph
              text="Have a project in mind? Want to collaborate? Or just want to say hello? I'd love to hear from you."
              className="text-xl text-muted-foreground max-w-2xl"
              trigger={sectionTrigger}
            />
          </FadeIn>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <SlideIn direction="left">
            <GlassCardLarge className="h-full">
              <h3 className="text-display-sm mb-8">
                <ScrambleText text="Send a Message" trigger={formTrigger} />
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6" ref={formRef}>
                <div>
                  <label className="block text-sm font-display font-medium mb-2">
                    <ScrambleText text="Name" trigger={formTrigger} delay={0} />
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
                    <ScrambleText text="Email" trigger={formTrigger} delay={60} />
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
                    <ScrambleText text="Message" trigger={formTrigger} delay={120} />
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
                  disabled={isSubmitting}
                  whileHover={isSubmitting ? {} : { scale: 1.02 }}
                  whileTap={isSubmitting ? {} : { scale: 0.98 }}
                  className={`w-full py-4 rounded-xl font-display font-medium inline-flex items-center justify-center gap-2 transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed opacity-50'
                      : 'bg-foreground text-background dark:bg-neon-cyan dark:text-background'
                  }`}
                >
                  <ScrambleText text={isSubmitting ? "Transmitting..." : "Send Message"} trigger={formTrigger} delay={180} />
                  <Send className={`w-4 h-4 ${isSubmitting ? 'animate-pulse' : ''}`} />
                </motion.button>
              </form>
            </GlassCardLarge>
          </SlideIn>

          <div className="space-y-6">
            <SlideIn direction="right" delay={0.1}>
              <GlassCard>
                <h4 className="text-lg font-display font-semibold mb-4">
                  <ScrambleText text="Get in Touch" trigger={sectionTrigger} delay={800} />
                </h4>
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

            <SlideIn direction="right" delay={0.2}>
              <GlassCard>
                <h4 className="text-lg font-display font-semibold mb-4">
                  <ScrambleText text="Connect" trigger={sectionTrigger} delay={1000} />
                </h4>
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
