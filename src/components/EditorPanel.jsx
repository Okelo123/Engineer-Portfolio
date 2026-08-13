import { Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function EditorPanel({ open, onClose, profile, cvLinks, onApply }) {
  const [form, setForm] = useState({
    name: profile.name,
    title: profile.title,
    tagline: profile.tagline,
    about: profile.about,
    profileImageUrl: profile.profileImageUrl,
    cvIot: '',
    cvAi: '',
    cvSoftware: '',
  });

  // Re-sync form fields whenever the panel is opened
  useEffect(() => {
    if (open) {
      setForm({
        name: profile.name,
        title: profile.title,
        tagline: profile.tagline,
        about: profile.about,
        profileImageUrl: profile.profileImageUrl,
        cvIot: cvLinks.iot || '',
        cvAi: cvLinks.ai || '',
        cvSoftware: cvLinks.software || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleApply() {
    onApply({
      name: form.name.trim() || 'Brian Juma',
      title: form.title.trim() || 'Software Engineer | IoT & AI Engineer',
      tagline: form.tagline.trim() || 'Building intelligent systems...',
      about: form.about.trim() || "I'm a passionate software Engineer...",
      profileImageUrl: form.profileImageUrl.trim(),
      cvIot: form.cvIot.trim(),
      cvAi: form.cvAi.trim(),
      cvSoftware: form.cvSoftware.trim(),
    });
  }

  return (
    <div className={`editor-panel${open ? ' open' : ''}`}>
      <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
        <span>✎ Live Editor</span>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <X size={18} />
        </button>
      </h4>

      <label>Name</label>
      <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} />

      <label>Title</label>
      <input type="text" value={form.title} onChange={(e) => update('title', e.target.value)} />

      <label>Tagline</label>
      <textarea rows={2} value={form.tagline} onChange={(e) => update('tagline', e.target.value)} />

      <label>About</label>
      <textarea rows={2} value={form.about} onChange={(e) => update('about', e.target.value)} />

      <label>Profile Image URL</label>
      <input
        type="text"
        placeholder="https://example.com/photo.jpg"
        value={form.profileImageUrl}
        onChange={(e) => update('profileImageUrl', e.target.value)}
      />

      <label>CV Links (IoT, AI, Software) – leave blank to keep current file</label>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.2rem' }}>
        <input
          type="text"
          placeholder="IoT CV URL"
          style={{ flex: 1, minWidth: 100 }}
          value={form.cvIot}
          onChange={(e) => update('cvIot', e.target.value)}
        />
        <input
          type="text"
          placeholder="AI CV URL"
          style={{ flex: 1, minWidth: 100 }}
          value={form.cvAi}
          onChange={(e) => update('cvAi', e.target.value)}
        />
        <input
          type="text"
          placeholder="Software CV URL"
          style={{ flex: 1, minWidth: 100 }}
          value={form.cvSoftware}
          onChange={(e) => update('cvSoftware', e.target.value)}
        />
      </div>

      <button className="btn-primary" onClick={handleApply}>
        <Check size={16} /> Apply Changes
      </button>

      <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
        Changes update the page instantly and are saved in your browser.
      </p>
    </div>
  );
}
