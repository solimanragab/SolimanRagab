import * as LucideIcons from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useState } from 'react';
import { useData } from '../context/DataContext';

export default function SocialProof() {
  const { ref, isInView } = useInView(0.1);
  const { data } = useData();
  const metrics = data.socialProof.metrics;
  const testimonials = data.socialProof.testimonials;
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-white/50" />
      <div className="section-container relative z-10">
        {/* Metrics */}
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {metrics.map((metric, i) => {
            const Icon = (LucideIcons as any)[metric.icon] || LucideIcons.HelpCircle;
            return (
              <div
                key={metric.label}
                className={`card p-8 text-center opacity-0 ${
                  isInView ? `animate-scale-in stagger-${i + 1}` : ''
                }`}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl text-white mb-4 mx-auto">
                  <div className={`${metric.color} p-2.5 rounded-xl`}>
                    <Icon size={24} strokeWidth={1.8} />
                  </div>
                </div>
                <div className="heading-lg text-dark mb-1">{metric.value}</div>
                <div className="text-dark/60 font-medium">{metric.label}</div>
              </div>
            );
          })}
        </div>

        {/* Testimonial Slider */}
        <div
          className={`max-w-3xl mx-auto opacity-0 ${
            isInView ? 'animate-fade-in-up stagger-4' : ''
          }`}
        >
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
              Testimonials
            </span>
            <h2 className="heading-md text-dark">What People Say</h2>
          </div>

          <div className="relative">
            <div className="card p-8 sm:p-10 text-center">
              <LucideIcons.Quote size={36} className="text-accent/20 mx-auto mb-4" />
              <blockquote className="text-lg sm:text-xl text-dark/80 leading-relaxed mb-6">
                {testimonials[current].quote}
              </blockquote>
              <div>
                <div className="font-semibold text-dark">
                  {testimonials[current].name}
                </div>
                <div className="text-sm text-dark/50">
                  {testimonials[current].role}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prev}
                className="p-2 rounded-lg border border-dark/10 text-dark/60 hover:border-accent hover:text-accent transition-colors"
                aria-label="Previous testimonial"
              >
                <LucideIcons.ChevronLeft size={20} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      i === current
                        ? 'bg-accent w-6'
                        : 'bg-dark/20 hover:bg-dark/40'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="p-2 rounded-lg border border-dark/10 text-dark/60 hover:border-accent hover:text-accent transition-colors"
                aria-label="Next testimonial"
              >
                <LucideIcons.ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
