import { useMemo, useState } from 'react';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'iot', label: 'IoT' },
  { key: 'ai', label: 'AI' },
  { key: 'software', label: 'Software' },
];

export default function Projects() {
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="projects" style={{ padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="animate-on-scroll" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.8rem', letterSpacing: 3, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Portfolio
          </p>
          <h2 className="section-title">Featured Projects</h2>
          <div className="section-subtitle">IoT · AI · Software</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`filter-btn${filter === f.key ? ' active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: '1.5rem' }}>
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
