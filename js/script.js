// lang switcher logic with smooth fade
function setLanguage(lang) {
    const container = document.querySelector('.container');
    container.classList.add('fade-out');

    setTimeout(() => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                // IMPORTANT: changed from innerText into innerHTML to grant <br> usage in translations
                el.innerHTML = translations[lang][key]; 
            }
        });

        document.querySelectorAll('[data-i18n-href]').forEach(el => {
            const key = el.getAttribute('data-i18n-href');
            if (translations[lang][key]) {
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
// ... restul fisierului ramane neschimbat

document.querySelectorAll('.language-switcher a').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetLang = e.target.getAttribute('data-lang');
        setLanguage(targetLang);
    });
});

// tab switching logic (drinks vs food)
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

// popup logic
const reviewPopup = document.getElementById('review-popup');
const closePopupBtn = document.getElementById('close-popup');

// show popup after 5s if user hasn't closed it in this session
if (!sessionStorage.getItem('reviewPopupClosed')) {
    setTimeout(() => {
        reviewPopup.classList.remove('hidden-popup');
    }, 5000);
}

// close popup and save state
closePopupBtn.addEventListener('click', () => {
    reviewPopup.classList.add('hidden-popup');
    sessionStorage.setItem('reviewPopupClosed', 'true');
});