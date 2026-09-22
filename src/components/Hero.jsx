import { User } from 'lucide-react';
import { useContent } from '../content/useContent';

export default function Hero() {
  const { content } = useContent();
  const { name, eyebrow, title, tagline, imageUrl, primaryButton, secondaryButton } = content.profile;

  return (
    <section id="hero" className="hero">
      <div className="container hero-grid">
        <div>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="hero-name">{name}</h1>
          {title && <p className="hero-role">{title}</p>}
          {tagline && <p className="lede">{tagline}</p>}
          <div className="hero-actions">
            <a href="#projects" className="btn-primary">{primaryButton}</a>
            <a href="#contact" className="btn-secondary">{secondaryButton}</a>
          </div>
        </div>

        <div className="portrait">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="portrait-empty">
              <User size={28} />
              <span>Photo</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
