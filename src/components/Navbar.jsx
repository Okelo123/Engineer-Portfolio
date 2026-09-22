import { Moon, Sun } from 'lucide-react';
import { useContent } from '../content/useContent';

export default function Navbar({ isDark, onToggleTheme, onToggleMobile, mobileOpen }) {
  const { content } = useContent();

  return (
    <nav className="nav-main">
      <div className="nav-inner">
        <a href="#hero" className="brand">{content.profile.name}</a>

        <div className="nav-links-desktop">
          {content.nav.links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

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
