import { ExternalLink, Github } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useData } from '../context/DataContext';

export default function Projects() {
  const { ref, isInView } = useInView(0.05);
  const { data } = useData();
  const projects = data.projects;

  return (
    <section id="projects" ref={ref} className="section-padding relative">
      <div className="absolute inset-0 bg-white/50" />
      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span
            className={`inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4 opacity-0 ${
              isInView ? 'animate-fade-in-up' : ''
            }`}
          >
            Explore Projects
          </span>
          <h2
            className={`heading-lg text-dark opacity-0 ${
              isInView ? 'animate-fade-in-up stagger-1' : ''
            }`}
          >
            Featured Work
          </h2>
          <p
            className={`mt-4 text-dark/60 text-lg opacity-0 ${
              isInView ? 'animate-fade-in-up stagger-2' : ''
            }`}
          >
            A selection of projects that showcase my approach to building
            thoughtful, user-centered web experiences.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <article
              key={project.title}
              className={`group card card-hover overflow-hidden opacity-0 ${
                isInView ? `animate-fade-in-up stagger-${i + 1}` : ''
              }`}
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-dark/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <a
                    href={project.liveUrl}
                    className="p-2.5 bg-white/90 rounded-lg text-dark hover:bg-white transition-colors"
                    aria-label="Live demo"
                  >
                    <ExternalLink size={16} />
                  </a>
                  <a
                    href={project.repoUrl}
                    className="p-2.5 bg-white/90 rounded-lg text-dark hover:bg-white transition-colors"
                    aria-label="Source code"
                  >
                    <Github size={16} />
                  </a>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-dark mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-dark/60 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
