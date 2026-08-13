import { useEffect, useState } from 'react';
import { CheckCircle2, FileText } from 'lucide-react';
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
import EditorPanel from './components/EditorPanel';
import { useTheme } from './hooks/useTheme';
import { useScrollReveal } from './hooks/useScrollReveal';
import { defaultCvLinks, defaultProfile } from './data/projects';

const STORAGE_KEY = 'editorData';
const CV_LABELS = { iot: 'IoT Engineer', ai: 'AI Engineer', software: 'Software Engineer' };

function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function App() {
  const { isDark, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', icon: null });

  const saved = loadSaved();
  const [profile, setProfile] = useState({
    name: saved?.name || defaultProfile.name,
    title: saved?.title || defaultProfile.title,
    tagline: saved?.tagline || defaultProfile.tagline,
    about: saved?.about || defaultProfile.about,
    profileImageUrl: saved?.profileUrl || defaultProfile.profileImageUrl,
  });
  const [cvLinks, setCvLinks] = useState({
    iot: saved?.cvIot || defaultCvLinks.iot,
    ai: saved?.cvAi || defaultCvLinks.ai,
    software: saved?.cvSoftware || defaultCvLinks.software,
  });

  useScrollReveal();

  function showToast(message, icon = null) {
    setToast({ show: true, message, icon });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 3000);
  }

  function handleApplyEditor(values) {
    const nextProfile = {
      name: values.name,
      title: values.title,
      tagline: values.tagline,
      about: values.about,
      profileImageUrl: values.profileImageUrl || profile.profileImageUrl,
    };
    const nextCvLinks = {
      iot: values.cvIot || cvLinks.iot,
      ai: values.cvAi || cvLinks.ai,
      software: values.cvSoftware || cvLinks.software,
    };
    setProfile(nextProfile);
    setCvLinks(nextCvLinks);
    showToast('Changes applied!', CheckCircle2);

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          name: nextProfile.name,
          title: nextProfile.title,
          tagline: nextProfile.tagline,
          about: nextProfile.about,
          profileUrl: nextProfile.profileImageUrl,
          cvIot: nextCvLinks.iot,
          cvAi: nextCvLinks.ai,
          cvSoftware: nextCvLinks.software,
        })
      );
    } catch {
      // storage unavailable — changes still apply for this session
    }
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
      showToast(`CV link for ${label} not set. Update in Editor.`, FileText);
    }
  }

  useEffect(() => {
    document.title = 'Dev Portfolio · CV & Editor';
  }, []);

  return (
    <>
      <Navbar
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onToggleEditor={() => setEditorOpen((o) => !o)}
        onToggleMobile={() => setMobileOpen((o) => !o)}
        mobileOpen={mobileOpen}
      />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <Hero profile={profile} />
      <About about={profile.about} />
      <Skills />
      <Projects />
      <CV cvLinks={cvLinks} onDownload={handleDownloadCV} />
      <Contact />
      <Footer />

      <Toast message={toast.message} show={toast.show} icon={toast.icon} />

      <EditorPanel
        open={editorOpen}
        onClose={() => setEditorOpen(false)}
        profile={profile}
        cvLinks={cvLinks}
        onApply={handleApplyEditor}
      />
    </>
  );
}
