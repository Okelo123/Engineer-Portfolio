import { useContent } from '../content/useContent';

export default function About() {
  const { content } = useContent();
  const about = content.about;

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{about.eyebrow}</p>
          <h2 className="section-title">{about.title}</h2>
          <p className="section-subtitle">{about.subtitle}</p>
        </div>

        <div className="grid-2" style={{ marginBottom: '1.25rem' }}>
          <div className="card" style={{ padding: '1.5rem 1.6rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.75rem' }}>{about.profileTitle}</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.75 }}>{about.profile}</p>
          </div>

          <div className="card" style={{ padding: '1.5rem 1.6rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.75rem' }}>{about.focusTitle}</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.75 }}>{about.focus}</p>
          </div>
        </div>

        <div className="grid-metrics">
          {about.metrics.map((metric) => (
            <div key={`${metric.label}-${metric.value}`} className="card" style={{ padding: '1.25rem 1.1rem' }}>
              <div className="metric-value">{metric.value}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
