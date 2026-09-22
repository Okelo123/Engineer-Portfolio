import { useEffect, useState } from 'react';
import publishedFile from '../data/content.json';
import { ContentContext } from './contentContext';

function isContent(data) {
  return Boolean(
    data &&
    typeof data.profile?.name === 'string' &&
    Array.isArray(data.projects) &&
    typeof data.footer?.copyright === 'string'
  );
}

export function ContentProvider({ children }) {
  const [published, setPublished] = useState(publishedFile);
  const [draft, setDraft] = useState(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');

  const editing = draft !== null;
  const content = editing ? draft : published;

  function openEditor() {
    setNotice('');
    setDraft(structuredClone(published));
  }

  function closeEditor() {
    const url = new URL(window.location.href);
    url.searchParams.delete('edit');
    if (url.hash === '#edit') url.hash = '';
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
    setDraft(null);
    setNotice('');
  }

  useEffect(() => {
    let stopped = false;

    async function pull() {
      if (document.visibilityState === 'hidden') return;
      try {
        const response = await fetch(`/api/content?t=${Date.now()}`, { cache: 'no-store' });
        if (!response.ok) return;
        const data = await response.json();
        if (stopped || !isContent(data)) return;
        setPublished((current) => (JSON.stringify(current) === JSON.stringify(data) ? current : data));
      } catch {
        // Keep the last copy already on screen.
      }
    }

    pull();
    const timer = setInterval(pull, 3000);
    const onVisible = () => {
      if (document.visibilityState === 'visible') pull();
    };
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', pull);

    return () => {
      stopped = true;
      clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', pull);
    };
  }, []);

  useEffect(() => {
    function requested() {
      const params = new URLSearchParams(window.location.search);
      return params.has('edit') || window.location.hash === '#edit';
    }

    function sync() {
      if (!requested()) return;
      setNotice('');
      setDraft((current) => current ?? structuredClone(published));
    }

    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, [published]);

  function updateDraft(recipe) {
    setDraft((current) => (current ? recipe(structuredClone(current)) : current));
  }

  async function saveDraft() {
    if (!draft) return;
    setSaving(true);
    setNotice('');
    const next = structuredClone(draft);

    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        body: JSON.stringify(next),
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || 'Unable to publish.');
      }
      setPublished(next);
      setNotice('Saved. Anyone who opens the site, on any network, will see this.');
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Unable to publish.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <ContentContext.Provider
      value={{
        content,
        editing,
        saving,
        notice,
        openEditor,
        closeEditor,
        updateDraft,
        saveDraft,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}
