import React, { useState } from 'react';
import { useData, ProjectItem } from '../../context/DataContext';
import { Trash2, Edit3, Plus, ArrowUp, ArrowDown, ExternalLink, Github, Image } from 'lucide-react';
import ImageUploader from './ImageUploader';

interface ProjectsManagerProps {
  showToast: (msg: string) => void;
}

export default function ProjectsManager({ showToast }: ProjectsManagerProps) {
  const { data, updateProjects } = useData();
  const projects = data.projects;

  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');

  const openAddForm = () => {
    setEditingProject(null);
    setTitle('');
    setDescription('');
    setImage('');
    setTagsInput('');
    setLiveUrl('');
    setRepoUrl('');
    setIsFormOpen(true);
  };

  const openEditForm = (proj: ProjectItem) => {
    setEditingProject(proj);
    setTitle(proj.title);
    setDescription(proj.description);
    setImage(proj.image);
    setTagsInput(proj.tags.join(', '));
    setLiveUrl(proj.liveUrl);
    setRepoUrl(proj.repoUrl);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingProject(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const tagsArray = tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const projectData: ProjectItem = {
      id: editingProject ? editingProject.id : Date.now().toString(),
      title,
      description,
      image,
      tags: tagsArray,
      liveUrl,
      repoUrl
    };

    let updatedProjects: ProjectItem[] = [];
    if (editingProject) {
      // Edit existing
      updatedProjects = projects.map((p) => (p.id === editingProject.id ? projectData : p));
      showToast('Project updated successfully!');
    } else {
      // Add new
      updatedProjects = [...projects, projectData];
      showToast('New project added successfully!');
    }

    updateProjects(updatedProjects);
    closeForm();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updated = projects.filter((p) => p.id !== id);
      updateProjects(updated);
      showToast('Project deleted.');
    }
  };

  // Reordering helpers
  const moveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...projects];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    updateProjects(updated);
    showToast('Project moved up.');
  };

  const moveDown = (index: number) => {
    if (index === projects.length - 1) return;
    const updated = [...projects];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    updateProjects(updated);
    showToast('Project moved down.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-dark font-heading">
            Projects Portfolio
          </h2>
          <p className="text-sm text-dark/60">
            Add, update, or remove projects shown in the featured work gallery.
          </p>
        </div>
        {!isFormOpen && (
          <button
            onClick={openAddForm}
            className="px-4 py-2.5 bg-accent hover:bg-accent-dark text-cream font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-md shadow-accent/15"
          >
            <Plus size={16} /> Add New Project
          </button>
        )}
      </div>

      {isFormOpen ? (
        /* Form view */
        <div className="bg-white rounded-3xl border border-dark/5 shadow-sm p-6 sm:p-8 animate-fade-in-up">
          <div className="mb-6 border-b border-dark/5 pb-4">
            <h3 className="text-lg font-bold text-dark font-heading">
              {editingProject ? `Edit Project: ${editingProject.title}` : 'Add a New Portfolio Project'}
            </h3>
            <p className="text-xs text-dark/50 mt-1">
              Provide project assets, description, metadata tags, and references.
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-dark/70 mb-1.5">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all"
                  placeholder="e.g. E-Commerce Dashboard"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark/70 mb-1.5">
                  Metadata Tags (comma separated)
                </label>
                <input
                  type="text"
                  required
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full px-4 py-2.5 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all"
                  placeholder="e.g. React, Supabase, Tailwind"
                />
              </div>
            </div>

            <div>
              <ImageUploader
                label="Image Banner"
                value={image}
                onChange={(base64) => setImage(base64)}
              />
              <div className="mt-2">
                <label className="block text-[10px] font-semibold text-dark/50 mb-1">
                  Or paste Image URL manually:
                </label>
                <input
                  type="text"
                  value={image.startsWith('data:') ? '' : image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-4 py-2 bg-cream/20 border border-dark/10 rounded-xl text-dark text-xs focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark/70 mb-1.5">
                Project Short Description
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all resize-none"
                placeholder="Briefly describe what this project does and the technology stack..."
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-dark/70 mb-1.5">
                  Live Demo Web Link
                </label>
                <input
                  type="text"
                  required
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  className="w-full px-4 py-2.5 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all"
                  placeholder="e.g. https://domain.com or #"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark/70 mb-1.5">
                  GitHub Code Repository Link
                </label>
                <input
                  type="text"
                  required
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="w-full px-4 py-2.5 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all"
                  placeholder="e.g. https://github.com/user/repo or #"
                />
              </div>
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
                Save Project
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* List view */
        <div className="space-y-4">
          {projects.length === 0 ? (
            <div className="bg-white rounded-3xl border border-dark/5 shadow-sm p-16 text-center">
              <Image className="mx-auto text-dark/20 mb-4" size={44} />
              <h3 className="text-lg font-bold text-dark font-heading">No projects showcased</h3>
              <p className="text-sm text-dark/50 mt-1">Click the "Add New Project" button to populate your portfolio.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {projects.map((proj, index) => (
                <div
                  key={proj.id}
                  className="bg-white rounded-2xl border border-dark/5 shadow-sm overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Project Image Banner */}
                    <div className="aspect-video w-full bg-cream/20 relative">
                      <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 flex gap-1 bg-white/95 rounded-lg p-1 shadow-md">
                        <button
                          onClick={() => moveUp(index)}
                          disabled={index === 0}
                          className="p-1 text-dark/50 hover:text-accent disabled:opacity-30 disabled:hover:text-dark/50"
                          title="Move Up"
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button
                          onClick={() => moveDown(index)}
                          disabled={index === projects.length - 1}
                          className="p-1 text-dark/50 hover:text-accent disabled:opacity-30 disabled:hover:text-dark/50"
                          title="Move Down"
                        >
                          <ArrowDown size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <h4 className="font-bold text-dark text-base sm:text-lg truncate">{proj.title}</h4>
                      <p className="text-xs text-dark/60 line-clamp-3 leading-relaxed font-normal">{proj.description}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {proj.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-accent/10 text-accent text-[10px] font-semibold rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 border-t border-dark/5 flex items-center justify-between gap-4">
                    <div className="flex gap-2">
                      {proj.liveUrl !== '#' && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 bg-cream/40 text-dark/60 hover:text-accent rounded-lg border border-dark/5"
                          title="Live Demo"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                      {proj.repoUrl !== '#' && (
                        <a
                          href={proj.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 bg-cream/40 text-dark/60 hover:text-accent rounded-lg border border-dark/5"
                          title="GitHub Code"
                        >
                          <Github size={14} />
                        </a>
                      )}
                    </div>

                    <div className="flex gap-1.5">
                      <button
                        onClick={() => openEditForm(proj)}
                        className="px-3 py-1.5 bg-accent/10 text-accent hover:bg-accent hover:text-cream rounded-xl text-xs font-semibold flex items-center gap-1 transition-all"
                      >
                        <Edit3 size={12} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(proj.id)}
                        className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all"
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
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
