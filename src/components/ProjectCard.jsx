import { ImageIcon, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function ProjectCard({ project, index }) {
  const [imgError, setImgError] = useState(false);
  const hasImage = project.image_url && project.image_url.trim() !== '' && !imgError;

  return (
    <div
      className="project-card"
      style={{ animation: `fadeUp 0.4s ease both ${index * 0.08}s` }}
    >
      <div
        className="project-image"
        style={{ background: !hasImage ? project.gradient || '#6366f1' : 'none', position: 'relative' }}
      >
        {hasImage ? (
          <img
            src={project.image_url}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: '#fff',
              background: project.gradient || '#6366f1',
              textAlign: 'center',
              padding: '1rem',
            }}
          >
            <ImageIcon size={40} style={{ marginBottom: '0.5rem' }} />
            <span>{imgError ? 'Image URL broken' : 'Set image_url'}</span>
          </div>
        )}

        <div className="project-overlay">
          <a
            href={project.demo_url || '#'}
            target="_blank"
            rel="noreferrer"
            style={{ color: '#fff', background: 'var(--accent)', padding: '0.5rem 1.25rem', borderRadius: 99, fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <ExternalLink size={18} /> Demo
          </a>
        </div>
      </div>

      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 1,
              color: 'var(--accent)',
              background: 'var(--accent-glow)',
              padding: '0.2rem 0.6rem',
              borderRadius: 99,
            }}
          >
            {project.category}
          </span>
        </div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{project.title}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '1rem' }}>{project.desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {project.techs.map((t) => (
            <span
              key={t}
              style={{
                fontSize: '0.7rem',
                padding: '0.2rem 0.6rem',
                borderRadius: 6,
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
