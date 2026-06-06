import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Trash2, HelpCircle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface AboutManagerProps {
  showToast: (msg: string) => void;
}

const VALUE_ICONS = ['Target', 'Lightbulb', 'Users', 'Award', 'Sparkles', 'Shield', 'Bookmark', 'Activity'];

export default function AboutManager({ showToast }: AboutManagerProps) {
  const { data, updateAbout } = useData();
  const about = data.about;

  const [badge, setBadge] = useState(about.badge);
  const [title, setTitle] = useState(about.title);
  const [description, setDescription] = useState(about.description);
  
  // Credentials as line-by-line text area
  const [credentialsText, setCredentialsText] = useState(() => about.credentials.join('\n'));

  // Stats
  const [projectsCount, setProjectsCount] = useState(about.stats.projectsCount);
  const [coursesCount, setCoursesCount] = useState(about.stats.coursesCount);
  const [experienceCount, setExperienceCount] = useState(about.stats.experienceCount);

  // Core Values list
  const [values, setValues] = useState(() => about.values || []);
  const [newValueLabel, setNewValueLabel] = useState('');
  const [newValueIcon, setNewValueIcon] = useState('Target');

  const handleAddValue = () => {
    if (!newValueLabel.trim()) return;
    setValues([...values, { icon: newValueIcon, label: newValueLabel.trim() }]);
    setNewValueLabel('');
    setNewValueIcon('Target');
  };

  const handleDeleteValue = (index: number) => {
    setValues(values.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Parse credentials lines
    const credentialsArray = credentialsText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    updateAbout({
      badge,
      title,
      description,
      values,
      credentials: credentialsArray,
      stats: {
        projectsCount,
        coursesCount,
        experienceCount
      }
    });

    showToast('About page content saved.');
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName] || HelpCircle;
    return <IconComponent size={16} className="text-accent" />;
  };

  return (
    <div className="bg-white rounded-3xl border border-dark/5 shadow-sm p-6 sm:p-8">
      <div className="mb-6 border-b border-dark/5 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-dark font-heading">
          Edit About & Qualifications
        </h2>
        <p className="text-sm text-dark/60">
          Modify the biography, credentials checkboxes list, and quick stats numbers.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header Block */}
        <div className="grid sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-semibold text-dark/70 mb-1.5">
              Section Badge Tag
            </label>
            <input
              type="text"
              required
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              className="w-full px-4 py-2.5 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all"
              placeholder="e.g. About Me"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-dark/70 mb-1.5">
              Section Title Header
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all"
              placeholder="e.g. Building the Web, One Pixel at a Time"
            />
          </div>
        </div>

        {/* Bio Text */}
        <div>
          <label className="block text-sm font-semibold text-dark/70 mb-1.5">
            Biography Paragraph
          </label>
          <textarea
            required
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all resize-none"
            placeholder="Tell your professional story..."
          />
        </div>

        {/* Credentials and Stats */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Credentials Bullet-Points */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-dark/70">
              Credentials & Highlights (One per line)
            </label>
            <textarea
              rows={7}
              value={credentialsText}
              onChange={(e) => setCredentialsText(e.target.value)}
              className="w-full px-4 py-3 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all font-mono"
              placeholder="Proficient in React&#10;Delivered 4 projects&#10;Completed CSS specialization"
            />
            <span className="text-[11px] text-dark/45 font-semibold block leading-none">
              Press Enter/Return to start a new credential line item.
            </span>
          </div>

          {/* Quick Stats Grid */}
          <div className="bg-cream/10 border border-dark/5 p-5 rounded-2xl space-y-4">
            <span className="text-xs font-bold text-dark/40 uppercase tracking-wider block">
              Stats Indicators
            </span>
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-dark/65 mb-1.5">
                  Projects Count
                </label>
                <input
                  type="text"
                  required
                  value={projectsCount}
                  onChange={(e) => setProjectsCount(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all text-center font-bold"
                  placeholder="4"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-dark/65 mb-1.5">
                  Courses Count
                </label>
                <input
                  type="text"
                  required
                  value={coursesCount}
                  onChange={(e) => setCoursesCount(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all text-center font-bold"
                  placeholder="2"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-dark/65 mb-1.5">
                  Experience (Years)
                </label>
                <input
                  type="text"
                  required
                  value={experienceCount}
                  onChange={(e) => setExperienceCount(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all text-center font-bold"
                  placeholder="0.5+"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Builder */}
        <div className="bg-cream/15 p-5 border border-dark/5 rounded-2xl space-y-4">
          <span className="text-xs font-bold text-dark/40 uppercase tracking-wider block">
            Core Values List
          </span>

          {/* List existing values */}
          <div className="space-y-2">
            {values.map((value, idx) => (
              <div key={idx} className="flex justify-between items-center p-2.5 bg-white rounded-xl border border-dark/5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    {renderIcon(value.icon)}
                  </div>
                  <span className="text-sm font-semibold text-dark">{value.label}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteValue(idx)}
                  className="p-1.5 text-dark/40 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Remove Value"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>

          {/* Add a new value field */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <div className="w-full sm:w-1/3">
              <select
                value={newValueIcon}
                onChange={(e) => setNewValueIcon(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-dark/10 rounded-xl text-dark text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
              >
                {VALUE_ICONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-grow flex gap-2">
              <input
                type="text"
                value={newValueLabel}
                onChange={(e) => setNewValueLabel(e.target.value)}
                className="flex-grow px-4 py-2 bg-white border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all"
                placeholder="New core value label..."
              />
              <button
                type="button"
                onClick={handleAddValue}
                className="px-4 py-2 bg-accent hover:bg-accent-dark text-cream font-bold rounded-xl text-sm flex items-center gap-1 transition-colors"
              >
                <Plus size={16} /> Add
              </button>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-dark/5 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3.5 bg-accent hover:bg-accent-dark text-cream font-semibold rounded-xl text-sm transition-all shadow-md shadow-accent/15"
          >
            Save About Settings
          </button>
        </div>
      </form>
    </div>
  );
}
