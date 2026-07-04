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

/* ==========================================================
   Typing animation for the "Wedding Album" title
   (starts when the trouw section scrolls into view)
   ========================================================== */

const trouwTitle = document.querySelector('.trouw__title');
const trouwSection = document.querySelector('.trouw');

if (trouwTitle && trouwSection) {
  const fullText = trouwTitle.textContent.trim();
  const typeSpeed = 100; // ms per character
  let started = false;

  // Reserve the final height so the layout doesn't jump while typing
  trouwTitle.style.minHeight = trouwTitle.offsetHeight + 'px';
  trouwTitle.textContent = '';
  trouwTitle.classList.add('is-typing');

  function startTyping() {
    started = true;
    window.removeEventListener('scroll', maybeStart);
    clearInterval(viewWatcher);

    let i = 0;
    const tick = setInterval(() => {
      i += 1;
      trouwTitle.textContent = fullText.slice(0, i);
      if (i >= fullText.length) {
        clearInterval(tick);
        // Let the cursor blink a moment longer, then remove it
        setTimeout(() => trouwTitle.classList.remove('is-typing'), 1500);
      }
    }, typeSpeed);
  }

  // Start once ~40% of the section has scrolled into view
  function maybeStart() {
    if (started) return;
    const rect = trouwSection.getBoundingClientRect();
    const visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
    if (visible > rect.height * 0.4) {
      startTyping();
    }
  }

  window.addEventListener('scroll', maybeStart, { passive: true });
  maybeStart(); // in case the section is already in view on load
}
