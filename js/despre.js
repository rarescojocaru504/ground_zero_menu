/*
 * The "despre" pages (despre_gz_ro.html, despre_deranj_en.html, ...).
 * Each page is one flyer in one language, so there's little to do here:
 *  - tapping a page opens it big (scroll/pinch to move around, × or Esc to close)
 *  - the RO/EN buttons go to the same flyer in the other language; the choice is saved
 *    under the same key as the menu, so going back to the menu keeps that language
 */

const LANG_STORAGE_KEY = 'gz-menu-lang';   // same key as js/script.js

function saveLanguage(lang) {
    try { localStorage.setItem(LANG_STORAGE_KEY, lang); } catch (e) { /* private mode, not important */ }
}

// Opening a page counts as choosing its language (e.g. someone arriving from a shared link).
saveLanguage(document.documentElement.lang);

document.querySelectorAll('.language-switcher a').forEach(a => {
    a.addEventListener('click', () => saveLanguage(a.dataset.lang));
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
