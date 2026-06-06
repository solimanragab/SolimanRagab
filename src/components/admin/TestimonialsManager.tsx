import React, { useState } from 'react';
import { useData, TestimonialItem, MetricItem } from '../../context/DataContext';
import { Trash2, Edit3, Plus, Quote } from 'lucide-react';

interface TestimonialsManagerProps {
  showToast: (msg: string) => void;
}

const METRIC_ICONS = ['GraduationCap', 'BookOpen', 'Clock', 'Award', 'Briefcase', 'Heart', 'Coffee', 'UserCheck'];
const BG_COLORS = [
  { value: 'bg-olive', label: 'Olive Green' },
  { value: 'bg-accent', label: 'Accent Cyan' },
  { value: 'bg-dark-800', label: 'Charcoal Dark' }
];

export default function TestimonialsManager({ showToast }: TestimonialsManagerProps) {
  const { data, updateSocialProof } = useData();
  const metrics = data.socialProof.metrics;
  const testimonials = data.socialProof.testimonials;

  // Testimonial States
  const [editingTestimonialIndex, setEditingTestimonialIndex] = useState<number | null>(null);
  const [isTestimonialFormOpen, setIsTestimonialFormOpen] = useState(false);
  const [quote, setQuote] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  // Metrics States
  const [metricItems, setMetricItems] = useState<MetricItem[]>(() => metrics);

  const openAddTestimonial = () => {
    setEditingTestimonialIndex(null);
    setQuote('');
    setName('');
    setRole('');
    setIsTestimonialFormOpen(true);
  };

  const openEditTestimonial = (idx: number) => {
    setEditingTestimonialIndex(idx);
    setQuote(testimonials[idx].quote);
    setName(testimonials[idx].name);
    setRole(testimonials[idx].role);
    setIsTestimonialFormOpen(true);
  };

  const saveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();

    const tItem: TestimonialItem = { quote, name, role };
    let updated: TestimonialItem[] = [];

    if (editingTestimonialIndex !== null) {
      updated = testimonials.map((t, idx) => (idx === editingTestimonialIndex ? tItem : t));
      showToast('Testimonial updated.');
    } else {
      updated = [...testimonials, tItem];
      showToast('Testimonial added.');
    }

    updateSocialProof({ testimonials: updated });
    setIsTestimonialFormOpen(false);
  };

  const deleteTestimonial = (index: number) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      const updated = testimonials.filter((_, idx) => idx !== index);
      updateSocialProof({ testimonials: updated });
      showToast('Testimonial deleted.');
    }
  };

  const handleMetricChange = (index: number, key: keyof MetricItem, val: string) => {
    const updated = metricItems.map((m, idx) => {
      if (idx === index) {
        return { ...m, [key]: val };
      }
      return m;
    });
    setMetricItems(updated);
  };

  const saveMetrics = () => {
    updateSocialProof({ metrics: metricItems });
    showToast('Metrics cards updated.');
  };



  return (
    <div className="space-y-8">
      {/* Testimonials Manager */}
      <div className="bg-white rounded-3xl border border-dark/5 shadow-sm p-6 sm:p-8">
        <div className="mb-6 border-b border-dark/5 pb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-dark font-heading">
              Client Testimonials
            </h2>
            <p className="text-sm text-dark/60">
              Manage the slideshow recommendations displayed under the social proof section.
            </p>
          </div>
          {!isTestimonialFormOpen && (
            <button
              onClick={openAddTestimonial}
              className="px-4 py-2.5 bg-accent hover:bg-accent-dark text-cream font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-md shadow-accent/15"
            >
              <Plus size={16} /> Add Testimonial
            </button>
          )}
        </div>

        {isTestimonialFormOpen ? (
          <form onSubmit={saveTestimonial} className="space-y-4 animate-fade-in-up">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-dark/70 mb-1.5">
                  Client Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all"
                  placeholder="e.g. Ahmed K."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark/70 mb-1.5">
                  Client Role / Position
                </label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2.5 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all"
                  placeholder="e.g. UX Designer / Supervisor"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark/70 mb-1.5">
                Quote Recommendation
              </label>
              <textarea
                required
                rows={3}
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                className="w-full px-4 py-3 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all resize-none"
                placeholder="What did this client say about working with you?"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsTestimonialFormOpen(false)}
                className="px-4 py-2 border border-dark/15 text-dark/80 hover:bg-dark/5 font-semibold rounded-xl text-xs transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-accent hover:bg-accent-dark text-cream font-semibold rounded-xl text-xs transition-all shadow-md shadow-accent/15"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-3">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-dark/5 bg-cream/5 flex justify-between items-start gap-4"
              >
                <div className="flex gap-3 text-left">
                  <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 mt-0.5">
                    <Quote size={16} />
                  </div>
                  <div>
                    <blockquote className="text-sm italic text-dark/80">"{t.quote}"</blockquote>
                    <cite className="text-xs font-semibold text-dark/65 not-italic block mt-1.5">
                      {t.name} — <span className="text-dark/45">{t.role}</span>
                    </cite>
                  </div>
                </div>

                <div className="flex gap-1 flex-shrink-0">
                  <button
                    onClick={() => openEditTestimonial(idx)}
                    className="p-1 hover:bg-white text-dark/40 hover:text-accent rounded transition-colors"
                    title="Edit"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => deleteTestimonial(idx)}
                    className="p-1 hover:bg-red-50 text-dark/40 hover:text-red-600 rounded transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Metrics Cards Manager */}
      <div className="bg-white rounded-3xl border border-dark/5 shadow-sm p-6 sm:p-8">
        <div className="mb-6 border-b border-dark/5 pb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-dark font-heading">
            Social Proof Counters
          </h2>
          <p className="text-sm text-dark/60">
            Configure the three quick facts displayed in the statistics grid.
          </p>
        </div>

        <div className="space-y-4">
          {metricItems.map((m, idx) => (
            <div
              key={idx}
              className="grid sm:grid-cols-4 gap-4 p-4 bg-cream/20 border border-dark/5 rounded-2xl items-center"
            >
              <div>
                <label className="block text-xs font-semibold text-dark/65 mb-1">
                  Card Value (e.g. 4)
                </label>
                <input
                  type="text"
                  required
                  value={m.value}
                  onChange={(e) => handleMetricChange(idx, 'value', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-dark/65 mb-1">
                  Label Text
                </label>
                <input
                  type="text"
                  required
                  value={m.label}
                  onChange={(e) => handleMetricChange(idx, 'label', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-dark/65 mb-1">
                  Lucide Icon
                </label>
                <select
                  value={m.icon}
                  onChange={(e) => handleMetricChange(idx, 'icon', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent"
                >
                  {METRIC_ICONS.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-dark/65 mb-1">
                  Icon Color Theme
                </label>
                <select
                  value={m.color}
                  onChange={(e) => handleMetricChange(idx, 'color', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent"
                >
                  {BG_COLORS.map((col) => (
                    <option key={col.value} value={col.value}>
                      {col.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          <div className="pt-4 border-t border-dark/5 flex justify-end">
            <button
              onClick={saveMetrics}
              className="px-5 py-2.5 bg-accent hover:bg-accent-dark text-cream font-semibold rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-accent/15"
            >
              Save Metrics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
