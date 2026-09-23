/*
 * Ground Zero QR menu – page behaviour
 *  1. Language switcher (RO / EN) using the `translations` object from lang.js
 *  2. Drinks / Food tabs
 *  3. Sticky bars: tabs stick exactly under the Review + RO/EN bar, and once they are
 *     stuck a single shared glass layer is shown behind both (one piece of glass)
 *  4. Floating service banner that hides near the bottom of the page
 */

/* ---------- 1. Language ---------- */

let currentLang = 'ro';

// Replace every translatable text/link with the strings for `lang`.
function applyTranslations(lang) {
    const strings = translations[lang];
    if (!strings) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const value = strings[el.getAttribute('data-i18n')];
        if (value) el.innerHTML = value;           // values may contain <br>, <i>, <b>, <strong>
    });

    document.querySelectorAll('[data-i18n-href]').forEach(el => {
        const value = strings[el.getAttribute('data-i18n-href')];
        if (value) el.setAttribute('href', value);
    });

    document.querySelectorAll('.language-switcher a').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    document.documentElement.lang = lang;          // correct <html lang> for screen readers / translators
    currentLang = lang;
}

// Switch language with a short fade (the fade duration matches .container transition in CSS).
function setLanguage(lang) {
    if (lang === currentLang) return;
    const container = document.querySelector('.container');
    container.classList.add('fade-out');
    setTimeout(() => {
        applyTranslations(lang);
        container.classList.remove('fade-out');
    }, 200);
}

document.querySelectorAll('.language-switcher a').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        setLanguage(e.currentTarget.dataset.lang);
    });
});

// Initial render in Romanian (no fade on first load).
applyTranslations('ro');


/* ---------- 2. Drinks / Food tabs ---------- */

const tabs = [
    { button: document.getElementById('btn-drinks'), section: document.getElementById('section-drinks') },
    { button: document.getElementById('btn-food'),   section: document.getElementById('section-food') }
];

function showTab(activeButton) {
    tabs.forEach(({ button, section }) => {
        const isActive = button === activeButton;
        button.classList.toggle('active', isActive);
        section.classList.toggle('hidden', !isActive);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });  // start the new tab from the top
}

tabs.forEach(({ button }) => button.addEventListener('click', () => showTab(button)));


/* ---------- 3. Sticky bars offset ---------- */

const topBar = document.querySelector('.top-bar');
const menuTabs = document.querySelector('.menu-tabs');

// The tabs bar sticks at `top: var(--topbar-h)`. Measure the real (sub-pixel exact) heights
// so the bars meet with no gap, and so the shared glass layer covers exactly both bars.
function measureBars() {
    const topH = topBar.getBoundingClientRect().height;
    const tabsH = menuTabs.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--topbar-h', topH + 'px');
    document.documentElement.style.setProperty('--header-h', (topH + tabsH) + 'px');
    updateStuckState();
}

// "Stuck" = the tabs have reached the top bar. Then body.bars-stuck switches the two bars
// from their own glass to the one shared glass layer (.header-glass).
function updateStuckState() {
    const stuck = menuTabs.getBoundingClientRect().top <= topBar.getBoundingClientRect().bottom + 0.5;
    document.body.classList.toggle('bars-stuck', stuck);
}

measureBars();
window.addEventListener('load', measureBars);          // again after fonts/images are loaded
window.addEventListener('resize', measureBars);
window.addEventListener('scroll', updateStuckState, { passive: true });


/* ---------- 4. Floating service banner ---------- */

// Hide the banner when the user is within 60px of the bottom,
// so it doesn't cover the flyer buttons.
const serviceBanner = document.querySelector('.service-banner');

function updateServiceBanner() {
    const distanceToBottom = document.body.offsetHeight - (window.innerHeight + window.scrollY);
    serviceBanner.classList.toggle('hidden-on-scroll', distanceToBottom < 60);
}

window.addEventListener('scroll', updateServiceBanner, { passive: true });
