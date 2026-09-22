import { useContent } from '../content/useContent';

export default function MobileMenu({ open, onClose }) {
  const { content } = useContent();
  const links = [{ href: '#hero', label: content.nav.home }, ...content.nav.links];

  return (
    <div className={`mobile-menu${open ? ' open' : ''}`}>
      {links.map((link) => (
        <a key={link.href} href={link.href} onClick={onClose}>
          {link.label}
        </a>
      ))}
    </div>
  );
}
