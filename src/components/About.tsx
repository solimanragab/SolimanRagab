import * as LucideIcons from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useData } from '../context/DataContext';

export default function About() {
  const { ref, isInView } = useInView(0.1);
  const { data } = useData();
  const about = data.about;
  const values = about.values;
  const credentials = about.credentials;

  return (
    <section id="about" ref={ref} className="section-padding relative">
      <div className="absolute inset-0 bg-white/50" />
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Bio & Values */}
          <div>
            <span
              className={`inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4 opacity-0 ${
                isInView ? 'animate-fade-in-up' : ''
              }`}
            >
              {about.badge}
            </span>
            <h2
              className={`heading-lg text-dark mb-6 opacity-0 ${
                isInView ? 'animate-fade-in-up stagger-1' : ''
              }`}
            >
              {about.title}
            </h2>
            <p
              className={`text-dark/70 leading-relaxed text-lg mb-8 opacity-0 ${
                isInView ? 'animate-fade-in-up stagger-2' : ''
              }`}
            >
              {about.description}
            </p>

            {/* Core Values */}
            <div
              className={`mb-8 opacity-0 ${
                isInView ? 'animate-fade-in-up stagger-3' : ''
              }`}
            >
              <h3 className="text-sm font-semibold text-dark/40 uppercase tracking-wider mb-4">
                Core Values
              </h3>
              <div className="space-y-3">
                {values.map((value) => {
                  const Icon = (LucideIcons as any)[value.icon] || LucideIcons.HelpCircle;
                  return (
                    <div
                      key={value.label}
                      className="flex items-center gap-3 p-3 bg-accent/5 rounded-xl"
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center">
                        <Icon size={16} className="text-accent" />
                      </div>
                      <span className="font-medium text-dark">
                        {value.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <a
              href="#contact"
              className={`btn-primary inline-flex opacity-0 ${
                isInView ? 'animate-fade-in-up stagger-4' : ''
              }`}
            >
              Get In Touch <LucideIcons.ArrowRight size={16} />
            </a>
          </div>

          {/* Right: Credentials */}
          <div
            className={`lg:pt-20 opacity-0 ${
              isInView ? 'animate-slide-in-right stagger-2' : ''
            }`}
          >
            <div className="card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <LucideIcons.Award size={20} className="text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-dark">
                  Credentials & Highlights
                </h3>
              </div>
              <div className="space-y-4">
                {credentials.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors"
                  >
                    <LucideIcons.CheckCircle
                      size={18}
                      className="text-olive flex-shrink-0 mt-0.5"
                    />
                    <span className="text-dark/70 text-[15px]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="card p-5 text-center">
                <div className="heading-md text-accent">{about.stats.projectsCount}</div>
                <div className="text-xs text-dark/50 font-medium mt-1">
                  Projects
                </div>
              </div>
              <div className="card p-5 text-center">
                <div className="heading-md text-accent">{about.stats.coursesCount}</div>
                <div className="text-xs text-dark/50 font-medium mt-1">
                  Courses
                </div>
              </div>
              <div className="card p-5 text-center">
                <div className="heading-md text-accent">{about.stats.experienceCount}</div>
                <div className="text-xs text-dark/50 font-medium mt-1">
                  Years
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
