import { useMemo, useState } from 'react';
import { useContent } from '../content/useContent';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const { content } = useContent();
  const section = content.projectsSection;
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(
    () => (filter === 'all' ? content.projects : content.projects.filter((project) => project.category === filter)),
    [content.projects, filter]
  );

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-head center">
          <p className="eyebrow">{section.eyebrow}</p>
          <h2 className="section-title">{section.title}</h2>
          <p className="section-subtitle">{section.subtitle}</p>
        </div>

        <div className="filter-row">
          {section.filters.map((item) => (
            <button
              key={item.key}
              className={`filter-btn${filter === item.key ? ' active' : ''}`}
              onClick={() => setFilter(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="grid-projects">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} filters={section.filters} />
          ))}
        </div>

        <div style={{ marginTop: '4.5rem' }}>
          <div className="section-head">
            <p className="eyebrow">{section.practiceEyebrow}</p>
            <h2 className="section-title">{section.practiceTitle}</h2>
          </div>

          <div className="grid-skills">
            {section.capabilities.map((item) => (
              <div key={item.title} className="card" style={{ padding: '1.4rem 1.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.55rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
