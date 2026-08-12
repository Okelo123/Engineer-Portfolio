import { FileText, FolderOpen, User } from 'lucide-react';

export default function Hero({ profile }) {
  const { name, title, tagline, profileImageUrl } = profile;

  return (
    <section
      id="hero"
      style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '100px 0 60px' }}
    >
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            opacity: 0.3,
          }}
        />
        <div
          style={{ position: 'absolute', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.15, animation: 'float 8s ease-in-out infinite', width: 400, height: 400, background: 'var(--accent)', top: -100, right: -100 }}
        />
        <div
          style={{ position: 'absolute', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.15, animation: 'float 8s ease-in-out infinite 2s', width: 300, height: 300, background: '#8b5cf6', bottom: -50, left: -50 }}
        />
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3rem', position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <p style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: 2, textTransform: 'uppercase', marginBottom: '1rem', animation: 'fadeUp 0.8s ease both' }}>
            Welcome to my portfolio
          </p>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem', animation: 'fadeUp 0.8s ease both 0.2s' }}>
            {name}
          </h1>
          <p style={{ fontSize: 'clamp(1rem,2.5vw,1.35rem)', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '1.5rem', animation: 'fadeUp 0.8s ease both 0.4s' }}>
            {title}
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem', maxWidth: 500, marginBottom: '2rem', animation: 'fadeUp 0.8s ease both 0.6s' }}>
            {tagline}
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#projects" className="btn-primary">
              <FolderOpen size={18} /> View Projects
            </a>
            <a href="#contact" className="btn-secondary">
              <FileText size={18} /> Contact Me
            </a>
          </div>
        </div>

        <div style={{ flex: '0 0 auto', animation: 'scaleIn 1s ease both 0.6s', position: 'relative' }}>
          <div className="hero-morph">
            <div className="hero-morph-inner">
              {profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt="Profile"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <User size={40} style={{ marginBottom: '0.5rem' }} />
                  <span>Profile URL</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
