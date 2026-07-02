import { useState } from 'react';
import { Github, Linkedin, Mail, ChevronUp, Cpu } from 'lucide-react';
import { ScrambleText } from '../ScrambleText';
import { FooterLogoScene } from '../FooterLogoScene';

export const FooterSection = () => {
  const [colorPreset, setColorPreset] = useState<'cyber' | 'aurora' | 'magma'>('cyber');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 bg-[#030303] text-zinc-400 border-t border-neutral-900 overflow-hidden select-none">
      {/* 3D Logo Scene in the background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <FooterLogoScene colorPreset={colorPreset} interactive={true} scale={0.28} />
      </div>

      {/* Cyber Vignette Background Overlay for readability */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.15)_20%,#030303_75%)] pointer-events-none" />

      {/* Laser Gradient Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent opacity-80 animate-pulse" />

      <div className="section-container relative z-10">
        {/* Main content row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b border-neutral-900/60">
          
          {/* Identity Block */}
          <div>
            <div className="mb-2">
              <ScrambleText
                text="MOHAMMED ATEEQ"
                className="font-display text-2xl tracking-widest text-white block uppercase"
              />
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 font-mono text-[9px] tracking-wider uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM ACTIVE
            </div>

            <p className="text-xs text-zinc-400 max-w-sm">
              Designing high-performance systems and interactive 3D interfaces at the intersection of aesthetic logic and computational structure.
            </p>
          </div>

          {/* Navigation & Controls Block */}
          <div className="flex flex-col gap-4 w-full md:w-auto items-start md:items-end">
            {/* Sitemap Horizontal List */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-display text-xs tracking-widest font-semibold uppercase">
              {[
                { id: 'about', label: 'About' },
                { id: 'projects', label: 'Projects' },
                { id: 'experience', label: 'Experience' },
                { id: 'resume', label: 'Resume' },
                { id: 'contact', label: 'Contact' }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-zinc-400 hover:text-white transition-colors duration-300 relative group py-0.5"
                >
                  <span>{link.label}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#00e5ff] transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* Presets and Social Link Actions */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full justify-between mt-2">
              {/* Color Preset Switcher */}
              <div className="flex items-center gap-2 bg-neutral-950/80 border border-neutral-900/60 p-1.5 rounded-lg">
                <span className="font-mono text-[8px] tracking-wider text-zinc-600 pl-1 uppercase">
                  LIGHTS:
                </span>
                <div className="flex gap-1">
                  {(['cyber', 'aurora', 'magma'] as const).map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setColorPreset(preset)}
                      className={`font-mono text-[8px] uppercase px-1.5 py-0.5 rounded transition-all duration-300 ${
                        colorPreset === preset
                          ? 'bg-[#00e5ff]/20 border border-[#00e5ff] text-[#00e5ff]'
                          : 'bg-neutral-900 border border-neutral-800 text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Social Icons row */}
              <div className="flex gap-2">
                {[
                  { icon: <Github className="w-4 h-4" />, href: "https://github.com/Mohammed-Ateeq-nova", label: "GitHub" },
                  { icon: <Linkedin className="w-4 h-4" />, href: "https://www.linkedin.com/in/mohammed-ateeq/", label: "LinkedIn" },
                  { icon: <Mail className="w-4 h-4" />, href: "mailto:mohd.ateeq.march@gmail.com", label: "Email" }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-2 bg-neutral-950/60 border border-neutral-900 rounded-lg text-zinc-400 hover:text-white hover:border-[#00e5ff] hover:shadow-[0_0_10px_rgba(0,229,255,0.3)] transition-all duration-300 flex items-center justify-center"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Sub bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-xs text-zinc-500 font-mono">
          <div className="flex items-center gap-2 font-display text-zinc-500">
            <span>© {new Date().getFullYear()} Mohammed Ateeq. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-[#00e5ff]" />
              <span>THREE.JS // R3F // VITE</span>
            </div>
            
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors duration-300 uppercase tracking-wider text-[10px]"
            >
              RETURN TO APEX
              <ChevronUp className="w-3.5 h-3.5 text-[#ff00a0]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};


