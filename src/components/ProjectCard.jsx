import { useState } from 'react';

export default function ProjectCard({ project, filters }) {
  const [imgError, setImgError] = useState(false);
  const hasImage = project.image_url && project.image_url.trim() !== '' && !imgError;
  const hasDemo = project.demo_url && project.demo_url !== '#';
  const category = filters?.find((item) => item.key === project.category)?.label || project.category;

  return (
    <article className="project-card">
      <div className="project-image">
        {hasImage ? (
          <img
            src={project.image_url}
            alt=""
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="project-fallback">
            <span>{project.title}</span>
          </div>
        )}

        {hasDemo && (
          <div className="project-overlay">
            <a href={project.demo_url} target="_blank" rel="noreferrer" className="btn-primary">
              View project
            </a>
          </div>
        )}
      </div>

      <div style={{ padding: '1.15rem 1.2rem 1.3rem' }}>
        <p className="category" style={{ marginBottom: '0.4rem' }}>{category}</p>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.4rem' }}>{project.title}</h3>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '0.9rem' }}>{project.desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {project.techs.map((tech) => (
            <span key={tech} className="tag">{tech}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
