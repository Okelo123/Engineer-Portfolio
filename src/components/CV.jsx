import { Download } from 'lucide-react';
import { useContent } from '../content/useContent';

export default function CV({ onDownload }) {
  const { content } = useContent();
  const cv = content.cv;

  return (
    <section id="cv" className="section section-alt">
      <div className="container" style={{ textAlign: 'center' }}>
        <div className="section-head center">
          <p className="eyebrow">{cv.eyebrow}</p>
          <h2 className="section-title">{cv.title}</h2>
          <p className="section-subtitle">{cv.subtitle}</p>
        </div>

        <div className="cv-section">
          {cv.items.map((item) => (
            <button
              key={item.key}
              className="btn-primary"
              onClick={() => onDownload(item.label, item.url)}
            >
              <Download size={16} /> {item.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
