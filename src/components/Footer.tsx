import { Linkedin, Github, ArrowUp } from 'lucide-react';

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="bg-dark-800 text-cream/70">
      <div className="section-container pt-16 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a
              href="#home"
              className="font-heading text-2xl font-extrabold text-cream tracking-tight"
            >
              Soliman<span className="text-accent">.</span>
            </a>
            <p className="mt-3 text-sm leading-relaxed max-w-sm text-cream/50">
              Frontend developer building interactive web experiences with
              React, TypeScript, and modern CSS.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-cream/5 text-cream/50 hover:bg-accent/20 hover:text-accent transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-cream/5 text-cream/50 hover:bg-accent/20 hover:text-accent transition-all duration-200"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-cream uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-cream/50 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-cream uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {[
                'Responsive Design',
                'Landing Pages',
                'UI Redesigns',
                'API Integration',
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-sm text-cream/50 hover:text-accent transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider + Bottom */}
        <div className="border-t border-cream/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <p className="text-xs text-cream/40">
              &copy; {new Date().getFullYear()} Soliman Elsenoty. All rights
              reserved.
            </p>
          </div>
          <a
            href="#home"
            className="p-2 rounded-lg bg-cream/5 text-cream/50 hover:bg-accent/20 hover:text-accent transition-all"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
