(() => {
  const pages = [
    { file: 'index.html', number: '01', label: 'Home', group: 'Module Setup' },
    { file: 'content-summary.html', number: '02', label: 'Content Summary', group: 'Module Setup' },
    { file: 'objectives.html', number: '03', label: 'Objectives', group: 'Module Setup' },
    { file: 'standards.html', number: '04', label: 'Standards', group: 'Module Setup' },
    { file: 'procedures.html', number: '05', label: 'Procedures Overview', group: 'Module Setup' },
    { file: 'scrutinize.html', number: '06', label: 'Scrutinize', group: 'SOURCES Procedure' },
    { file: 'organize.html', number: '07', label: 'Organize Thoughts', group: 'SOURCES Procedure' },
    { file: 'understand-context.html', number: '08', label: 'Understand the Context', group: 'SOURCES Procedure' },
    { file: 'read-between-lines.html', number: '09', label: 'Read Between the Lines', group: 'SOURCES Procedure' },
    { file: 'corroborate.html', number: '10', label: 'Corroborate & Refute', group: 'SOURCES Procedure' },
    { file: 'establish-narrative.html', number: '11', label: 'Establish a Plausible Narrative', group: 'SOURCES Procedure' },
    { file: 'summarize.html', number: '12', label: 'Summarize Final Thoughts', group: 'SOURCES Procedure' },
    { file: 'sources-materials.html', number: '13', label: 'Sources & Materials', group: 'Lesson Support' },
    { file: 'assessment.html', number: '14', label: 'Assessment', group: 'Lesson Support' },
    { file: 'esol.html', number: '15', label: 'ESOL Accommodations', group: 'Lesson Support' },
    { file: 'resources.html', number: '16', label: 'Resources', group: 'Lesson Support' }
  ];

  const ready = () => document.body.classList.add('is-ready');

  const currentFile = (() => {
    const name = window.location.pathname.split('/').pop();
    return name || 'index.html';
  })();

  const buildNavigation = () => {
    const progress = document.querySelector('.module-progress');
    if (!progress || document.querySelector('.module-nav-trigger')) return;

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'module-nav-trigger';
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', 'module-navigation-panel');
    trigger.innerHTML = '<span class="nav-trigger-icon" aria-hidden="true"><i></i><i></i><i></i></span><span>Navigate</span>';
    progress.prepend(trigger);

    const overlay = document.createElement('div');
    overlay.className = 'module-nav-overlay';
    overlay.hidden = true;

    const panel = document.createElement('nav');
    panel.id = 'module-navigation-panel';
    panel.className = 'module-nav-panel';
    panel.setAttribute('aria-label', 'Module navigation');
    panel.setAttribute('aria-hidden', 'true');

    const heading = document.createElement('div');
    heading.className = 'module-nav-heading';
    heading.innerHTML = '<div><span class="nav-kicker">Jump to any page</span><h2>Module Navigation</h2></div>';

    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'module-nav-close';
    close.setAttribute('aria-label', 'Close module navigation');
    close.textContent = '×';
    heading.append(close);
    panel.append(heading);

    const groups = [...new Set(pages.map(page => page.group))];
    const content = document.createElement('div');
    content.className = 'module-nav-content';

    groups.forEach(group => {
      const section = document.createElement('section');
      section.className = 'module-nav-section';
      const groupTitle = document.createElement('h3');
      groupTitle.textContent = group;
      section.append(groupTitle);

      const list = document.createElement('div');
      list.className = 'module-nav-list';

      pages.filter(page => page.group === group).forEach(page => {
        const link = document.createElement('a');
        link.href = page.file;
        link.className = 'module-nav-link';
        link.innerHTML = `<span class="module-nav-number">${page.number}</span><span>${page.label}</span>`;
        if (page.file === currentFile) {
          link.classList.add('is-current');
          link.setAttribute('aria-current', 'page');
        }
        list.append(link);
      });

      section.append(list);
      content.append(section);
    });

    panel.append(content);
    overlay.append(panel);
    document.body.append(overlay);

    const openNav = () => {
      overlay.hidden = false;
      requestAnimationFrame(() => {
        overlay.classList.add('is-open');
        document.body.classList.add('nav-open');
        trigger.setAttribute('aria-expanded', 'true');
        panel.setAttribute('aria-hidden', 'false');
        close.focus();
      });
    };

    const closeNav = (restoreFocus = true) => {
      overlay.classList.remove('is-open');
      document.body.classList.remove('nav-open');
      trigger.setAttribute('aria-expanded', 'false');
      panel.setAttribute('aria-hidden', 'true');
      window.setTimeout(() => {
        overlay.hidden = true;
        if (restoreFocus) trigger.focus();
      }, 220);
    };

    trigger.addEventListener('click', openNav);
    close.addEventListener('click', () => closeNav());
    overlay.addEventListener('click', event => {
      if (event.target === overlay) closeNav();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && overlay.classList.contains('is-open')) closeNav();
    });
  };

  const init = () => {
    buildNavigation();
    requestAnimationFrame(ready);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
