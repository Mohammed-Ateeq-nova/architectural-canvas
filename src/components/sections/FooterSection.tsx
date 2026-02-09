export const FooterSection = () => {
  return (
    <footer className="relative py-12 border-t border-border">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground font-display">
            © {new Date().getFullYear()} Mohammed Ateeq
          </p>
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/mohammed-ateeq/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              LinkedIn
            </a>
            <a href="https://github.com/Mohammed-Ateeq-nova" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              GitHub
            </a>
            <a href="mailto:mohd.ateeq.march@gmail.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
