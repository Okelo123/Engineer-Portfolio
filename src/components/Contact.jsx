import { CheckCircle2, Mail, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { GithubIcon, LinkedinIcon, XIcon } from './SocialIcons';

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      e.target.reset();
      setTimeout(() => setSent(false), 4000);
    }, 1200);
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
            <input type="text" className="form-input" placeholder="Your name" required />
            <input type="email" className="form-input" placeholder="your@email.com" required />
            <textarea className="form-input" rows={5} placeholder="Tell me about your project..." required style={{ resize: 'vertical' }} />
            <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }} disabled={sending}>
              <Send size={18} /> {sending ? 'Sending...' : 'Send'}
            </button>
            {sent && (
              <div style={{ padding: '0.75rem', borderRadius: 10, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' }}>
                <CheckCircle2 size={18} />
                Message sent!
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
