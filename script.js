const menuButton = document.querySelector('.menu');
const navLinks = document.querySelector('.links');
menuButton?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
});
navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));
const observer = new IntersectionObserver((entries, obs) => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#contact-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = encodeURIComponent(`Projektanfrage: ${data.get('topic')}`);
  const body = encodeURIComponent(`Hallo Metzingen Business Solutions,\n\n${data.get('message')}\n\nName: ${data.get('name')}\nE-Mail: ${data.get('email')}\nThema: ${data.get('topic')}`);
  document.querySelector('#status').textContent = 'Ihr E-Mail-Programm wird geöffnet. Bitte prüfen Sie die Empfängeradresse vor dem Versand.';
  window.location.href = `mailto:kontakt@metzingen-business-solutions.de?subject=${subject}&body=${body}`;
});
