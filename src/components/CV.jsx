import { Download } from 'lucide-react';

const BUTTONS = [
  { key: 'iot', label: 'IoT CV', color: 'var(--accent)' },
  { key: 'ai', label: 'AI CV', color: '#8b5cf6' },
  { key: 'software', label: 'Software CV', color: '#06b6d4' },
];

export default function CV({ cvLinks, onDownload }) {
  return (
    <section id="cv" style={{ padding: '100px 0', background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
        <div className="animate-on-scroll">
          <p style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.8rem', letterSpacing: 3, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Download
          </p>
          <h2 className="section-title">Curriculum Vitae</h2>
          <div className="section-subtitle">My professional background in IoT, AI &amp; Software Engineering</div>
        </div>

        <div className="cv-section">
          {BUTTONS.map((btn) => (
            <button
              key={btn.key}
              className="btn-primary"
              style={{ background: btn.color }}
              onClick={() => onDownload(btn.key, cvLinks[btn.key])}
            >
              <Download size={18} /> {btn.label}
            </button>
          ))}
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '1.5rem' }}>
          Click any button to download the CV tailored to that specialization.
        </p>
      </div>
    </section>
  );
}
