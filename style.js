/* ==========================================================
   PICTURE PERFECT FOTOGRAFIE — Hamburger menu
   ========================================================== */

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
const menuLinks = nav.querySelectorAll('.nav__link, .cta');

function setMenu(open) {
  nav.classList.toggle('is-open', open);
  hamburger.classList.toggle('is-open', open);
  hamburger.setAttribute('aria-expanded', open);
  hamburger.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');

  // Lock page scroll while the fullscreen menu is open
  document.body.classList.toggle('nav-open', open);
}

function toggleMenu() {
  setMenu(!nav.classList.contains('is-open'));
}

hamburger.addEventListener('click', toggleMenu);

// Close the menu when a link is clicked (so anchors scroll to their section)
menuLinks.forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

// Close the menu with the Escape key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav.classList.contains('is-open')) {
    setMenu(false);
  }
});
