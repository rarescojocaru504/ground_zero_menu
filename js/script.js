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
});

btnFood.addEventListener('click', () => {
    btnFood.classList.add('active');
    btnDrinks.classList.remove('active');
    sectionFood.classList.remove('hidden');
    sectionDrinks.classList.add('hidden');
});

// Apeleaza setLanguage imediat la incarcarea paginii pentru a traduce inclusiv butoanele Meniu
document.addEventListener('DOMContentLoaded', () => {
    setLanguage('ro');
});