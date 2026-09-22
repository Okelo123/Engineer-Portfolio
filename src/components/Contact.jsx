import { Mail, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { useContent } from '../content/useContent';
import { GithubIcon, LinkedinIcon, XIcon } from './SocialIcons';

const ICONS = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
};

export default function Contact() {
  const { content } = useContent();
  const contact = content.contact;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || 'Request failed');
      }

      setSent(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to send message.';
      setError(message);
      console.error('Contact submit error:', err);
    } finally {
      setSending(false);
    }
  }

  const socials = contact.socials.filter((social) => social.url && social.url !== '#');

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-head center">
          <p className="eyebrow">{contact.eyebrow}</p>
          <h2 className="section-title">{contact.title}</h2>
          <p className="section-subtitle">{contact.subtitle}</p>
        </div>

        <div className="grid-contact">
          <form onSubmit={handleSubmit} className="stack">
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-input" placeholder="Name" required />
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-input" placeholder="Email" required />
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="form-input" rows={5} placeholder="Message" required style={{ resize: 'vertical' }} />
            <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }} disabled={sending}>
              <Send size={16} /> {sending ? contact.sendingLabel : contact.sendLabel}
            </button>
            {sent && (
              <div className="notice notice-ok">{contact.sentLabel}</div>
            )}
            {error && (
              <div className="notice notice-err">{error}</div>
            )}
          </form>

          <div className="stack">
            <div className="card contact-row">
              <Mail size={18} color="var(--accent)" />
              <div>
                <p style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{contact.emailLabel}</p>
                <p style={{ fontWeight: 500 }}>{contact.email}</p>
              </div>
            </div>

            <div className="card contact-row">
              <MapPin size={18} color="var(--accent)" />
              <div>
                <p style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{contact.locationLabel}</p>
                <p style={{ fontWeight: 500 }}>{contact.location}</p>
              </div>
            </div>

            {socials.length > 0 && (
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {socials.map((social) => {
                  const Icon = ICONS[social.type] || GithubIcon;
                  return (
                    <a key={social.type} href={social.url} target="_blank" rel="noreferrer" className="social-link" aria-label={social.label}>
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
