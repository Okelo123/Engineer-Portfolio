import { Moon, Sun } from 'lucide-react';

const NAV_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#cv', label: 'CV' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar({ isDark, onToggleTheme, onToggleMobile, mobileOpen }) {
  return (
    <nav className="nav-main">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <a href="#hero" style={{ textDecoration: 'none', color: 'var(--accent)', fontWeight: 700, fontSize: '1.25rem', fontFamily: "'JetBrains Mono', monospace" }}>
          &lt;Portfolio&gt;
        </a>

        <div className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            onClick={onToggleTheme}
            style={{ width: 52, height: 28, borderRadius: 14, position: 'relative', cursor: 'pointer', background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                position: 'absolute',
                top: 2,
                left: isDark ? 2 : 26,
                background: 'var(--accent)',
                transition: 'all 0.4s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isDark ? <Moon size={12} color="#fff" /> : <Sun size={12} color="#fff" />}
            </div>
          </div>

          <button
            className={`hamburger${mobileOpen ? ' active' : ''}`}
            onClick={onToggleMobile}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
