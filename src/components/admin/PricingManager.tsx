import React, { useState } from 'react';
import { useData, PricingPlan, FeatureItem } from '../../context/DataContext';
import { Check, X, Plus, Trash2 } from 'lucide-react';

interface PricingManagerProps {
  showToast: (msg: string) => void;
}

export default function PricingManager({ showToast }: PricingManagerProps) {
  const { data, updatePricing } = useData();
  const plans = data.pricing;

  const [activePlanIdx, setActivePlanIdx] = useState(0);

  // Form Fields for selected plan index
  const activePlan = plans[activePlanIdx];

  const handleFieldChange = (key: keyof PricingPlan, val: any) => {
    const updated = plans.map((p, idx) => {
      if (idx === activePlanIdx) {
        return { ...p, [key]: val };
      }
      // If setting featured to true, ensure other plans are false
      if (key === 'featured' && val === true && idx !== activePlanIdx) {
        return { ...p, featured: false };
      }
      return p;
    });
    updatePricing(updated);
  };

  const handleFeatureToggle = (featIdx: number) => {
    const updatedFeatures = activePlan.features.map((feat, idx) =>
      idx === featIdx ? { ...feat, included: !feat.included } : feat
    );
    handleFieldChange('features', updatedFeatures);
  };

  const handleFeatureTextChange = (featIdx: number, val: string) => {
    const updatedFeatures = activePlan.features.map((feat, idx) =>
      idx === featIdx ? { ...feat, text: val } : feat
    );
    handleFieldChange('features', updatedFeatures);
  };

  const handleAddFeature = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const newText = formData.get('featureText') as string;

    if (!newText.trim()) return;

    const newFeature: FeatureItem = {
      text: newText.trim(),
      included: true
    };

    handleFieldChange('features', [...activePlan.features, newFeature]);
    form.reset();
    showToast('New feature added to plan.');
  };

  const handleDeleteFeature = (featIdx: number) => {
    const updatedFeatures = activePlan.features.filter((_, idx) => idx !== featIdx);
    handleFieldChange('features', updatedFeatures);
    showToast('Feature removed.');
  };

  const handleSavePlan = () => {
    showToast(`${activePlan.name} plan saved successfully.`);
  };

  return (
    <div className="bg-white rounded-3xl border border-dark/5 shadow-sm p-6 sm:p-8">
      <div className="mb-6 border-b border-dark/5 pb-4 flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-dark font-heading">
            Pricing Plans & Rates
          </h2>
          <p className="text-sm text-dark/60">
            Customize package names, rates, descriptions, and deliverables checklist.
          </p>
        </div>

        {/* Plan Selectors */}
        <div className="flex bg-cream/35 border border-dark/10 p-1.5 rounded-2xl w-full sm:w-auto">
          {plans.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setActivePlanIdx(idx)}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                activePlanIdx === idx
                  ? 'bg-accent text-cream shadow-md shadow-accent/15'
                  : 'text-dark/50 hover:text-dark'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left Form (Plan Fields) */}
        <div className="lg:col-span-2 space-y-5">
          <span className="text-xs font-bold text-dark/40 uppercase tracking-wider block">
            Plan Settings
          </span>

          <div>
            <label className="block text-sm font-semibold text-dark/70 mb-1.5">
              Plan Title
            </label>
            <input
              type="text"
              required
              value={activePlan.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              className="w-full px-4 py-2.5 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all font-bold"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-dark/70 mb-1.5">
              Price Rate (USD)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-dark/40 font-bold text-sm">
                $
              </div>
              <input
                type="number"
                required
                value={activePlan.price}
                onChange={(e) => handleFieldChange('price', parseInt(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-2.5 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-dark/70 mb-1.5">
              Short Pitch Description
            </label>
            <textarea
              required
              rows={3}
              value={activePlan.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              className="w-full px-4 py-2.5 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all resize-none leading-relaxed font-normal"
            />
          </div>

          {/* Toggle Featured Status */}
          <div className="flex items-center justify-between p-3.5 bg-cream/15 rounded-xl border border-dark/5">
            <div>
              <span className="text-sm font-semibold text-dark">Highlight as Popular</span>
              <p className="text-[11px] text-dark/45">Featured plans display with highlighted border styles.</p>
            </div>
            <button
              onClick={() => handleFieldChange('featured', !activePlan.featured)}
              className={`w-11 h-6 rounded-full transition-all relative ${
                activePlan.featured ? 'bg-accent' : 'bg-dark/20'
              }`}
            >
              <span
                className={`absolute w-4.5 h-4.5 bg-white rounded-full top-0.75 transition-all ${
                  activePlan.featured ? 'right-0.75' : 'left-0.75'
                }`}
              />
            </button>
          </div>

          <button
            onClick={handleSavePlan}
            className="w-full py-3 bg-accent hover:bg-accent-dark text-cream font-semibold rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-accent/15"
          >
            Save Plan settings
          </button>
        </div>

        {/* Right Form (Features CRUD list) */}
        <div className="lg:col-span-3 space-y-5">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-dark/40 uppercase tracking-wider block">
              Plan Deliverables & Features
            </span>
          </div>

          {/* List items */}
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
            {activePlan.features.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 bg-cream/15 rounded-xl border border-dark/5 hover:border-dark/10 transition-colors"
              >
                {/* Include/Exclude checkbox */}
                <button
                  type="button"
                  onClick={() => handleFeatureToggle(idx)}
                  className={`p-1.5 rounded-lg border transition-all ${
                    feat.included
                      ? 'bg-accent/10 border-accent/20 text-accent'
                      : 'bg-dark/5 border-dark/10 text-dark/25'
                  }`}
                  title={feat.included ? 'Currently Included' : 'Currently Excluded'}
                >
                  {feat.included ? <Check size={14} /> : <X size={14} />}
                </button>

                {/* Edit text */}
                <input
                  type="text"
                  value={feat.text}
                  onChange={(e) => handleFeatureTextChange(idx, e.target.value)}
                  className={`flex-grow bg-transparent border-b border-transparent hover:border-dark/15 focus:border-accent focus:outline-none text-xs sm:text-sm text-dark font-medium ${
                    feat.included ? '' : 'text-dark/40 line-through'
                  }`}
                />

                <button
                  type="button"
                  onClick={() => handleDeleteFeature(idx)}
                  className="p-1 text-dark/30 hover:text-red-600 rounded hover:bg-red-50"
                  title="Remove Feature"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* Form to add features */}
          <form onSubmit={handleAddFeature} className="bg-cream/10 p-4 rounded-2xl border border-dark/5 flex gap-2">
            <input
              type="text"
              name="featureText"
              required
              className="flex-grow px-3 py-2 bg-white border border-dark/10 rounded-xl text-xs sm:text-sm text-dark focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none"
              placeholder="e.g. 1 month post-launch support"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-accent hover:bg-accent-dark text-cream font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1 transition-all"
            >
              <Plus size={14} /> Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
