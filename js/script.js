/*
 * Ground Zero QR menu
 *
 *  1. Language (RO / EN)
 *  2. Allergens: chips under each dish + the filter
 *  3. Drinks / Food tabs and the category chips
 *  4. Header glass
 *  5. Bottle zoom
 *  6. "Order at the bar" banner
 *  7. Instagram / TikTok logos
 *  8. Start-up
 *
 * All texts come from `translations` in lang.js, which is loaded before this file.
 */

/* ---------- 1. Language ---------- */

const LANG_STORAGE_KEY = 'gz-menu-lang';
const LANG_FADE_MS = 250;          // keep in sync with the 0.25s fade in styles.css

let currentLang = null;
let targetLang = null;             // set while a switch is fading
let langFadeTimer = null;

// Romanian by default. If the guest switched to English on an earlier visit, keep that.
function detectLanguage() {
    try {
        const saved = localStorage.getItem(LANG_STORAGE_KEY);
        if (saved && translations[saved]) return saved;
    } catch (e) {
        // localStorage can throw in private mode; fall back to the default
    }
    return 'ro';
}

function highlightLanguageButton(lang) {
    document.querySelectorAll('.language-switcher a').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

function applyTranslations(lang) {
    const strings = translations[lang];
    if (!strings) return;

    // innerHTML on purpose: some strings contain <br>, <b>, <strong> etc.
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const value = strings[el.getAttribute('data-i18n')];
        if (value) el.innerHTML = value;
    });

    // links that point to a different file per language (the PDF flyers)
    document.querySelectorAll('[data-i18n-href]').forEach(el => {
        const value = strings[el.getAttribute('data-i18n-href')];
        if (value) el.setAttribute('href', value);
    });

    highlightLanguageButton(lang);
    document.documentElement.lang = lang;
    currentLang = lang;

    // the food descriptions were just replaced, so the allergen chips need rebuilding
    renderAllergens();
    applyAllergenFilter();
}

// Fade out, swap the texts while they're invisible, fade back in.
// If someone taps RO, EN, RO quickly, only the last tap is applied.
function setLanguage(lang) {
    if (lang === (targetLang || currentLang)) return;
    targetLang = lang;

    try { localStorage.setItem(LANG_STORAGE_KEY, lang); } catch (e) { /* not important */ }
    highlightLanguageButton(lang);

    clearTimeout(langFadeTimer);
    document.body.classList.add('lang-fading');
    langFadeTimer = setTimeout(() => {
        applyTranslations(targetLang);
        targetLang = null;
        measureBars();   // the header height can change with the text
        requestAnimationFrame(() => document.body.classList.remove('lang-fading'));
    }, LANG_FADE_MS);
}

document.querySelectorAll('.language-switcher a').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        setLanguage(e.currentTarget.dataset.lang);
    });
});


/* ---------- 2. Allergens ---------- */

// Buttons of the filter, in this order. Their labels are allergen_<key> in lang.js.
const ALLERGENS = ['gluten', 'dairy', 'egg', 'mustard', 'sesame', 'soy', 'celery', 'sulphites', 'nuts', 'lupin'];

// Every word used in the RO and EN allergen lines, mapped to one of the keys above.
// Includes the misspellings that are in the printed menu ("diary", "mustar", ...).
const ALLERGEN_WORDS = {
    gluten: 'gluten',
    lactate: 'dairy', 'lactoză': 'dairy', dairy: 'dairy', diary: 'dairy', lactose: 'dairy',
    ou: 'egg', egg: 'egg',
    'muștar': 'mustard', mustar: 'mustard', mustard: 'mustard',
    susan: 'sesame', sesame: 'sesame',
    soia: 'soy', soya: 'soy', soy: 'soy',
    'țelină': 'celery', 'telină': 'celery', celery: 'celery',
    'sulfiți': 'sulphites', sulfiti: 'sulphites', sulphites: 'sulphites',
    alune: 'nuts', nuci: 'nuts', nuts: 'nuts',
    lupin: 'lupin', lupine: 'lupin',
    'pește': 'fish', fish: 'fish'
};

const activeAllergens = new Set();

