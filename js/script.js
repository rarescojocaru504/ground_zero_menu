// Dictionarul cu traducerile
const translations = {
    ro: {
        title_drinks: "BĂUTURI",
        cat_draft: "BERE LA DRAFT",
        desc_weiss: "(Bere de grâu nefiltrată)",
        title_food: "MÂNCARE",
        item_pork: "PORC TĂIAT (5 BUC)",
        title_info: "INFORMAȚII",
        btn_flyer_gz: "📄 Vezi Pliant Ground Zero",
        link_flyer_gz: "assets/pdf/ground_zero_pliant_ro.pdf",
        btn_flyer_deranj: "📄 Vezi Pliant Deranj",
        link_flyer_deranj: "assets/pdf/deranj_pliant_ro.pdf",
        review_title: "Ți-a plăcut la noi?",
        review_desc: "Părerea ta ne ajută să creștem!",
        review_btn: "⭐ Lasă-ne un review pe Google!"
    },
    en: {
        title_drinks: "DRINKS",
        cat_draft: "DRAUGHT BEER",
        desc_weiss: "(Unfiltered wheat beer)",
        title_food: "FOOD",
        item_pork: "SLAUGHTERED PIG (5 PCS)",
        title_info: "INFORMATION",
        btn_flyer_gz: "📄 View Ground Zero Flyer",
        link_flyer_gz: "assets/pdf/ground_zero_pliant_en.pdf",
        btn_flyer_deranj: "📄 View Deranj Flyer",
        link_flyer_deranj: "assets/pdf/deranj_pliant_en.pdf",
        review_title: "Did you enjoy your time?",
        review_desc: "Your feedback helps us grow!",
        review_btn: "⭐ Leave a review on Google!"
    }
};

// Functia de schimbare a limbii
function setLanguage(lang) {
    // 1. Schimba textele
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });

    // 2. Schimba linkurile (href) - util pentru PDF-uri
    document.querySelectorAll('[data-i18n-href]').forEach(el => {
        const key = el.getAttribute('data-i18n-href');
        if (translations[lang][key]) {
            el.setAttribute('href', translations[lang][key]);
        }
    });

    // 3. Schimba starea vizuala a butoanelor RO/EN
    document.querySelectorAll('.language-switcher a').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

// Atasam evenimentele de click pe butoanele de limba
document.querySelectorAll('.language-switcher a').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault(); // Opreste scroll-ul default al linkului
        const targetLang = e.target.getAttribute('data-lang');
        setLanguage(targetLang);
    });
});