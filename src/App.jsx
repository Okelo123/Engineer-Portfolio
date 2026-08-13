import { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';
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
import { useTheme } from './hooks/useTheme';
import { useScrollReveal } from './hooks/useScrollReveal';
import { defaultCvLinks, defaultProfile } from './data/projects';

const CV_LABELS = { iot: 'IoT Engineer', ai: 'AI Engineer', software: 'Software Engineer' };

export default function App() {
  const { isDark, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  useScrollReveal();

  function showToast(message) {
    setToast({ show: true, message });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 3000);
  }

  function handleDownloadCV(type, url) {
    const label = CV_LABELS[type];
    if (url && url !== '#') {
      const a = document.createElement('a');
      a.href = url;
      a.download = '';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast(`Downloading ${label} CV...`);
    } else {
      showToast(`CV link for ${label} not set.`);
    }
  }

  useEffect(() => {
    document.title = 'Portfolio';
  }, []);

  return (
    <>
      <Navbar
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onToggleMobile={() => setMobileOpen((o) => !o)}
        mobileOpen={mobileOpen}
      />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <Hero profile={defaultProfile} />
      <About about={defaultProfile.about} />
      <Skills />
      <Projects />
      <CV cvLinks={defaultCvLinks} onDownload={handleDownloadCV} />
      <Contact />
      <Footer />

      <Toast message={toast.message} show={toast.show} />
    </>
  );
}
