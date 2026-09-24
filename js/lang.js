/*
 * Ground Zero QR menu – texts in Romanian and English
 *
 * Each key matches a data-i18n="key" in index.html (or data-i18n-href for the PDF links).
 * Add every key to both languages; if one is missing, that text just doesn't change.
 *
 * The values are HTML:
 *   <br>                  new line
 *   <i>Alergeni: ...</i>  allergen line; script.js turns it into chips, so keep the
 *                         "Label: a, b - poate conține urme de c, d" format
 *   <b>...</b>            "Savurează cu:" / "Pair with:"
 *   <strong>...</strong>  beer names in the pairing
 *   <span class='light'>  grey second half of a section title
 *
 * Prices, volumes and weights aren't here, they're in index.html.
 */
const translations = {
    ro: {
        // Tabs and section titles
        tab_drinks: "BĂUTURI",
        tab_food: "MÂNCARE",
        
        cat_gz_beers: "GROUND ZERO <span class='light'>BEERS</span>",
        cat_deranj_beers: "DERANJ <span class='light'>BEERS</span>",
        cat_special: "GROUND ZERO <span class='light'>SPECIAL BEERS</span>",
        cat_guest: "GUEST <span class='light'>BEERS &amp; EXTRA</span>",
        cat_food_main: "MENIU DE BUNĂTĂȚI",
        // Labels of the taste bars
        stat_hops: "HAMEI",
        stat_clarity: "CLARITATE",
        stat_bitterness: "AMĂREALĂ",

        // Ground Zero beers
        desc_easy_rider: "Bere cu o concentrație mai scăzută de alcool pentru a putea fi băută la o masă de prânz sau, în contextul în care vrei să bei mai multe, fără să te ia cu amețeală.",
        desc_morning_glory: "Exotică, cu note de mango, grapefruit și tușe de citrice. Puternic amară, evidențiind perfect caracterul hameiului.",
        desc_split_pot: "O bere cu tărie crescută, hazy, miros de iarbă, bine aromată, cu mult hamei și note de fructe tropicale: ananas, mango, piersică.",
        desc_imperial_fuck: "O bere puternică, cu gust bogat, mai amară și mai aromată decât IPA, dar și cu o dulceață reținută. Una dintre cele mai puternice beri produse în România.",
        desc_amber_guerre: "O bere roșie cu arome florale complexe și note de fructe negre, stafide, dar cu o amăreală fermă. Creată special pentru pairing-ul cu burger și carne la grătar.",
        desc_black_hole: "Bere brună cu un corp mediu și concentrație mică de alcool. Gust ușor dulceag cu arome de malțuri prăjite, ciocolată neagră și tușe de cafea.",

        // Deranj beers
        desc_deranj_blonda: "Stil de bere tradițional nemțesc, fermentată și maturată natural până atinge gustul specific, lejer și răcoritor.",
        desc_deranj_oranj: "Bază de malt nemțesc din orz și grâu, peste care adăugăm hamei din Washington. Berea trece printr-un proces natural de fermentare și maturare la finalul căruia se adaugă extract de portocale 100% natural.",
        desc_deranj_ipa: "O bere de tip India Pale Ale brasată cu malțuri, hamei și drojdie de cea mai înaltă calitate, pentru un echilibru perfect.",
        desc_deranj_doar: "O bere care oferă echilibrul perfect dintre malț și hamei și care, printr-o maturare îndelungată, capătă arome intense și o savoare rafinată.",

        // XperimentALE and the beer flight
        desc_x029: "O bere foarte apreciată în rândul cunoscătorilor. Pentru a crea un profil de malț care să echilibreze atât dulceața, cât și amărăciunea acestui stil clasic, am adăugat boabe de cacao, cafea de specialitate, vanilie de Madagascar. Aroma rezultată este atât fină, cât și nuanțată. Descoperiți note de ciocolată, aromă de sherry, boabe de cacao și fructe negre.",
        desc_x030: "Pils german nefiltrat, cu malt din regiunea Bamberg, Germania, hamei Mandarina Bavaria - arome citrice, amăreală fină, gust super răcoritor.",
        name_pachet: "PACHET DEGUSTARE", desc_pachet: "Easy Rider, Morning Glory, Split the Pot, Imperial Fuck, Black Hole",

        // Guest & Extra (only the names that differ between languages)
        name_sprit: "ȘPRIȚ CAII DE LA LETEA",
        name_socata: "SOCATĂ ARTIZANALĂ",
        name_lemonaid_blood: "LEMONAID BLOOD ORANGE ECO",
        name_lemonaid_passion: "LEMONAID PASSION FRUIT ECO",
        name_apple: "SUC MERO APPLE SPRITZER",
        name_cidru_brut: "CIDRU BRUT MERE/PERE",
        name_cidru_extra: "CIDRU EXTRA BRUT MERE",
        name_fritz: "FRITZ-KOLA +/- ZAHĂR",

        // Food
        name_carnat: "CÂRNAT ÎMPUȘCAT", desc_carnat: "Cârnat kasekrainer de porc cu brânză, muștar, castravete murat, pâine.<br><i>Alergeni: gluten, muștar, lactate</i><br><b>Savurează cu:</b> Helles, Kolsch - <strong>Deranj Blondă</strong>, <strong>Deranj Doar O Bere</strong>",
        name_aripi_bbq: "ARIPIOARE ÎMBUIBATE", desc_aripi_bbq: "Aripioare glazurate cu sos BBQ și presărate cu ceapă verde.<br><i>Alergeni: muștar, susan, soia</i><br><b>Savurează cu:</b> Kolsch - <strong>Deranj Blondă</strong>",
        name_aripi_picante: "ARIPIOARE ÎNFLĂCĂRATE", desc_aripi_picante: "Aripioare glazurate cu sos Gochujang și presărate cu ceapă verde.<br><i>Alergeni: muștar, susan, soia</i><br><b>Savurează cu:</b> NEIPA - <strong>Split the Pot</strong>, <strong>Deranj IPA</strong>",
        name_coaste: "COASTE ÎMPĂNATE", desc_coaste: "Coaste de porc* glazurate cu sos BBQ presărate cu ceapă verde.<br><i>Alergeni: gluten, alune</i><br><b>Savurează cu:</b> Imperial Stout, Porter - <strong>Black Hole</strong>",
        name_chiftea: "CHIFTEA'N PÂINE", desc_chiftea: "Smash Burger de vită, cheddar, castravete murat, ceapă roșie, mustar, ketchup, chiflă cu unt.<br><i>Alergeni: gluten, ou, lactate, muștar, țelină</i><br><b>Savurează cu:</b> Red Ale, Pale Ale - <strong>Amber Guerre</strong>, <strong>Easy Rider</strong>",
        name_chiftea_tunata: "CHIFTEA TUNATĂ", desc_chiftea_tunata: "Smash Burger de vită, cheddar, bacon, jalapeno murat, fulgi de ceapă prăjită, sos BBQ, chiflă cu unt.<br><i>Alergeni: gluten, ou, lactate, muștar, sulfiți - poate conține urme de țelină, soia, lupin, susan</i><br><b>Savurează cu:</b> Red Ale, IPA - <strong>Amber Guerre</strong>, <strong>Morning Glory</strong>, <strong>Imperial Fuck</strong>",
        name_chiftea_dubla: "CHIFTEA DUBLĂ", desc_chiftea_dubla: "Smash Burger de vită x2, cheddar x2, castravete murat, ceapă roșie, mustar, ketchup, chiflă cu unt.<br><i>Alergeni: gluten, ou, lactate, muștar, țelină</i><br><b>Savurează cu:</b> Red Ale, Pale Ale - <strong>Amber Guerre</strong>, <strong>Easy Rider</strong>",
        name_chiftea_vara: "CHIFTEA DE VARĂ", desc_chiftea_vara: "Smash Burger de vită, cheddar, bacon, salată iceberg, sos tartar (sos de maioneză, ceapă, castraveți murați, muștar, boia), chiflă cu unt.<br><i>Alergeni: lactate, ou, gluten, muștar</i><br><b>Savurează cu:</b> IPA - <strong>Split the Pot</strong>, <strong>Imperial Fuck</strong>",
        name_mamaliga: "MĂMĂLIGĂ PRESATĂ", desc_mamaliga: "Nachos, sos ardei copt, sprinkle bacon, mix de 4 brânzeturi, jalapeno murat, ceapă verde, guacamole, salsa de roșii coapte.<br><i>Alergeni: gluten, lactate - poate conține urme de muștar, țelină</i><br><b>Savurează cu:</b> Pale Ale - <strong>Easy Rider</strong>",
        name_curry: "CURRYWURST", desc_curry: "Kasekrainer de porc, cartofi prăjiți, ketchup, ceapă prăjită, curry.<br><i>Alergeni: țelină, lactoză</i><br><b>Savurează cu:</b> IPA - <strong>Morning Glory</strong>",
        name_cartofi_cor: "CARTOFI COREENI", desc_cartofi_cor: "Cartofi proaspeți prăjiți cu sos de maioneză și Gochujang, ceapă verde, ceapă prăjită și semințe de susan.<br><i>Alergeni: soia, gluten, ou, muștar, susan</i><br><b>Savurează cu:</b> IPA - <strong>Morning Glory</strong>, <strong>Imperial Fuck</strong>",
        name_cartofi: "CARTOFI PRĂJIȚI", desc_cartofi: "Cartofi proaspeți prăjiți.",
        name_cartofi_branza: "CARTOFI CU BRÂNZĂ", desc_cartofi_branza: "Cartofi proaspeți prăjiți presărați cu Grana Padano sau telemea de oaie.<br><i>Alergeni: lactate</i>",
        name_sos: "EXTRA SOS", desc_sos: "Sos de maioneză picantă<br>Sos de maioneză<br>Sos de maioneză cu usturoi<br>Ketchup<br>Sos de Barbeque<br><i>Alergeni: ou, soia, muștar, sulfiți</i>",

        // Legend under the food menu
        food_legend: "<strong>Legendă:</strong> *produs / din produs congelat<br>Listă Alergeni: nuci, gluten, lactate, lupin, muștar, ou, pește, soia, sulfiți, susan, țelină",

        // Food tab banner, allergen filter, tags, shop button in the bottle zoom, footer
        food_service: "Comanda și servirea la bucătărie / Apreciem debarasarea",
        filter_title: "Ascunde produsele cu:",
        filter_note: "Informativ – dacă ai o alergie, te rugăm să întrebi la bar.",
        allergens_label: "Alergeni",
        may_contain: "Poate conține urme de",
        allergen_gluten: "gluten", allergen_dairy: "lactate", allergen_egg: "ou", allergen_mustard: "muștar",
        allergen_sesame: "susan", allergen_soy: "soia", allergen_celery: "țelină", allergen_sulphites: "sulfiți",
        allergen_nuts: "nuci", allergen_lupin: "lupin",
        badge_limited: "EDIȚIE LIMITATĂ",
        badge_unavailable: "INDISPONIBIL",
        shop_buy: "Cumpără online",
        shop_unavailable: "Indisponibil online",
        footer_tips: "Tips nu este inclus / Dar foarte apreciat",

        // About buttons (text + PDF link) and the drinks banner
        btn_flyer_gz: "DESPRE GAMA GROUND ZERO",
        link_flyer_gz: "assets/pdf/ground_zero_pliant_ro.pdf",
        btn_flyer_deranj: "DESPRE GAMA DERANJ",
        link_flyer_deranj: "assets/pdf/deranj_pliant_ro.pdf",
        service_toast: "Comanda și servirea la bar / Apreciem debarasarea"
    },
    en: {
        // Tabs and section titles
        tab_drinks: "DRINKS",
        tab_food: "FOOD",
        
        cat_gz_beers: "GROUND ZERO <span class='light'>BEERS</span>",
        cat_deranj_beers: "DERANJ <span class='light'>BEERS</span>",
        cat_special: "GROUND ZERO <span class='light'>SPECIAL BEERS</span>",
        cat_guest: "GUEST <span class='light'>BEERS &amp; EXTRA</span>",
        cat_food_main: "FOOD MENU",
        // Labels of the taste bars
        stat_hops: "HOPS",
        stat_clarity: "CLARITY",
        stat_bitterness: "BITTERNESS",

        // Ground Zero beers
        desc_easy_rider: "A less alcoholic beer to be consumed during lunch or when you want to drink more without getting dizzy.",
        desc_morning_glory: "Exotic, with notes of mango, grapefruit and hints of citrus. Strongly bitter, perfectly highlighting the hop character.",
        desc_split_pot: "A stronger, hazy, grassy beer, well flavored, with lots of hops and tropical fruits hints (pineapple, mango, peach).",
        desc_imperial_fuck: "A strong rich taste beer, bitter and more flavored than an IPA, but also with a discreet sweetness. One of the strongest beers produced in Romania.",
        desc_amber_guerre: "A red beer with a complex floral flavor and hints of black fruits, raisins, but with a sharp bitterness. Perfect for burger & grill pairing.",
        desc_black_hole: "A soft body and low alcoholic concentration dark beer, slightly sweet with roasted malt, chocolate, coffee hints and a long tasty finish.",

        // Deranj beers
        desc_deranj_blonda: "A traditional German beer style, naturally brewed until reaches its specific light and refreshing taste.",
        desc_deranj_oranj: "German malt from barley and wheat topped with a bit of hops and a drop of 100% natural orange extract.",
        desc_deranj_ipa: "Top quality malts, hops and yeast for a perfect balance.",
        desc_deranj_doar: "A beer that offers the perfect balance between malt and hops and, through long maturation, develops intense aromas and a refined flavor.",

        // XperimentALE and the beer flight
        desc_x029: "A beer highly regarded by connoisseurs. To create a malt profile that balances both the sweetness and bitterness of this classic style, we added cocoa beans, specialty coffee, and Madagascar vanilla. The resulting flavor is both smooth and nuanced. Discover notes of chocolate, sherry, cocoa beans, and dark fruits.",
        desc_x030: "Unfiltered German Pilsner made with malt from the Bamberg region of Germany and Mandarina Bavaria hops-featuring citrus aromas, a refined bitterness, and a super-refreshing taste.",
        name_pachet: "BEER FLIGHT", desc_pachet: "Easy Rider, Morning Glory, Split the Pot, Imperial Fuck, Black Hole",

        // Guest & Extra (only the names that differ between languages)
        name_sprit: "HOMEMADE CARBONATED WINE",
        name_socata: "ELDERFLOWER DRINK",
        name_lemonaid_blood: "LEMONAID BLOOD ORANGE ECO",
        name_lemonaid_passion: "LEMONAID PASSION FRUIT ECO",
        name_apple: "MERO JUICE",
        name_cidru_brut: "CIDER APPLE/PEAR",
        name_cidru_extra: "CIDER EXTRA APPLE",
        name_fritz: "FRITZ-KOLA +/- SUGAR",

        // Food
        name_carnat: "KASEKRAINER SAUSAGE", desc_carnat: "Pork Kasekrainer with cheese, mustard, pickles, bread.<br><i>Allergens: dairy, gluten, mustard</i><br><b>Pair with:</b> Helles, Kolsch - <strong>Deranj Blondă</strong>, <strong>Deranj Doar O Bere</strong>",
        name_aripi_bbq: "BBQ CHICKEN WINGS", desc_aripi_bbq: "BBQ glazed chicken wings sprinkled with green onions.<br><i>Allergens: mustard, sesame, soya</i><br><b>Pair with:</b> Lager, Kolsch - <strong>Deranj Blondă</strong>",
        name_aripi_picante: "HOT CHICKEN WINGS", desc_aripi_picante: "Hot sauce glazed chicken wings sprinkled with green onions.<br><i>Allergens: mustard, sesame, soya</i><br><b>Pair with:</b> NEIPA - <strong>Split the Pot</strong>, <strong>Deranj IPA</strong>",
        name_coaste: "BBQ PORK RIBS", desc_coaste: "BBQ glazed pork ribs* sprinkled with green onions.<br><i>Allergens: gluten</i><br><b>Pair with:</b> Imperial Stout, Porter - <strong>Black Hole</strong>",
        name_chiftea: "SMASH BURGER", desc_chiftea: "Beef patty, cheddar, pickles, red onion, mustard, ketchup, soft butter bun.<br><i>Allergens: dairy, gluten, egg, mustard, celery</i><br><b>Pair with:</b> Red Ale, Pale Ale - <strong>Amber Guerre</strong>, <strong>Easy Rider</strong>",
        name_chiftea_tunata: "THE OTHER SMASH BURGER", desc_chiftea_tunata: "Beef patty, cheddar, bacon, pickled jalapeno, fried onion flakes, BBQ sauce, soft butter bun.<br><i>Allergens: gluten, egg, dairy, mustard, sulphites - may contain celery, soya, lupine, sesame</i><br><b>Pair with:</b> Red Ale, IPA - <strong>Amber Guerre</strong>, <strong>Morning Glory</strong>, <strong>Imperial Fuck</strong>",
        name_chiftea_dubla: "DOUBLE SMASH BURGER", desc_chiftea_dubla: "Beef patty x2, cheddar x2, pickled cucumber, red onion, mustard, ketchup, soft butter bun.<br><i>Allergens: gluten, egg, dairy, mustard, celery</i><br><b>Pair with:</b> Red Ale, Pale Ale - <strong>Amber Guerre</strong>, <strong>Easy Rider</strong>",
        name_chiftea_vara: "FRESH SMASH", desc_chiftea_vara: "Beef patty, cheddar, bacon, iceberg lettuce, tartar sauce (mayonnaise sauce, onions, pickles, mustard, paprika), soft butter bun.<br><i>Allergens: dairy, egg, gluten, mustard</i><br><b>Pair with:</b> IPA - <strong>Split the Pot</strong>, <strong>Imperial Fuck</strong>",
        name_mamaliga: "LOADED NACHOS", desc_mamaliga: "Nachos, roasted red pepper sauce, sprinkled bacon, pickled jalapeno, 4 types of cheese mix, green onion, guacamole, salsa.<br><i>Allergens: gluten, dairy - may contain mustard, celery</i><br><b>Pair with:</b> Pale Ale - <strong>Easy Rider</strong>",
        name_curry: "SAUSAGE CURRY FRIES", desc_curry: "Pork kasekrainer, fries, fried onion flakes, ketchup, curry.<br><i>Allergens: lactose, celery</i><br><b>Pair with:</b> IPA - <strong>Morning Glory</strong>",
        name_cartofi_cor: "SPICY KOREAN FRIES", desc_cartofi_cor: "Fresh fried potatoes with mayo and Gochujang sauce, sprinkled with green onions, fried onion flakes and sesame seeds.<br><i>Allergens: soya, gluten, egg, mustard, sesame</i><br><b>Pair with:</b> IPA - <strong>Morning Glory</strong>, <strong>Imperial Fuck</strong>",
        name_cartofi: "FRIES", desc_cartofi: "Fresh fried potatoes.",
        name_cartofi_branza: "CHEESY FRIES", desc_cartofi_branza: "Fresh fries sprinkled with Grana Padano or Romanian cheese.<br><i>Allergens: dairy</i>",
        name_sos: "EXTRA SAUCE", desc_sos: "Spicy mayonnaise sauce<br>Mayonnaise sauce<br>Garlic mayo sauce<br>Ketchup<br>Bbq sauce<br><i>Allergens: egg, soy, mustard, sulphites</i>",

        // Legend under the food menu
        food_legend: "<strong>Legend:</strong> *frozen or from frozen product<br>Allergens: nuts, gluten, dairy, lupine, mustard, egg, fish, soya, sulphites, sesame, celery",

        // Food tab banner, allergen filter, tags, shop button in the bottle zoom, footer
        food_service: "Order &amp; service @ the counter / We appreciate you clearing your table",
        filter_title: "Hide items containing:",
        filter_note: "For guidance only – if you have an allergy, please ask at the bar.",
        allergens_label: "Allergens",
        may_contain: "May contain",
        allergen_gluten: "gluten", allergen_dairy: "dairy", allergen_egg: "egg", allergen_mustard: "mustard",
        allergen_sesame: "sesame", allergen_soy: "soy", allergen_celery: "celery", allergen_sulphites: "sulphites",
        allergen_nuts: "nuts", allergen_lupin: "lupine",
        badge_limited: "LIMITED EDITION",
        badge_unavailable: "UNAVAILABLE",
        shop_buy: "Buy online",
        shop_unavailable: "Unavailable online",
        footer_tips: "Service not included / But very welcome",

        // About buttons (text + PDF link) and the drinks banner
        btn_flyer_gz: "ABOUT GROUND ZERO",
        link_flyer_gz: "assets/pdf/ground_zero_pliant_en.pdf",
        btn_flyer_deranj: "ABOUT DERANJ",
        link_flyer_deranj: "assets/pdf/deranj_pliant_en.pdf",
        service_toast: "Order at the bar / We appreciate you clearing your table"
    }
};
