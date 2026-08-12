import { Zap, User } from 'lucide-react';

const METRICS = [
  { label: 'Projects', value: 9 },
  { label: 'Domains', value: 3 },
  { label: 'Technologies', value: 8 },
  { label: '% Dedication', value: 100 },
];

export default function About({ about }) {
  return (
    <section id="about" style={{ padding: '100px 0', position: 'relative' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="animate-on-scroll" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.8rem', letterSpacing: 3, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            About
          </p>
          <h2 className="section-title">About Me</h2>
          <div className="section-subtitle">Crafting innovative digital experiences</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '2rem', marginBottom: '2rem' }}>
          <div className="glass-card animate-on-scroll" style={{ padding: '2rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <User size={24} color="#fff" />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Who I Am</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>{about}</p>
          </div>

          <div className="glass-card animate-on-scroll" style={{ padding: '2rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Zap size={24} color="#fff" />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>What I Do</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>
              From designing smart IoT devices with Arduino and ESP32 to building AI-powered chatbots and recommendation systems — I create technology that solves real-world challenges across multiple domains.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '1rem' }}>
          {METRICS.map((metric) => (
            <div key={metric.label} className="glass-card animate-on-scroll" style={{ padding: '1.75rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.75rem' }}>
                {metric.value}
              </div>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
