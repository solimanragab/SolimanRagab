import { Check, X, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useData } from '../context/DataContext';

export default function Pricing() {
  const { ref, isInView } = useInView(0.05);
  const { data } = useData();
  const plans = data.pricing;

  return (
    <section id="pricing" ref={ref} className="section-padding">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span
            className={`inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4 opacity-0 ${
              isInView ? 'animate-fade-in-up' : ''
            }`}
          >
            Pricing
          </span>
          <h2
            className={`heading-lg text-dark opacity-0 ${
              isInView ? 'animate-fade-in-up stagger-1' : ''
            }`}
          >
            Simple, Transparent Pricing
          </h2>
          <p
            className={`mt-4 text-dark/60 text-lg opacity-0 ${
              isInView ? 'animate-fade-in-up stagger-2' : ''
            }`}
          >
            Choose a plan that fits the scope of your project. No hidden fees,
            no surprises.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative card p-8 opacity-0 ${
                isInView ? `animate-fade-in-up stagger-${i + 1}` : ''
              } ${plan.featured ? 'ring-2 ring-accent scale-[1.02]' : ''}`}
            >
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-cream text-xs font-bold rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-dark mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-heading font-extrabold text-dark">
                    ${plan.price}
                  </span>
                </div>
                <p className="text-sm text-dark/60 mt-2">{plan.description}</p>
              </div>

              <div className="border-t border-dark/5 pt-6 space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature.text} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check
                        size={18}
                        className="text-accent flex-shrink-0 mt-0.5"
                      />
                    ) : (
                      <X
                        size={18}
                        className="text-dark/25 flex-shrink-0 mt-0.5"
                      />
                    )}
                    <span
                      className={`text-sm ${
                        feature.included
                          ? 'text-dark'
                          : 'text-dark/35 line-through'
                      }`}
                    >
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className={`w-full text-center ${
                  plan.featured ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                Get Started <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
