let currentLang = 'ro';

function setLanguage(lang) {
    currentLang = lang;
    const container = document.querySelector('.container');
    container.classList.add('fade-out');

    setTimeout(() => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key]; 
            }
        });

        document.querySelectorAll('[data-i18n-href]').forEach(el => {
            const key = el.getAttribute('data-i18n-href');
            if (translations[lang] && translations[lang][key]) {
                el.setAttribute('href', translations[lang][key]);
            }
        });

        document.querySelectorAll('.language-switcher a').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });

        container.classList.remove('fade-out');
    }, 200);
}

document.querySelectorAll('.language-switcher a').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetLang = e.target.getAttribute('data-lang');
        setLanguage(targetLang);
    });
});

const btnDrinks = document.getElementById('btn-drinks');
const btnFood = document.getElementById('btn-food');
const sectionDrinks = document.getElementById('section-drinks');
const sectionFood = document.getElementById('section-food');

btnDrinks.addEventListener('click', () => {
    btnDrinks.classList.add('active');
    btnFood.classList.remove('active');
    sectionDrinks.classList.remove('hidden');
    sectionFood.classList.add('hidden');
    
    // Scroll to the top when switching tabs
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

btnFood.addEventListener('click', () => {
    btnFood.classList.add('active');
    btnDrinks.classList.remove('active');
    sectionFood.classList.remove('hidden');
    sectionDrinks.classList.add('hidden');
    
    // Scroll to the top when switching tabs
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Call setLanguage immediately on page load to translate the Menu buttons as well
document.addEventListener('DOMContentLoaded', () => {
    setLanguage('ro');
});

// Logica pentru Service Banner
const serviceBanner = document.querySelector('.service-banner');

window.addEventListener('scroll', () => {
    // Verificam daca utilizatorul a facut scroll pana jos de tot
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.body.offsetHeight;

    // Daca mai sunt sub 60 de pixeli pana jos, ascundem bannerul usor
    if (documentHeight - scrollPosition < 60) {
        serviceBanner.classList.add('hidden-on-scroll');
    } else {
        serviceBanner.classList.remove('hidden-on-scroll');
    }
});

// Keep the menu tabs stuck right under the sticky top bar (Review + RO/EN)
function setTopbarHeight() {
    const topBar = document.querySelector('.top-bar');
    if (topBar) {
        document.documentElement.style.setProperty('--topbar-h', topBar.offsetHeight + 'px');
    }
}
setTopbarHeight();
window.addEventListener('load', setTopbarHeight);
window.addEventListener('resize', setTopbarHeight);
