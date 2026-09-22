import { useState } from 'react';
import { useContent } from '../content/useContent';

const ICONS = [
  { value: 'Code2', label: 'Code' },
  { value: 'Cpu', label: 'Chip' },
  { value: 'Brain', label: 'Brain' },
  { value: 'Globe', label: 'Globe' },
];

const SECTIONS = [
  ['profile', 'Profile'],
  ['about', 'About'],
  ['skills', 'Skills'],
  ['projects', 'Projects'],
  ['cv', 'CV'],
  ['contact', 'Contact'],
  ['footer', 'Footer'],
];

function Field({ label, value, onChange, multiline = false }) {
  return (
    <label className="editor-field">
      <span>{label}</span>
      {multiline ? (
        <textarea className="form-input" rows={3} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className="form-input" value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

function TechField({ techs, onChange }) {
  const [text, setText] = useState(() => techs.join(', '));
  return (
    <label className="editor-field">
      <span>Technologies</span>
      <input
        className="form-input"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          onChange(e.target.value.split(',').map((item) => item.trim()).filter(Boolean));
        }}
      />
    </label>
  );
}

export default function ContentEditor() {
  const { editing, saving, notice, closeEditor, updateDraft, saveDraft, content } = useContent();
  const [section, setSection] = useState('profile');
  if (!editing) return null;

  const categories = content.projectsSection.filters.filter((filter) => filter.key !== 'all');

  function setPath(path, value) {
    updateDraft((next) => {
      let cursor = next;
      for (let i = 0; i < path.length - 1; i += 1) cursor = cursor[path[i]];
      cursor[path[path.length - 1]] = value;
      return next;
    });
  }

  return (
    <div className="editor-layer" role="dialog" aria-modal="true" aria-labelledby="editor-title">
      <button type="button" className="editor-backdrop" aria-label="Close editor" onClick={closeEditor} />
      <aside className="editor-panel">
        <div className="editor-head">
          <div>
            <p className="eyebrow">Site content</p>
            <h2 id="editor-title">Update content</h2>
          </div>
          <button type="button" className="btn-secondary" onClick={closeEditor}>Close</button>
        </div>
        <p className="editor-help">Changes show on this page as you type. Save publishes them for everyone, on every address.</p>

        <div className="editor-tabs">
          {SECTIONS.map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={`editor-tab${section === key ? ' active' : ''}`}
              onClick={() => setSection(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="editor-body">
          {section === 'profile' && (
            <div className="stack">
              <Field label="Name" value={content.profile.name} onChange={(value) => setPath(['profile', 'name'], value)} />
              <Field label="Short line above the name" value={content.profile.eyebrow} onChange={(value) => setPath(['profile', 'eyebrow'], value)} />
              <Field label="Role" value={content.profile.title} onChange={(value) => setPath(['profile', 'title'], value)} />
              <Field label="Introduction" value={content.profile.tagline} multiline onChange={(value) => setPath(['profile', 'tagline'], value)} />
              <Field label="Photo address" value={content.profile.imageUrl} onChange={(value) => setPath(['profile', 'imageUrl'], value)} />
              {content.profile.imageUrl && (
                <img className="editor-photo" src={content.profile.imageUrl} alt="" />
              )}
              <Field label="Primary button" value={content.profile.primaryButton} onChange={(value) => setPath(['profile', 'primaryButton'], value)} />
              <Field label="Secondary button" value={content.profile.secondaryButton} onChange={(value) => setPath(['profile', 'secondaryButton'], value)} />
            </div>
          )}

          {section === 'about' && (
            <div className="stack">
              <Field label="Small heading" value={content.about.eyebrow} onChange={(value) => setPath(['about', 'eyebrow'], value)} />
              <Field label="Heading" value={content.about.title} onChange={(value) => setPath(['about', 'title'], value)} />
              <Field label="Subtitle" value={content.about.subtitle} multiline onChange={(value) => setPath(['about', 'subtitle'], value)} />
              <Field label="First card title" value={content.about.profileTitle} onChange={(value) => setPath(['about', 'profileTitle'], value)} />
              <Field label="First card text" value={content.about.profile} multiline onChange={(value) => setPath(['about', 'profile'], value)} />
              <Field label="Second card title" value={content.about.focusTitle} onChange={(value) => setPath(['about', 'focusTitle'], value)} />
              <Field label="Second card text" value={content.about.focus} multiline onChange={(value) => setPath(['about', 'focus'], value)} />
              {content.about.metrics.map((metric, index) => (
                <div key={index} className="editor-card">
                  <Field label="Figure" value={metric.value} onChange={(value) => setPath(['about', 'metrics', index, 'value'], value)} />
                  <Field label="Label" value={metric.label} onChange={(value) => setPath(['about', 'metrics', index, 'label'], value)} />
                  <button type="button" className="btn-secondary" onClick={() => updateDraft((next) => { next.about.metrics.splice(index, 1); return next; })}>Remove figure</button>
                </div>
              ))}
              <button type="button" className="btn-secondary" onClick={() => updateDraft((next) => { next.about.metrics.push({ label: 'Label', value: '0' }); return next; })}>Add figure</button>
            </div>
          )}

          {section === 'skills' && (
            <div className="stack">
              <Field label="Small heading" value={content.skills.eyebrow} onChange={(value) => setPath(['skills', 'eyebrow'], value)} />
              <Field label="Heading" value={content.skills.title} onChange={(value) => setPath(['skills', 'title'], value)} />
              <Field label="Subtitle" value={content.skills.subtitle} multiline onChange={(value) => setPath(['skills', 'subtitle'], value)} />
              {content.skills.groups.map((group, groupIndex) => (
                <div key={groupIndex} className="editor-card">
                  <Field label="Group" value={group.title} onChange={(value) => setPath(['skills', 'groups', groupIndex, 'title'], value)} />
                  <label className="editor-field">
                    <span>Icon</span>
                    <select className="form-input" value={group.icon} onChange={(e) => setPath(['skills', 'groups', groupIndex, 'icon'], e.target.value)}>
                      {ICONS.map((icon) => <option key={icon.value} value={icon.value}>{icon.label}</option>)}
                    </select>
                  </label>
                  {group.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="editor-row">
                      <input className="form-input" value={skill.name} aria-label="Skill name" onChange={(e) => setPath(['skills', 'groups', groupIndex, 'skills', skillIndex, 'name'], e.target.value)} />
                      <input className="form-input" type="number" min="0" max="100" value={skill.level} aria-label="Skill level" onChange={(e) => setPath(['skills', 'groups', groupIndex, 'skills', skillIndex, 'level'], Number(e.target.value))} />
                      <button type="button" className="btn-secondary" onClick={() => updateDraft((next) => { next.skills.groups[groupIndex].skills.splice(skillIndex, 1); return next; })}>Remove</button>
                    </div>
                  ))}
                  <button type="button" className="btn-secondary" onClick={() => updateDraft((next) => { next.skills.groups[groupIndex].skills.push({ name: 'New skill', level: 50 }); return next; })}>Add skill</button>
                  <button type="button" className="btn-secondary" onClick={() => updateDraft((next) => { next.skills.groups.splice(groupIndex, 1); return next; })}>Remove group</button>
                </div>
              ))}
              <button type="button" className="btn-secondary" onClick={() => updateDraft((next) => { next.skills.groups.push({ icon: 'Code2', title: 'New group', skills: [{ name: 'Skill', level: 50 }] }); return next; })}>Add group</button>
            </div>
          )}

          {section === 'projects' && (
            <div className="stack">
              <Field label="Small heading" value={content.projectsSection.eyebrow} onChange={(value) => setPath(['projectsSection', 'eyebrow'], value)} />
              <Field label="Heading" value={content.projectsSection.title} onChange={(value) => setPath(['projectsSection', 'title'], value)} />
              <Field label="Subtitle" value={content.projectsSection.subtitle} multiline onChange={(value) => setPath(['projectsSection', 'subtitle'], value)} />
              {categories.map((filter) => (
                <Field
                  key={filter.key}
                  label={`Category label (${filter.key})`}
                  value={filter.label}
                  onChange={(value) => {
                    const index = content.projectsSection.filters.findIndex((item) => item.key === filter.key);
                    setPath(['projectsSection', 'filters', index, 'label'], value);
                  }}
                />
              ))}
              {content.projects.map((project, index) => (
                <div key={project.id} className="editor-card">
                  <Field label="Title" value={project.title} onChange={(value) => setPath(['projects', index, 'title'], value)} />
                  <Field label="Description" value={project.desc} multiline onChange={(value) => setPath(['projects', index, 'desc'], value)} />
                  <label className="editor-field">
                    <span>Category</span>
                    <select className="form-input" value={project.category} onChange={(e) => setPath(['projects', index, 'category'], e.target.value)}>
                      {categories.map((filter) => <option key={filter.key} value={filter.key}>{filter.label}</option>)}
                    </select>
                  </label>
                  <TechField techs={project.techs} onChange={(techs) => setPath(['projects', index, 'techs'], techs)} />
                  <Field label="Image address" value={project.image_url} onChange={(value) => setPath(['projects', index, 'image_url'], value)} />
                  <Field label="Demo link" value={project.demo_url} onChange={(value) => setPath(['projects', index, 'demo_url'], value)} />
                  <button type="button" className="btn-secondary" onClick={() => updateDraft((next) => { next.projects.splice(index, 1); return next; })}>Remove project</button>
                </div>
              ))}
              <button
                type="button"
                className="btn-secondary"
                onClick={() => updateDraft((next) => {
                  next.projects.push({
                    id: Date.now(),
                    title: 'New project',
                    desc: 'Short description.',
                    category: categories[0]?.key || 'software',
                    techs: [],
                    image_url: '',
                    demo_url: '',
                  });
                  return next;
                })}
              >
                Add project
              </button>
              <Field label="Lower small heading" value={content.projectsSection.practiceEyebrow} onChange={(value) => setPath(['projectsSection', 'practiceEyebrow'], value)} />
              <Field label="Lower heading" value={content.projectsSection.practiceTitle} onChange={(value) => setPath(['projectsSection', 'practiceTitle'], value)} />
              {content.projectsSection.capabilities.map((item, index) => (
                <div key={index} className="editor-card">
                  <Field label="Title" value={item.title} onChange={(value) => setPath(['projectsSection', 'capabilities', index, 'title'], value)} />
                  <Field label="Description" value={item.text} multiline onChange={(value) => setPath(['projectsSection', 'capabilities', index, 'text'], value)} />
                  <button type="button" className="btn-secondary" onClick={() => updateDraft((next) => { next.projectsSection.capabilities.splice(index, 1); return next; })}>Remove</button>
                </div>
              ))}
              <button type="button" className="btn-secondary" onClick={() => updateDraft((next) => { next.projectsSection.capabilities.push({ title: 'New point', text: 'Description.' }); return next; })}>Add point</button>
            </div>
          )}

          {section === 'cv' && (
            <div className="stack">
              <Field label="Small heading" value={content.cv.eyebrow} onChange={(value) => setPath(['cv', 'eyebrow'], value)} />
              <Field label="Heading" value={content.cv.title} onChange={(value) => setPath(['cv', 'title'], value)} />
              <Field label="Subtitle" value={content.cv.subtitle} multiline onChange={(value) => setPath(['cv', 'subtitle'], value)} />
              {content.cv.items.map((item, index) => (
                <div key={item.key} className="editor-card">
                  <Field label="Button label" value={item.label} onChange={(value) => setPath(['cv', 'items', index, 'label'], value)} />
                  <Field label="File address" value={item.url} onChange={(value) => setPath(['cv', 'items', index, 'url'], value)} />
                </div>
              ))}
            </div>
          )}

          {section === 'contact' && (
            <div className="stack">
              <Field label="Small heading" value={content.contact.eyebrow} onChange={(value) => setPath(['contact', 'eyebrow'], value)} />
              <Field label="Heading" value={content.contact.title} onChange={(value) => setPath(['contact', 'title'], value)} />
              <Field label="Subtitle" value={content.contact.subtitle} multiline onChange={(value) => setPath(['contact', 'subtitle'], value)} />
              <Field label="Email label" value={content.contact.emailLabel} onChange={(value) => setPath(['contact', 'emailLabel'], value)} />
              <Field label="Email" value={content.contact.email} onChange={(value) => setPath(['contact', 'email'], value)} />
              <Field label="Location label" value={content.contact.locationLabel} onChange={(value) => setPath(['contact', 'locationLabel'], value)} />
              <Field label="Location" value={content.contact.location} onChange={(value) => setPath(['contact', 'location'], value)} />
              <Field label="Send button" value={content.contact.sendLabel} onChange={(value) => setPath(['contact', 'sendLabel'], value)} />
              {content.contact.socials.map((social, index) => (
                <div key={social.type} className="editor-card">
                  <Field label={`${social.label} link`} value={social.url} onChange={(value) => setPath(['contact', 'socials', index, 'url'], value)} />
                </div>
              ))}
            </div>
          )}

          {section === 'footer' && (
            <div className="stack">
              <Field label="Copyright" value={content.footer.copyright} onChange={(value) => setPath(['footer', 'copyright'], value)} />
              <Field label="Home label" value={content.nav.home} onChange={(value) => setPath(['nav', 'home'], value)} />
              {content.nav.links.map((link, index) => (
                <Field key={link.href} label={`Menu: ${link.href}`} value={link.label} onChange={(value) => setPath(['nav', 'links', index, 'label'], value)} />
              ))}
            </div>
          )}
        </div>

        <div className="editor-foot">
          {notice && <p className="editor-notice">{notice}</p>}
          <button type="button" className="btn-primary" onClick={saveDraft} disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </aside>
    </div>
  );
}
