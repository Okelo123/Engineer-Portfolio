import { useContent } from '../content/useContent';

export default function Footer() {
  const { content } = useContent();

  return (
    <footer className="site-footer">
      <p>{content.footer.copyright}</p>
    </footer>
  );
}
