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
   Scroll-triggered animations
   ========================================================== */

/* Runs `callback` once, as soon as `fraction` of `section` is visible.
   Scroll listener + light timer, so it works in every browser/webview. */
function onScrollIntoView(section, fraction, callback) {
  let done = false;

  function check() {
    if (done) return;
    const rect = section.getBoundingClientRect();
    const visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
    // Compare against the section height OR the viewport, whichever is
    // smaller — otherwise sections taller than the screen never trigger
    if (visible > Math.min(rect.height, window.innerHeight) * fraction) {
      done = true;
      window.removeEventListener('scroll', check);
      clearInterval(watcher);
      callback();
    }
  }

  window.addEventListener('scroll', check, { passive: true });
  const watcher = setInterval(check, 250);
  check(); // in case the section is already in view on load
}

/* ---------- Typing animation for the "Wedding Album" title ---------- */
const trouwTitle = document.querySelector('.trouw__title');
const trouwSection = document.querySelector('.trouw');

if (trouwTitle && trouwSection) {
  const fullText = trouwTitle.textContent.trim();
  const typeSpeed = 100; // ms per character

  // Reserve the final height so the layout doesn't jump while typing
  trouwTitle.style.minHeight = trouwTitle.offsetHeight + 'px';
  trouwTitle.textContent = '';
  trouwTitle.classList.add('is-typing');

  onScrollIntoView(trouwSection, 0.4, () => {
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
  });
}

/* ---------- Fade-in for the categories (all three at once) ---------- */
const categoriesGrid = document.querySelector('.img-categories');

if (categoriesGrid) {
  // Hidden via JS (not CSS), so the images stay visible without JavaScript
  categoriesGrid.classList.add('reveal');

  onScrollIntoView(categoriesGrid, 0.7, () => {
    categoriesGrid.classList.add('is-visible');
  });
}

/* ---------- Fade-in for the about section (image + text together) ---------- */
const aboutContent = document.querySelector('.about__content');

if (aboutContent) {
  aboutContent.classList.add('reveal');

  onScrollIntoView(aboutContent, 0.6, () => {
    aboutContent.classList.add('is-visible');
  });
}

/* ---------- Footer overlap: pin offset for the about section ----------
   The about section is position: sticky so the footer scrolls over it.
   If the section is taller than the screen, pin it higher (negative top)
   so its bottom is still reachable before it stops scrolling. */
const aboutSection = document.querySelector('.about');

if (aboutSection) {
  function setAboutPin() {
    const overflow = aboutSection.offsetHeight - window.innerHeight;
    aboutSection.style.top = (overflow > 0 ? -overflow : 0) + 'px';
  }

  window.addEventListener('resize', setAboutPin);
  window.addEventListener('load', setAboutPin); // re-measure once images/fonts are in
  setAboutPin();
}
