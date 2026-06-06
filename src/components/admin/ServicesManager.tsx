import React, { useState } from 'react';
import { useData, ServiceItem } from '../../context/DataContext';
import { Trash2, Edit3, Plus, Cpu, HelpCircle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface ServicesManagerProps {
  showToast: (msg: string) => void;
}

// Curated list of Lucide icons available for the service section
const AVAILABLE_ICONS = [
  'Monitor',
  'Layout',
  'Palette',
  'Plug',
  'Code',
  'Server',
  'Smartphone',
  'Search',
  'Shield',
  'Database',
  'Settings',
  'Compass',
  'Globe',
  'Layers',
  'Cpu',
  'Terminal'
];

export default function ServicesManager({ showToast }: ServicesManagerProps) {
  const { data, updateServices } = useData();
  const services = data.services;

  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Monitor');

  const openAddForm = () => {
    setEditingService(null);
    setTitle('');
    setDescription('');
    setIcon('Monitor');
    setIsFormOpen(true);
  };

  const openEditForm = (srv: ServiceItem) => {
    setEditingService(srv);
    setTitle(srv.title);
    setDescription(srv.description);
    setIcon(srv.icon);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingService(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const serviceData: ServiceItem = {
      id: editingService ? editingService.id : Date.now().toString(),
      title,
      description,
      icon
    };

    let updated: ServiceItem[] = [];
    if (editingService) {
      updated = services.map((s) => (s.id === editingService.id ? serviceData : s));
      showToast('Service updated successfully!');
    } else {
      updated = [...services, serviceData];
      showToast('New service added successfully!');
    }

    updateServices(updated);
    closeForm();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      const updated = services.filter((s) => s.id !== id);
      updateServices(updated);
      showToast('Service deleted.');
    }
  };

  // Helper to render icon dynamically
  const renderIcon = (iconName: string, size = 20) => {
    const IconComponent = (LucideIcons as any)[iconName] || HelpCircle;
    return <IconComponent size={size} />;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-dark font-heading">
            Services Management
          </h2>
          <p className="text-sm text-dark/60">
            Customize the list of capabilities and services offered on your homepage.
          </p>
        </div>
        {!isFormOpen && (
          <button
            onClick={openAddForm}
            className="px-4 py-2.5 bg-accent hover:bg-accent-dark text-cream font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-md shadow-accent/15"
          >
            <Plus size={16} /> Add New Service
          </button>
        )}
      </div>

      {isFormOpen ? (
        /* Form view */
        <div className="bg-white rounded-3xl border border-dark/5 shadow-sm p-6 sm:p-8 animate-fade-in-up">
          <div className="mb-6 border-b border-dark/5 pb-4">
            <h3 className="text-lg font-bold text-dark font-heading">
              {editingService ? `Edit Service: ${editingService.title}` : 'Add a New Service'}
            </h3>
            <p className="text-xs text-dark/50 mt-1">
              Select an icon, define service header, and list deliverables description.
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-dark/70 mb-1.5">
                Service Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all"
                placeholder="e.g. Responsive Design"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark/70 mb-2">
                Select Service Icon
              </label>
              {/* Icon Grid Picker */}
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 p-3 bg-cream/25 border border-dark/10 rounded-2xl max-h-40 overflow-y-auto">
                {AVAILABLE_ICONS.map((iconName) => (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => setIcon(iconName)}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all gap-1.5 hover:bg-white ${
                      icon === iconName
                        ? 'bg-accent text-cream border-accent shadow-sm'
                        : 'bg-white/50 border-dark/5 text-dark/65'
                    }`}
                    title={iconName}
                  >
                    {renderIcon(iconName, 18)}
                    <span className="text-[9px] font-medium truncate max-w-full leading-none">
                      {iconName}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark/70 mb-1.5">
                Service Description
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all resize-none"
                placeholder="Detail what is included in this service offering..."
              />
            </div>

            <div className="pt-4 border-t border-dark/5 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeForm}
                className="px-5 py-2.5 border border-dark/15 text-dark/80 hover:bg-dark/5 font-semibold rounded-xl text-sm transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-accent hover:bg-accent-dark text-cream font-semibold rounded-xl text-sm transition-all shadow-md shadow-accent/15"
              >
                Save Service
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* List view */
        <div className="space-y-4">
          {services.length === 0 ? (
            <div className="bg-white rounded-3xl border border-dark/5 shadow-sm p-16 text-center">
              <Cpu className="mx-auto text-dark/20 mb-4" size={44} />
              <h3 className="text-lg font-bold text-dark font-heading">No services listed</h3>
              <p className="text-sm text-dark/50 mt-1">Click the "Add New Service" button to populate lists.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  className="bg-white rounded-2xl border border-dark/5 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                    {renderIcon(srv.icon, 22)}
                  </div>
                  <div className="flex-grow space-y-1.5 text-left">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-bold text-dark text-sm sm:text-base leading-tight">
                        {srv.title}
                      </h4>
                      <div className="flex gap-1 flex-shrink-0">
                        <button
                          onClick={() => openEditForm(srv)}
                          className="p-1 hover:bg-cream/40 text-dark/40 hover:text-accent rounded transition-colors"
                          title="Edit"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(srv.id)}
                          className="p-1 hover:bg-red-50 text-dark/40 hover:text-red-600 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-dark/65 font-normal leading-relaxed">
                      {srv.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
