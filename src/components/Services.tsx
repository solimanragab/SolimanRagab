import * as LucideIcons from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useData } from '../context/DataContext';

export default function Services() {
  const { ref, isInView } = useInView(0.1);
  const { data } = useData();
  const services = data.services;

  return (
    <section id="services" ref={ref} className="section-padding">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span
            className={`inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4 opacity-0 ${
              isInView ? 'animate-fade-in-up' : ''
            }`}
          >
            What I Offer
          </span>
          <h2
            className={`heading-lg text-dark opacity-0 ${
              isInView ? 'animate-fade-in-up stagger-1' : ''
            }`}
          >
            Services
          </h2>
          <p
            className={`mt-4 text-dark/60 text-lg opacity-0 ${
              isInView ? 'animate-fade-in-up stagger-2' : ''
            }`}
          >
            Focused frontend services that cover the full journey from concept
            to a polished, live product.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const Icon = (LucideIcons as any)[service.icon] || LucideIcons.HelpCircle;
            return (
              <div
                key={service.title}
                className={`group card card-hover p-7 text-center opacity-0 ${
                  isInView ? `animate-fade-in-up stagger-${i + 1}` : ''
                }`}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10 text-accent mb-5 transition-colors duration-300 group-hover:bg-accent group-hover:text-cream">
                  <Icon size={26} strokeWidth={1.8} />
                </div>
                <h3 className="text-lg font-semibold text-dark mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-dark/60 leading-relaxed mb-5">
                  {service.description}
                </p>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:gap-2.5 transition-all duration-200"
                >
                  View Projects <LucideIcons.ArrowRight size={14} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
