let currentLang = 'ro';

function setLanguage(lang) {
    currentLang = lang;
    const container = document.querySelector('.container');
    container.classList.add('fade-out');

    setTimeout(() => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            // Check if translations exist before setting innerHTML
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

// Modal Logic pe element
const modal = document.getElementById('item-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalDetails = document.getElementById('modal-details');
const modalImgContainer = document.getElementById('modal-img-container');
const modalImage = document.getElementById('modal-image');
const closeModal = document.querySelector('.close-modal');

document.querySelectorAll('.trigger-modal').forEach(item => {
    item.addEventListener('click', () => {
        const key = item.getAttribute('data-key');
        
        // Extragem datele din dictionar pe baza cheii de baza (ex: 'easy_rider')
        const titleText = translations[currentLang]['name_' + key] || '';
        const descText = translations[currentLang]['desc_' + key] || '';
        const detailsText = translations[currentLang]['details_' + key] || '';
        const imgSrc = translations[currentLang]['img_' + key];

        modalTitle.innerHTML = titleText;
        modalDesc.innerHTML = descText;
        modalDetails.innerHTML = detailsText;

        // Daca exista o imagine in dictionar pt acest item, o afisam
        if(imgSrc) {
            modalImage.src = imgSrc;
            modalImgContainer.classList.remove('hidden-img');
        } else {
            modalImgContainer.classList.add('hidden-img');
        }

        modal.classList.remove('hidden-modal');
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.add('hidden-modal');
});

// Inchide modalul daca dai click in afara lui
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden-modal');
    }
});