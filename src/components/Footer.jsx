import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ padding: '2rem 0', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
        © 2026 Dev Juma · Built with <Heart size={14} fill="currentColor" />
      </p>
    </footer>
  );
}
