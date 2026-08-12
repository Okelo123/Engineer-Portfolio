import { Mail, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { GithubIcon, LinkedinIcon, XIcon } from './SocialIcons';

export default function Contact() {
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

  return (
    <section id="contact" style={{ padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="animate-on-scroll" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.8rem', letterSpacing: 3, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Contact
          </p>
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-subtitle">Let's work together</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '3rem', maxWidth: 900, margin: '0 auto' }}>
          <form onSubmit={handleSubmit} className="animate-on-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-input" placeholder="Your name" required />
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-input" placeholder="your@email.com" required />
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="form-input" rows={5} placeholder="Tell me about your project..." required style={{ resize: 'vertical' }} />
            <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }} disabled={sending}>
              <Send size={18} /> {sending ? 'Sending...' : 'Send'}
            </button>
            {sent && (
              <div style={{ padding: '0.75rem', borderRadius: 10, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981' }}>
                ✓ Message sent!
              </div>
            )}
            {error && (
              <div style={{ padding: '0.75rem', borderRadius: 10, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444' }}>
                {error}
              </div>
            )}
          </form>

          <div className="animate-on-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail size={20} color="#fff" />
              </div>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Email</p>
                <p style={{ fontWeight: 500 }}>hello@juma.dev</p>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={20} color="#fff" />
              </div>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Location</p>
                <p style={{ fontWeight: 500 }}>Remote / Worldwide</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a href="https://github.com/Okelo123" target="_blank" rel="noreferrer" className="social-link"><GithubIcon size={20} /></a>
              <a href="https://www.linkedin.com/in/jumabrian-394161296" target="_blank" rel="noreferrer" className="social-link"><LinkedinIcon size={20} /></a>
              <a href="#" className="social-link"><XIcon size={20} /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
