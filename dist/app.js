(() => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#mobile-nav');
  function closeMenu() { menu.hidden = true; toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open navigation'); }
  toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; menu.hidden = !open; toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !menu.hidden) { closeMenu(); toggle.focus(); } });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
  const filters = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('[data-language]')];
  filters.forEach(button => button.addEventListener('click', () => {
    const language = button.dataset.filter;
    filters.forEach(filter => { const active = filter === button; filter.classList.toggle('active', active); filter.setAttribute('aria-pressed', String(active)); });
    cards.forEach(card => { card.hidden = language !== 'all' && card.dataset.language !== language; });
    const count = cards.filter(card => !card.hidden).length;
    document.querySelector('.project-count').textContent = count + (count === 1 ? ' project' : ' projects');
  }));
  const projects = {
    motors: {title:'Marvellous Motors',category:'GO / FULL-STACK WEB APPLICATION',description:'A dealership web application that brings vehicle discovery, customer accounts and day-to-day operations into one place.',features:['Searchable vehicle catalogue with filters, details and saved vehicles.','Customer registration, profile settings and private order history.','Server-calculated delivery quotes and bank-transfer receipt review.','Admin-managed inventory, customer support and delivery arrival estimates.'],note:'Go, HTML, CSS, JavaScript and SQLite. The portfolio preview shows the local demonstration site; the project link opens the source repository.',repo:'Marvellous-motor2'},
    campus: {title:'CampusFlow',category:'PYTHON / COLLABORATIVE COMMAND-LINE PROJECT',description:'A campus helpdesk designed around the journey of a support ticket, from the first request through assignment and resolution.',features:['Ticket creation with validation and priority calculation.','Staff assignment and a defined ticket lifecycle.','An ordered open-work queue and summary reports.','Validated JSON persistence and automated unit tests.'],note:'Collaborative project. The repository identifies Mordecai’s ticket-creation module and shared integration alongside a teammate’s workflow and reporting work.',repo:'campusflow2'},
    game: {title:'The Guessing Game',category:'PYTHON / FLASK WEB GAME',description:'A browser-based number-guessing game built with Flask. It explores request handling, session state and clear feedback during play.',features:['Easy, medium and hard difficulty settings.','A generated secret number and a limited number of attempts.','Feedback when guesses are too high, too low or outside the range.','A reset route to start a new game.'],note:'A learning project built with Python, Flask and HTML templates. The card artwork is an illustration; the link opens the actual project source.',repo:'guessing-game'},
    text: {title:'Go Text Processor',category:'GO / COMMAND-LINE LEARNING PROJECT',description:'A focused Go exercise that reads an input file, passes its content through a text-processing function and writes the result to another file.',features:['Command-line input and output file arguments.','Reading and writing files with Go’s standard library.','Text transformation through an internal package.'],note:'An early learning project, presented for its file-handling and text-processing work. Its repository is named my-reloaded.',repo:'my-reloaded'}
  };
  const dialog = document.querySelector('.project-dialog');
  let trigger;
  document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
    const project = projects[button.dataset.project]; trigger = button;
    document.querySelector('#dialog-title').textContent = project.title;
    document.querySelector('#dialog-category').textContent = project.category;
    document.querySelector('#dialog-description').textContent = project.description;
    document.querySelector('#dialog-note').textContent = project.note;
    document.querySelector('#dialog-source').href = 'https://github.com/mordecai12-cool/' + project.repo;
    document.querySelector('#dialog-features').replaceChildren(...project.features.map(text => { const item = document.createElement('li'); item.textContent = text; return item; }));
    dialog.showModal();
  }));
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); });
  dialog.addEventListener('close', () => trigger?.focus());
  document.querySelector('#year').textContent = String(new Date().getFullYear());
})();
