import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ padding: '2rem 0', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>© 2026 Dev Juma · Built with <Heart size={14} style={{ color: '#ef4444' }} /></p>
    </footer>
  );
}
