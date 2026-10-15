const buttons = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project');
buttons.forEach(button => button.addEventListener('click', () => {
  const selected = button.dataset.filter;
  buttons.forEach(b => { const active = b === button; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)); });
  projects.forEach(project => { project.hidden = selected !== 'all' && project.dataset.category !== selected; });
}));
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');
if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Optional theme selection; saved locally on this browser.
const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;
let savedTheme = null;
try { savedTheme = localStorage.getItem('jasmanik-portfolio-theme'); } catch (_) {}
function applyTheme(theme) {
  root.dataset.theme = theme;
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '☀' : '☾';
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
}
applyTheme(savedTheme === 'light' ? 'light' : 'dark');
if (themeToggle) themeToggle.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('jasmanik-portfolio-theme', next); } catch (_) {}
});

// Copy email with clipboard API and a fallback for local previews.
const copyEmailButton = document.querySelector('.copy-email');
const copyFeedback = document.querySelector('.copy-feedback');
if (copyEmailButton && copyFeedback) {
  copyEmailButton.addEventListener('click', async () => {
    const email = copyEmailButton.dataset.email;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const field = document.createElement('textarea');
        field.value = email;
        field.style.position = 'fixed';
        field.style.opacity = '0';
        document.body.appendChild(field);
        field.select();
        const copied = document.execCommand('copy');
        field.remove();
        if (!copied) throw new Error('Copy unavailable');
      }
      copyFeedback.textContent = 'Email copied!';
    } catch (_) {
      copyFeedback.textContent = 'Could not copy automatically. Please select the email address below.';
    }
  });
}
