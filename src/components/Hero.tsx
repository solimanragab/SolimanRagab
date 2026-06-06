import { ArrowRight, Download, Linkedin, Github } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useData } from '../context/DataContext';

export default function Hero() {
  const { ref, isInView } = useInView(0.1);
  const { data } = useData();
  const hero = data.hero;

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Subtle background decoration */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-olive/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="order-2 lg:order-1">
            <div
              className={`opacity-0 ${
                isInView ? 'animate-fade-in-up' : ''
              }`}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                {hero.availabilityText}
              </span>
            </div>

            <h1
              className={`heading-xl text-dark opacity-0 ${
                isInView ? 'animate-fade-in-up stagger-1' : ''
              }`}
            >
              {hero.mainTitlePrefix}
              <span className="text-accent relative">
                {hero.mainTitleAccent}
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 8c40-6 80-6 120-2s60 4 76-2"
                    stroke="#3AAFB9"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              {hero.mainTitleSuffix}
            </h1>

            <p
              className={`mt-6 text-lg sm:text-xl text-dark/60 leading-relaxed max-w-xl opacity-0 ${
                isInView ? 'animate-fade-in-up stagger-2' : ''
              }`}
            >
              {hero.description}
            </p>

            <div
              className={`mt-9 flex flex-wrap items-center gap-4 opacity-0 ${
                isInView ? 'animate-fade-in-up stagger-3' : ''
              }`}
            >
              <a href="#contact" className="btn-primary">
                Contact Me <ArrowRight size={18} />
              </a>
              <a href="#projects" className="btn-secondary">
                See My Work
              </a>
            </div>

            <div
              className={`mt-8 flex items-center gap-4 opacity-0 ${
                isInView ? 'animate-fade-in-up stagger-4' : ''
              }`}
            >
              <a
                href={hero.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-dark/5 text-dark/50 hover:bg-accent/10 hover:text-accent transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={hero.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-dark/5 text-dark/50 hover:bg-accent/10 hover:text-accent transition-all duration-200"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <div className="w-px h-8 bg-dark/10" />
              <a
                href={hero.cvUrl}
                className="inline-flex items-center gap-2 text-sm text-dark/50 hover:text-accent transition-colors"
              >
                <Download size={16} />
                Download CV
              </a>
            </div>
          </div>

          {/* Right: Portrait */}
          <div
            className={`order-1 lg:order-2 flex justify-center opacity-0 ${
              isInView ? 'animate-slide-in-right stagger-1' : ''
            }`}
          >
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent/20 animate-[spin_30s_linear_infinite]" />
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[380px] lg:h-[380px] rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-dark/10 ml-4 mt-4">
                <img
                  src={hero.imageUrl}
                  alt="Soliman Elsenoty"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badges */}
              {hero.badgeReact && (
                <div className="absolute -left-4 top-12 bg-white rounded-xl shadow-lg shadow-dark/10 px-4 py-2.5 animate-float">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-olive rounded-full" />
                    <span className="text-sm font-semibold text-dark">{hero.badgeReact}</span>
                  </div>
                </div>
              )}
              {hero.badgeTypeScript && (
                <div
                  className="absolute -right-4 bottom-16 bg-white rounded-xl shadow-lg shadow-dark/10 px-4 py-2.5 animate-float"
                  style={{ animationDelay: '2s' }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-accent rounded-full" />
                    <span className="text-sm font-semibold text-dark">{hero.badgeTypeScript}</span>
                  </div>
                </div>
              )}
              {hero.badgeTailwind && (
                <div
                  className="absolute right-8 -top-2 bg-white rounded-xl shadow-lg shadow-dark/10 px-4 py-2.5 animate-float"
                  style={{ animationDelay: '4s' }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-dark rounded-full" />
                    <span className="text-sm font-semibold text-dark">{hero.badgeTailwind}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
