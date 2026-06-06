import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'CV', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-md shadow-sm shadow-dark/5'
          : 'bg-cream'
      }`}
    >
      <nav className="section-container flex items-center justify-between h-16 md:h-20">
        <a
          href="#home"
          className="font-heading text-xl sm:text-2xl font-extrabold text-dark tracking-tight"
        >
          Soliman<span className="text-accent">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-dark/70 rounded-lg transition-colors duration-200 hover:text-accent hover:bg-accent/5"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="#projects" className="btn-secondary text-sm !px-5 !py-2.5">
            See My Work
          </a>
          <a href="#contact" className="btn-primary text-sm !px-5 !py-2.5">
            Contact Me
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-dark rounded-lg hover:bg-dark/5 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="section-container pb-6 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-dark/70 font-medium rounded-lg hover:bg-accent/5 hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-3 pt-3 px-4">
            <a href="#projects" className="btn-secondary text-sm flex-1">
              See My Work
            </a>
            <a href="#contact" className="btn-primary text-sm flex-1">
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
