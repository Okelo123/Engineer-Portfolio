import { Brain, Code2, Cpu, Globe } from 'lucide-react';
import { skillGroups } from '../data/projects';

const ICONS = { Code2, Cpu, Brain, Globe };

export default function Skills() {
  return (
    <section id="skills" style={{ padding: '100px 0', background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="animate-on-scroll" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.8rem', letterSpacing: 3, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Expertise
          </p>
          <h2 className="section-title">Skills &amp; Technologies</h2>
          <div className="section-subtitle">Tools I work with</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '2rem' }}>
          {skillGroups.map((group) => {
            const Icon = ICONS[group.icon];
            return (
              <div key={group.title} className="glass-card animate-on-scroll" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: group.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={20} color="#fff" />
                  </div>
                  <h3 style={{ fontWeight: 600, fontSize: '1.1rem' }}>{group.title}</h3>
                </div>

                <div>
                  {group.skills.map((skill, i) => (
                    <div key={skill.name} style={{ marginTop: i === 0 ? 0 : '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.85rem' }}>{skill.name}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{skill.level}%</span>
                      </div>
                      <div className="skill-bar-track">
                        <div className="skill-bar-fill" data-width={skill.level} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