// In lang.js each dish has a line like
//   <i>Alergeni: gluten, ou - poate conține urme de țelină, soia</i>
// This turns it into chips plus a small "may contain" line, and stores the allergen keys
// on the card (data-allergens) so the filter can use them.
function renderAllergens() {
    const strings = translations[currentLang];

    document.querySelectorAll('#section-food .food-desc').forEach(desc => {
        const card = desc.closest('.food-card');
        const line = [...desc.querySelectorAll('i')].find(i => i.textContent.includes(':'));
        if (!line) {
            card.dataset.allergens = '';
            return;
        }

        const afterLabel = line.textContent.split(':').slice(1).join(':');
        const [containsPart, mayPart = ''] = afterLabel.split(/\s[-–]\s/);
        const toList = text => text.split(',').map(w => w.trim()).filter(Boolean);
        const contains = toList(containsPart);
        const mayContain = toList(mayPart.replace(/^(poate conține urme de|may contain)\s*/i, ''));

        const keys = new Set([...contains, ...mayContain]
            .map(word => ALLERGEN_WORDS[word.toLowerCase()])
            .filter(Boolean));
        card.dataset.allergens = [...keys].join(' ');

        const box = document.createElement('div');
        box.className = 'allergens';
        box.innerHTML =
            `<span class="allergens-label">${strings.allergens_label}</span>` +
            contains.map(word => `<span class="a-chip">${word}</span>`).join('') +
            (mayContain.length
                ? `<span class="may-contain">${strings.may_contain}: ${mayContain.join(', ')}</span>`
                : '');

        // the chips are a block of their own, so the <br>s around the old line would add empty lines
        [line.previousSibling, line.nextSibling].forEach(node => {
            if (node && node.nodeName === 'BR') node.remove();
        });
        line.replaceWith(box);
    });
}

function buildAllergenFilter() {
    const holder = document.getElementById('allergen-filter');
    holder.innerHTML = ALLERGENS.map(key =>
        `<button type="button" class="filter-chip" data-allergen="${key}" aria-pressed="false">` +
        `<span data-i18n="allergen_${key}">${key}</span></button>`
    ).join('');

    holder.addEventListener('click', e => {
        const chip = e.target.closest('.filter-chip');
        if (!chip) return;
        const key = chip.dataset.allergen;
        if (activeAllergens.has(key)) activeAllergens.delete(key);
        else activeAllergens.add(key);
        chip.setAttribute('aria-pressed', activeAllergens.has(key));
        applyAllergenFilter();
    });
}

// Hides a dish if it contains, or may contain, any of the selected allergens.
function applyAllergenFilter() {
    document.querySelectorAll('#section-food .food-card').forEach(card => {
        const keys = (card.dataset.allergens || '').split(' ');
        card.classList.toggle('filtered-out', keys.some(k => activeAllergens.has(k)));
    });
}


/* ---------- 3. Tabs and category chips ---------- */

const tabs = [
    { button: document.getElementById('btn-drinks'), section: document.getElementById('section-drinks') },
    { button: document.getElementById('btn-food'),   section: document.getElementById('section-food') }
];
const drinkChips = document.getElementById('drink-chips');
const bannerText = document.querySelector('.service-banner [data-i18n]');

function showTab(activeButton) {
    tabs.forEach(({ button, section }) => {
        const isActive = button === activeButton;
        button.classList.toggle('active', isActive);
        section.classList.toggle('hidden', !isActive);
    });

    const drinksActive = activeButton === tabs[0].button;
    drinkChips.hidden = !drinksActive;

    // drinks are ordered at the bar, food at the kitchen
    bannerText.setAttribute('data-i18n', drinksActive ? 'service_toast' : 'food_service');
    bannerText.innerHTML = translations[currentLang][bannerText.getAttribute('data-i18n')];

    measureBars();   // the chips row appeared or disappeared
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

tabs.forEach(({ button }) => button.addEventListener('click', () => showTab(button)));

// Scroll so the category banner ends up just below the header.
drinkChips.addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    e.preventDefault();
    const target = document.querySelector(chip.getAttribute('href'));
    const y = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
    window.scrollTo({ top: y, behavior: 'smooth' });
});

// Highlights the chip of the last category whose banner has scrolled up to the header.
function updateActiveChip() {
    if (drinkChips.hidden) return;
    const chips = [...drinkChips.querySelectorAll('.chip')];
    let current = chips[0];
    chips.forEach(chip => {
        const banner = document.querySelector(chip.getAttribute('href'));
        if (banner.getBoundingClientRect().top <= headerHeight + 40) current = chip;
    });
    chips.forEach(chip => chip.classList.toggle('active', chip === current));
}


/* ---------- 4. Header glass ---------- */

const topBar = document.querySelector('.top-bar');
const menuTabs = document.querySelector('.menu-tabs');
let headerHeight = 0;

