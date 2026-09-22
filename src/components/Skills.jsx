import { Brain, Code2, Cpu, Globe } from 'lucide-react';
import { useContent } from '../content/useContent';

const ICONS = { Code2, Cpu, Brain, Globe };

export default function Skills() {
  const { content } = useContent();
  const skills = content.skills;

  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{skills.eyebrow}</p>
          <h2 className="section-title">{skills.title}</h2>
          <p className="section-subtitle">{skills.subtitle}</p>
        </div>

        <div className="grid-skills">
          {skills.groups.map((group) => {
            const Icon = ICONS[group.icon] || Code2;
            return (
              <div key={group.title} className="card" style={{ padding: '1.4rem 1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1.25rem' }}>
                  <div className="skill-icon">
                    <Icon size={16} />
                  </div>
                  <h3 style={{ fontWeight: 600, fontSize: '1rem' }}>{group.title}</h3>
                </div>

                <div>
                  {group.skills.map((skill, i) => (
                    <div key={`${skill.name}-${i}`} style={{ marginTop: i === 0 ? 0 : '0.9rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                        <span style={{ fontSize: '0.88rem' }}>{skill.name}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{skill.level}%</span>
                      </div>
                      <div className="skill-bar-track">
                        <div className="skill-bar-fill" style={{ width: `${Math.max(0, Math.min(100, Number(skill.level) || 0))}%` }} />
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
