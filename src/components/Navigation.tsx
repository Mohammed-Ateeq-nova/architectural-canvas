import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeContext } from './ThemeProvider';
import { Menu, X, Sun, Moon, Home } from 'lucide-react';

const sectionLinks = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useThemeContext();
  
  const isHomePage = location.pathname === '/';

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block"
      >
        <div className="glass rounded-full px-2 py-2 flex items-center gap-1">
          {/* Home Link */}
          <Link
            to="/"
            className={`relative px-4 py-2 text-sm font-display font-medium transition-colors duration-300 rounded-full
              ${location.pathname === '/' && !location.hash
                ? 'text-primary-foreground' 
                : 'text-foreground/70 hover:text-foreground'
              }`}
          >
            {location.pathname === '/' && !location.hash && (
              <motion.div
                layoutId="nav-active"
                className="absolute inset-0 bg-primary rounded-full"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Home className="w-4 h-4" />
              Home
            </span>
          </Link>

          {/* Section Links - Only show on homepage */}
          {isHomePage && sectionLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="relative px-4 py-2 text-sm font-display font-medium transition-colors duration-300 rounded-full text-foreground/70 hover:text-foreground"
            >
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-2 p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === 'dark' ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {theme === 'dark' ? (
                <Moon className="w-4 h-4 text-neon-cyan" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </motion.div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-6 right-6 z-50">
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => setIsOpen(!isOpen)}
          className="glass rounded-full p-3"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-80 glass-heavy p-8 pt-24"
            >
              <div className="flex flex-col gap-4">
                {/* Home Link */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 }}
                >
                  <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className={`block text-2xl font-display font-bold py-2 transition-colors
                      ${location.pathname === '/'
                        ? 'dark:text-neon-cyan text-primary' 
                        : 'text-foreground/70 hover:text-foreground'
                      }`}
                  >
                    Home
                  </Link>
                </motion.div>

                {/* Section Links */}
                {isHomePage && sectionLinks.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * (index + 1) }}
                  >
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="block text-xl font-display font-medium py-2 text-foreground/70 hover:text-foreground transition-colors w-full text-left"
                    >
                      {item.label}
                    </button>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 pt-8 border-t border-border"
                >
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-3 text-lg font-display"
                  >
                    {theme === 'dark' ? (
                      <>
                        <Moon className="w-5 h-5 text-neon-cyan" />
                        <span>Dark Mode</span>
                      </>
                    ) : (
                      <>
                        <Sun className="w-5 h-5" />
                        <span>Light Mode</span>
                      </>
                    )}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