// The tabs stick at top: var(--topbar-h), and the glass layer is var(--header-h) tall.
// Both depend on the real size of the bars (font, text length, chips row), so they're
// measured here instead of being hard-coded in the CSS.
function measureBars() {
    const topBarHeight = topBar.getBoundingClientRect().height;
    headerHeight = topBarHeight + menuTabs.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--topbar-h', topBarHeight + 'px');
    document.documentElement.style.setProperty('--header-h', headerHeight + 'px');
    updateHeaderState();
}

// body.scrolled:    the page has moved, so the glass fades in behind the top bar
// body.bars-stuck:  the tabs have reached the top bar, so the glass extends behind them
function updateHeaderState() {
    document.body.classList.toggle('scrolled', window.scrollY > 0);
    const stuck = menuTabs.getBoundingClientRect().top <= topBar.getBoundingClientRect().bottom + 0.5;
    document.body.classList.toggle('bars-stuck', stuck);
}


/* ---------- 5. Bottle zoom ---------- */

const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('.lightbox-caption');
const shopLink = lightbox.querySelector('a.lightbox-shop');
const shopUnavailable = lightbox.querySelector('.lightbox-shop.is-disabled');
let zoomedBottle = null;

function openLightbox(img) {
    // assets/bottles/x.webp -> assets/bottles/large/x.webp, only downloaded when someone taps
    lightboxImg.src = img.getAttribute('src').replace('/bottles/', '/bottles/large/');
    lightboxImg.alt = img.alt;
    const card = img.closest('.beer-card');
    const title = card.querySelector('.beer-title');
    lightboxCaption.textContent = title ? title.textContent : img.alt;

    // "Buy online" if the card has a shop page, otherwise "Unavailable online"
    const shopUrl = card.dataset.shop;
    shopLink.hidden = !shopUrl;
    shopUnavailable.hidden = !!shopUrl;
    if (shopUrl) shopLink.href = shopUrl;

    zoomedBottle = img;
    lightbox.hidden = false;
    document.body.classList.add('lightbox-open');
    lightbox.querySelector('.lightbox-close').focus();
}

function closeLightbox() {
    lightbox.hidden = true;
    document.body.classList.remove('lightbox-open');
    if (zoomedBottle) zoomedBottle.focus({ preventScroll: true });   // back to where the user was
}

document.querySelectorAll('.beer-img-col img').forEach(img => {
    img.setAttribute('role', 'button');
    img.setAttribute('tabindex', '0');
    img.addEventListener('click', () => openLightbox(img));
    img.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightbox(img);
        }
    });
});

// a tap anywhere closes it, the × button included. Tapping "Buy online" opens the shop
// in a new tab and closes the zoom too; tapping "Unavailable online" does nothing.
lightbox.addEventListener('click', e => {
    if (e.target === shopUnavailable) return;
    closeLightbox();
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
});


/* ---------- 6. "Order at the bar" banner ---------- */

const serviceBanner = document.querySelector('.service-banner');

// Hidden at the very bottom so it doesn't sit on top of the footer.
function updateServiceBanner() {
    const distanceToBottom = document.body.offsetHeight - (window.innerHeight + window.scrollY);
    serviceBanner.classList.toggle('hidden-on-scroll', distanceToBottom < 60);
}


/* ---------- 7. Instagram / TikTok logos ---------- */

// The logo files in data-logo are loaded in the background. When one loads, it replaces the
// simple SVG icon (CSS paints it white). If it's missing, the SVG icon just stays.
function loadSocialLogos() {
    document.querySelectorAll('.social-pill[data-logo]').forEach(pill => {
        const src = pill.dataset.logo;
        const probe = new Image();
        probe.onload = () => {
            const logo = pill.querySelector('.social-logo');
            // absolute URL: a relative one would be resolved from the css/ folder
            const url = `url("${new URL(src, document.baseURI).href}")`;
            logo.style.webkitMaskImage = url;
            logo.style.maskImage = url;
            pill.classList.add('has-logo');
        };
        probe.src = src;
    });
}


/* ---------- 8. Start-up ---------- */

buildAllergenFilter();   // before the translations, so the filter labels get translated too
loadSocialLogos();
applyTranslations(detectLanguage());

measureBars();
window.addEventListener('load', measureBars);   // images and fonts can change the sizes
window.addEventListener('resize', measureBars);
if (document.fonts) document.fonts.ready.then(measureBars);

// Scroll events fire much more often than the screen redraws, so the work is done at most once per frame.
let scrollQueued = false;
window.addEventListener('scroll', () => {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(() => {
        scrollQueued = false;
        updateHeaderState();
        updateActiveChip();
        updateServiceBanner();
    });
}, { passive: true });

updateActiveChip();
