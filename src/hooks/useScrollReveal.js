import { useEffect } from 'react';

// Watches every .animate-on-scroll element in the document and adds
// .visible once it scrolls into view. Also fills in skill bars once
// the #skills section is visible. Re-runs whenever `deps` changes
// (e.g. after the project grid re-renders) so new elements get observed too.
export function useScrollReveal(deps = []) {
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.animate-on-scroll').forEach((el) => revealObserver.observe(el));

    const skillsSection = document.getElementById('skills');
    let skillsObserver;
    if (skillsSection) {
      skillsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.querySelectorAll('.skill-bar-fill').forEach((bar) => {
                bar.style.width = `${bar.dataset.width}%`;
              });
            }
          });
        },
        { threshold: 0.3 }
      );
      skillsObserver.observe(skillsSection);
    }

    return () => {
      revealObserver.disconnect();
      skillsObserver?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
