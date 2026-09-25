/*
 * The "despre" pages (despre_gz_ro.html, despre_deranj_en.html, ...).
 * Each page is one flyer in one language, so there's little to do here:
 *  - tapping a page opens it big (scroll/pinch to move around, × or Esc to close)
 *  - the RO/EN buttons fade over to the same flyer in the other language; the choice is saved
 *    under the same key as the menu, so going back to the menu keeps that language
 */

const LANG_STORAGE_KEY = 'gz-menu-lang';   // same key as js/script.js

function saveLanguage(lang) {
    try { localStorage.setItem(LANG_STORAGE_KEY, lang); } catch (e) { /* private mode, not important */ }
}

// Opening a page counts as choosing its language (e.g. someone arriving from a shared link).
saveLanguage(document.documentElement.lang);


/* ---------- Fade when changing RO/EN ----------
   Same fade as in the menu (body.lang-fading in styles.css, 0.25s). The flyer fades out,
   the other language's page opens, and there the flyer fades back in once its first image
   is ready, so the new picture doesn't pop in half-loaded. */

const LANG_FADE_MS = 250;              // keep in sync with the 0.25s fade in styles.css
const FADE_FLAG = 'gz-despre-fade';    // tells the next page it was opened by RO/EN
const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const flyerContent = document.querySelector('.container');

document.querySelectorAll('.language-switcher a').forEach(a => {
    a.addEventListener('click', e => {
        saveLanguage(a.dataset.lang);
        if (a.classList.contains('active')) { e.preventDefault(); return; }   // already on this language
        // Ctrl/Cmd-click (new tab) or reduce motion: just follow the link
        if (noMotion || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;

        e.preventDefault();
        try { sessionStorage.setItem(FADE_FLAG, '1'); } catch (err) { /* then the new page just appears */ }
        document.body.classList.add('lang-fading');
        setTimeout(() => { location.href = a.href; }, LANG_FADE_MS);
    });
});

// Arrived here from RO/EN: start hidden (no transition), fade in when the first page image is ready.
let cameFromSwitch = false;
try {
    cameFromSwitch = sessionStorage.getItem(FADE_FLAG) === '1';
    sessionStorage.removeItem(FADE_FLAG);
} catch (err) { /* private mode */ }

if (cameFromSwitch && !noMotion) {
    flyerContent.style.transition = 'none';
    document.body.classList.add('lang-fading');
    void flyerContent.offsetWidth;          // apply the hidden state before turning the transition back on
    flyerContent.style.transition = '';

    const firstImage = document.querySelector('.flyer-page');
    let shown = false;
    const show = () => {
        if (shown) return;
        shown = true;
        requestAnimationFrame(() => document.body.classList.remove('lang-fading'));
    };
    if (firstImage.complete) show();
    else {
        firstImage.addEventListener('load', show);
        firstImage.addEventListener('error', show);
    }
    setTimeout(show, 1500);                 // slow connection: don't keep the page hidden
}

// Back button after a switch: the browser may restore this page exactly as it was left
// (faded out), so show it again.
window.addEventListener('pageshow', e => {
    if (e.persisted) document.body.classList.remove('lang-fading');
});


/* ---------- Big view of a page ---------- */

const viewer = document.getElementById('page-viewer');
const viewerImg = viewer.querySelector('img');
const scroller = viewer.querySelector('.page-viewer-scroll');
const closeButton = viewer.querySelector('.lightbox-close');

function openViewer(img) {
    viewerImg.src = img.currentSrc || img.src;
    viewerImg.alt = img.alt;
    viewer.hidden = false;
    document.body.classList.add('lightbox-open');   // stops the page behind from scrolling (styles.css)

    // start in the middle of the page rather than at its left edge
    const centre = () => { scroller.scrollLeft = (scroller.scrollWidth - scroller.clientWidth) / 2; };
    if (viewerImg.complete) centre(); else viewerImg.onload = centre;
    closeButton.focus();
}

function closeViewer() {
    viewer.hidden = true;
    document.body.classList.remove('lightbox-open');
}

document.querySelectorAll('.flyer-page').forEach(img => img.addEventListener('click', () => openViewer(img)));
// only × and Esc close it: taps on the image are for scrolling around
closeButton.addEventListener('click', closeViewer);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !viewer.hidden) closeViewer(); });
