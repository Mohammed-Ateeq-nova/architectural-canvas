import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Github, Linkedin, CheckCircle } from 'lucide-react';

export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.4'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['80px', '0px']);
  const parallaxScale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:mohd.ateeq.march@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.name} (${formData.email})`;
    window.open(mailtoLink);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const inputClasses = (field: string) =>
    `w-full px-5 py-4 glass rounded-xl bg-transparent border transition-all duration-500 font-body outline-none ${
      focusedField === field
        ? 'border-foreground dark:border-neon-cyan dark:shadow-glow-cyan scale-[1.01]'
        : 'border-border hover:border-foreground/30 dark:hover:border-neon-cyan/30'
    }`;

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden" id="contact">
      {/* Parallax background shift */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-neon-magenta/3 dark:bg-neon-magenta/8 blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-neon-cyan/3 dark:bg-neon-cyan/5 blur-[100px]" />
      </motion.div>

      <motion.div
        style={{ y: parallaxY, scale: parallaxScale, opacity: parallaxOpacity }}
        className="section-container relative z-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <span className="inline-block px-4 py-2 mb-6 text-xs font-display font-medium tracking-widest uppercase glass rounded-full">
            Contact
          </span>
          <h2 className="text-display-lg mb-6">
            Let's <span className="dark:neon-text-cyan">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Have a project in mind? Want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-3xl p-8 md:p-12"
          >
            <h3 className="text-display-sm mb-8">Send a Message</h3>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center py-16 gap-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  >
                    <CheckCircle className="w-16 h-16 text-emerald-500" />
                  </motion.div>
                  <p className="font-display font-semibold text-xl">Message Sent!</p>
                  <p className="text-muted-foreground text-sm">I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {[
                    { name: 'name', type: 'text', label: 'Name', placeholder: 'Your name' },
                    { name: 'email', type: 'email', label: 'Email', placeholder: 'your@email.com' },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-display font-medium mb-2">{field.label}</label>
                      <input
                        type={field.type}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => setFocusedField(null)}
                        className={inputClasses(field.name)}
                        placeholder={field.placeholder}
                        required
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-display font-medium mb-2">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className={`${inputClasses('message')} resize-none`}
                      rows={5}
                      placeholder="Tell me about your project..."
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-foreground text-background dark:bg-neon-cyan dark:text-background py-4 rounded-xl font-display font-medium inline-flex items-center justify-center gap-2 transition-shadow duration-300 dark:hover:shadow-glow-cyan"
                  >
                    Send Message
                    <Send className="w-4 h-4" />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-2xl p-6"
            >
              <h4 className="text-lg font-display font-semibold mb-4">Get in Touch</h4>
              <div className="space-y-4">
                <a href="mailto:mohd.ateeq.march@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group">
                  <span className="glass rounded-full p-2 group-hover:scale-110 transition-transform">
                    <Mail className="w-4 h-4" />
                  </span>
                  <span>mohd.ateeq.march@gmail.com</span>
                </a>
                <a href="tel:+918790304479" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group">
                  <span className="glass rounded-full p-2 group-hover:scale-110 transition-transform">
                    <Phone className="w-4 h-4" />
                  </span>
                  <span>+91 8790304479</span>
                </a>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="glass rounded-full p-2">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <span>Hyderabad, India</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-2xl p-6"
            >
              <h4 className="text-lg font-display font-semibold mb-4">Connect</h4>
              <div className="flex gap-3">
                {[
                  { href: 'https://github.com/Mohammed-Ateeq-nova', icon: Github, label: 'GitHub' },
                  { href: 'https://www.linkedin.com/in/mohammed-ateeq/', icon: Linkedin, label: 'LinkedIn' },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass rounded-full p-3 hover:scale-110 transition-all duration-300 dark:hover:shadow-glow-cyan"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* CTA card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-2xl p-6 dark:border-neon-cyan/20"
            >
              <p className="font-display font-semibold text-lg mb-2">Open to Opportunities</p>
              <p className="text-sm text-muted-foreground mb-4">
                Currently looking for internships and full-time roles in fullstack and AI development.
              </p>
              <a
                href="/Mohammed_Ateeq_CV.pdf"
                download
                className="inline-flex items-center gap-2 text-sm font-display font-medium dark:text-neon-cyan hover:underline"
              >
                Download Resume →
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
