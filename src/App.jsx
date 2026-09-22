import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import MobileMenu from './components/MobileMenu';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import CV from './components/CV';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Toast from './components/Toast';
import ContentEditor from './components/ContentEditor';
import { useTheme } from './hooks/useTheme';
import { useContent } from './content/useContent';

export default function App() {
  const { isDark, toggleTheme } = useTheme();
  const { content } = useContent();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  function showToast(message) {
    setToast({ show: true, message });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 3000);
  }

  function handleDownloadCV(label, url) {
    if (url && url !== '#') {
      const a = document.createElement('a');
      a.href = url;
      a.download = '';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast(`Downloading ${label}...`);
    } else {
      showToast(`CV link for ${label} is not set.`);
    }
  }

  useEffect(() => {
    const role = content.profile.title ? ` — ${content.profile.title}` : '';
    document.title = `${content.profile.name}${role}`;
  }, [content.profile.name, content.profile.title]);

  return (
    <>
      <Navbar
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onToggleMobile={() => setMobileOpen((o) => !o)}
        mobileOpen={mobileOpen}
      />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <Hero />
      <About />
      <Skills />
      <Projects />
      <CV onDownload={handleDownloadCV} />
      <Contact />
      <Footer />
      <ContentEditor />

      <Toast message={toast.message} show={toast.show} />
    </>
  );
}
