// translations dict
const translations = {
    ro: {
        tab_drinks: "BĂUTURI",
        tab_food: "MÂNCARE",
        
        // categorii
        cat_gz_beers: "GROUND ZERO BEERS",
        cat_deranj_beers: "DERANJ BEERS",
        cat_special: "SPECIAL BEERS & PACKS",
        cat_guest: "GUEST BEERS & EXTRA",
        cat_food_main: "MENIU DE BUNĂTĂȚI",

        // Ground Zero Beers
        name_easy_rider: "EASY RIDER (Session IPA 4.5%)", price_easy_rider: "De la 15 RON", desc_easy_rider: "Bere cu o concentrație mai scăzută de alcool pentru a putea fi băută la o masă de prânz sau, în contextul în care vrei să bei mai multe, fară să te ia cu amețeală.", details_easy_rider: "0.2L: 15 RON | 0.4L: 29 RON | 1.5L: 99 RON | 0.33L: 27 RON",
        name_morning_glory: "MORNING GLORY (IPA 6%)", price_morning_glory: "De la 16 RON", desc_morning_glory: "Exotică, cu note de mango, grapefruit și tușe de citrice. Puternic amară, evidențiind perfect caracterul hameiului.", details_morning_glory: "0.2L: 16 RON | 0.4L: 31 RON | 1.5L: 109 RON | 0.33L: 29 RON",
        name_split_pot: "SPLIT THE POT (NEIPA 7%)", price_split_pot: "De la 17 RON", desc_split_pot: "O bere cu tărie crescută, hazy, miros de iarbă, bine aromată, cu mult hamei și note de fructe tropicale: ananas, mango, piersică.", details_split_pot: "0.2L: 17 RON | 0.4L: 33 RON | 1.5L: 119 RON | 0.33L: 31 RON",
        name_imperial_fuck: "IMPERIAL FUCK (Double IPA 9%)", price_imperial_fuck: "De la 18 RON", desc_imperial_fuck: "O bere puternică, cu gust bogat, mai amară și mai aromată decât IPA, dar și cu o dulceaţă reținută. Una dintre cele mai puternice beri produse în România.", details_imperial_fuck: "0.2L: 18 RON | 0.4L: 35 RON | 1.5L: 125 RON | 0.33L: 33 RON",
        name_amber_guerre: "AMBER GUERRE (American Red Ale 5.6%)", price_amber_guerre: "De la 15 RON", desc_amber_guerre: "O bere roșie cu arome florale complexe și note de fructe negre, stafide, dar cu o amăreală fermă. Creată special pentru pairing-ul cu burger și carne la grătar.", details_amber_guerre: "0.2L: 15 RON | 0.4L: 29 RON | 1.5L: 99 RON | 0.33L: 27 RON",
        name_black_hole: "BLACK HOLE (Hoppy Porter 4.5%)", price_black_hole: "De la 15 RON", desc_black_hole: "Bere brună cu un corp mediu și concentrație mică de alcool. Gust ușor dulceag cu arome de malțuri prăjite, ciocolată neagră și tușe de cafea.", details_black_hole: "0.2L: 15 RON | 0.4L: 29 RON | 1.5L: 99 RON | 0.33L: 32 RON",

        // Deranj Beers
        name_deranj_blonda: "DERANJ BLONDĂ (Kolsch 4.9%)", price_deranj_blonda: "De la 15 RON", desc_deranj_blonda: "Stil de bere tradițional nemțesc, fermentată și maturată natural până atinge gustul specific, lejer și răcoritor.", details_deranj_blonda: "0.2L: 15 RON | 0.4L: 29 RON | 1.5L: 95 RON | 0.5L: 32 RON",
        name_deranj_oranj: "DERANJ ORANJ (Orange Wheat Ale 5%)", price_deranj_oranj: "De la 15 RON", desc_deranj_oranj: "Bază de malt nemțesc din orz și grâu, peste care adăugăm hamei din Washington. Berea trece printr-un proces natural de fermentare și maturare la finalul căruia se adaugă extract de portocale 100% natural.", details_deranj_oranj: "0.2L: 15 RON | 0.4L: 29 RON | 1.5L: 95 RON | 0.5L: 32 RON",
        name_deranj_ipa: "DERANJ IPA (IPA 5.8%)", price_deranj_ipa: "De la 16 RON", desc_deranj_ipa: "O bere de tip india Pale Ale brasată cu malțuri, hamei și drojdie de cea mai înaltă calitate, pentru un echilibru perfect.", details_deranj_ipa: "0.2L: 16 RON | 0.4L: 31 RON | 1.5L: 107 RON | 0.5L: 35 RON",
        name_deranj_doar: "DOAR O BERE (Helles 5.0%)", price_deranj_doar: "De la 15 RON", desc_deranj_doar: "O bere care oferă echilibrul perfect dintre malț și hamei și care, printr-o maturare îndelungată, capătă arome intense și o savoare rafinată.", details_deranj_doar: "0.2L: 15 RON | 0.4L: 29 RON | 1.5L: 99 RON | 0.5L: 32 RON",

        // Special Beers
        name_x029: "XPERIMENTALE 029 (Russian Imp. Stout 12%)", price_x029: "De la 22 RON", desc_x029: "Pentru a crea un profil de malt care să echilibreze dulceaţa și amărăciunea am adăugat boabe de cacao, cafea de specialitate, vanilie de Madagascar. Note de ciocolată, sherry și fructe negre.", details_x029: "0.2L: 22 RON | 0.4L: 43 RON",
        name_x030: "XPERIMENTALE 030 (Citric Pils 5.2%)", price_x030: "De la 17 RON", desc_x030: "Pils german nefiltrat, cu malt din regiunea Bamber Germania, hamei Mandarina Bavaria - arome citrice, amăreală fină, gust super răcoritor.", details_x030: "0.2L: 17 RON | 0.4L: 33 RON | 1.5L: 119 RON",
        name_pachet: "PACHET DEGUSTARE", price_pachet: "59 RON", desc_pachet: "Easy Rider, Morning Glory, Split the Pot, Imperial Fuck, Black Hole", details_pachet: "5 X 100ML",

        // Guest & Extra
        name_tap1: "SCHNEIDER WEISSE TAP 1 (4.9%)", price_tap1: "22 RON", desc_tap1: "Helle Weisse", details_tap1: "0.5L",
        name_tap3: "SCHNEIDER WEISSE TAP 3 (<0.5%)", price_tap3: "25 RON", desc_tap3: "Alkoholfree", details_tap3: "0.5L",
        name_tap5: "SCHNEIDER WEISSE TAP 5 (8.2%)", price_tap5: "27 RON", desc_tap5: "Hopfenweisse", details_tap5: "0.5L",
        name_sprit: "ȘPRIŢ CAII DE LA LETEA", price_sprit: "De la 19 RON", desc_sprit: "Vin carbonatat", details_sprit: "0.2L: 19 RON | 0.4L: 37 RON",
        name_socata: "SOCATĂ ARTIZANALĂ", price_socata: "21 RON", desc_socata: "", details_socata: "0.33L",
        name_lemonaid_lime: "LEMONAID LIME ECO", price_lemonaid_lime: "23 RON", desc_lemonaid_lime: "", details_lemonaid_lime: "0.33L",
        name_lemonaid_blood: "LEMONAID BLOOD ORANGE ECO", price_lemonaid_blood: "23 RON", desc_lemonaid_blood: "", details_lemonaid_blood: "0.33L",
        name_lemonaid_passion: "LEMONAID PASSION FRUIT ECO", price_lemonaid_passion: "23 RON", desc_lemonaid_passion: "", details_lemonaid_passion: "0.33L",
        name_lemonaid_ginger: "LEMONAID GINGER ECO", price_lemonaid_ginger: "23 RON", desc_lemonaid_ginger: "", details_lemonaid_ginger: "0.33L",
        name_apple: "SUC MERO APPLE SPRITZER", price_apple: "23 RON", desc_apple: "", details_apple: "0.33L",
        name_cidru_brut: "CIDRU BRUT MERE/PERE", price_cidru_brut: "22 RON", desc_cidru_brut: "", details_cidru_brut: "0.33L",
        name_cidru_extra: "CIDRU EXTRA BRUT MERE", price_cidru_extra: "22 RON", desc_cidru_extra: "", details_cidru_extra: "0.33L",
        name_fritz: "FRITZ-KOLA +/- ZAHĂR", price_fritz: "19 RON", desc_fritz: "", details_fritz: "0.33L",

        // Food
        name_carnat: "CÂRNAT ÎMPUŞCAT", price_carnat: "45 RON", desc_carnat: "Cârnat kasekrainer de porc cu branza, castravete murat, pâine.<br><i>Alergeni: gluten, muştar, lactate</i><br><b>Savurează cu:</b> Helles, Kolsch - Deranj Blonda, Deranj Doar O Bere", details_carnat: "~320 g",
        name_aripi_bbq: "ARIPIOARE ÎMBUIBATE", price_aripi_bbq: "37 RON", desc_aripi_bbq: "Aripioare glazurate cu sos BBQ și presărate cu ceapă verde.<br><i>Alergeni: muştar, susan, soia</i><br><b>Savurează cu:</b> Kolsch - Deranj Blondă", details_aripi_bbq: "~280 g",
        name_aripi_picante: "ARIPIOARE ÎNFLĂCĂRATE", price_aripi_picante: "39 RON", desc_aripi_picante: "Aripioare glazurate cu sos Gochujang și presărate cu ceapă verde.<br><i>Alergeni: mustar, susan, soia</i><br><b>Savurează cu:</b> NEIPA - Split the Pot, Deranj IPA", details_aripi_picante: "~280 g",
        name_coaste: "COASTE ÎMPĂNATE", price_coaste: "62 RON", desc_coaste: "Coaste de porc* glazurate cu sos BBQ presărate cu ceapă verde.<br><i>Alergeni: gluten, alune</i><br><b>Savurează cu:</b> Imperial Stout, Porter - Black Hole", details_coaste: "~400 g",
        name_chiftea: "CHIFTEA'N PÂINE", price_chiftea: "47 RON", desc_chiftea: "Smash Burger de vită, cheddar, castravete murat, ceapă roșie, mustar, ketchup, chiflă cu unt.<br><i>Alergeni: gluten, ou, lactate, muştar, țelină</i><br><b>Savurează cu:</b> Red Ale, Pale Ale - Amber Guerre, Easy Rider", details_chiftea: "~270 g",
        name_chiftea_tunata: "CHIFTEA TUNATĂ", price_chiftea_tunata: "49 RON", desc_chiftea_tunata: "Smash Burger de vită, cheddar, bacon, jalapeno murat, fulgi de ceapă prăjită, sos BBQ, chiflă cu unt.<br><i>Alergeni: gluten, ou, lactate, mustar, sulfiti - poate conține urme de telină, soia, lupin, susan</i><br><b>Savurează cu:</b> Red Ale, IPA - Amber Guerre, Morning Glory, Imperial Fuck", details_chiftea_tunata: "~290 g",
        name_chiftea_dubla: "CHIFTEA DUBLĂ", price_chiftea_dubla: "68 RON", desc_chiftea_dubla: "Smash Burger de vită x2, cheddar x2, castravete murat, ceapă roșie, mustar, ketchup, chiflă cu unt.<br><i>Alergeni: gluten, ou, lactate, muştar, țelină</i><br><b>Savurează cu:</b> Red Ale, Pale Ale - Amber Guerre, Easy Rider", details_chiftea_dubla: "~400 g",
        name_chiftea_vara: "CHIFTEA DE VARĂ", price_chiftea_vara: "50 RON", desc_chiftea_vara: "Smash Burger de vită x2, cheddar x2, castravete murat, ceapă roșie, mustar, ketchup, chiflă cu unt.<br><i>Alergeni: lactate, ou, gluten, mustar</i><br><b>Savurează cu:</b> IPA - Split The Pot, Imperial fuck", details_chiftea_vara: "~270 g",
        name_mamaliga: "MĂMĂLIGĂ PRESATĂ", price_mamaliga: "65 RON", desc_mamaliga: "Nachos, sos ardei copt, sprinkle bacon, mix de 4 brânzeturi, jalapeno murat, ceapă verde, guacamole, salsa de roșii coapte.<br><i>Alergeni: gluten, lactate - poate contine urme de mustar, telină</i><br><b>Savurează cu:</b> Pale Ale - Easy Rider", details_mamaliga: "~500 g",
        name_curry: "CURRYWURST", price_curry: "40 RON", desc_curry: "Kasekrainer de porc, cartofi prăjiti, ketchup, ceapă prăjită, curry.<br><i>Alergeni: telină, lactoză</i><br><b>Savurează cu:</b> IPA - Morning Glory", details_curry: "~340 g",
        name_cartofi_cor: "CARTOFI COREENI", price_cartofi_cor: "32 RON", desc_cartofi_cor: "Cartofi proaspeți prăjiți cu sos de maioneză și Gochujang, ceapă verde, ceapă prăjită și semințe de susan.<br><i>Alergeni: soia, gluten, ou, muştar, susan</i><br><b>Savurează cu:</b> IPA - Morning Glory, Imperial Fuck", details_cartofi_cor: "~300 g",
        name_cartofi: "CARTOFI PRĂJIŢI", price_cartofi: "21 RON", desc_cartofi: "Cartofi proaspeți prăjiți.", details_cartofi: "~200 g",
        name_cartofi_branza: "CARTOFI CU BRÂNZĂ", price_cartofi_branza: "23 RON", desc_cartofi_branza: "Cartofi proaspeți prăjiți presărați cu Grana Padano sau telemea de oaie.<br><i>Alergeni: lactate</i>", details_cartofi_branza: "~200 g",
        name_sos: "EXTRA SOS", price_sos: "5 RON", desc_sos: "Sos de maioneză picantă, Sos de maioneză, Sos de maioneză cu usturoi, Ketchup, Sos de Barbeque.<br><i>Alergeni: ou, soia, muştar, sulfiți</i>", details_sos: "~40 ml",

        // UI
        btn_details: "Detalii",
        mock_img_text: "[ Imagine Produs ]",
        title_info: "INFORMAȚII",
        btn_flyer_gz: "Despre Ground Zero",
        link_flyer_gz: "assets/pdf/ground_zero_pliant_ro.pdf",
        btn_flyer_deranj: "Despre Deranj",
        link_flyer_deranj: "assets/pdf/deranj_pliant_ro.pdf",
        review_title: "Ți-a plăcut la noi?",
        review_desc: "Părerea ta ne ajută să creștem!",
        review_btn: "⭐ Lasă-ne un review pe Google!",
        popup_text: "Ne-am bucura de un review!",
        popup_btn: "⭐ Lasă o părere"
    },
    en: {
        tab_drinks: "DRINKS",
        tab_food: "FOOD",
        
        cat_gz_beers: "GROUND ZERO BEERS",
        cat_deranj_beers: "DERANJ BEERS",
        cat_special: "SPECIAL BEERS",
        cat_guest: "GUEST BEERS & EXTRA",
        cat_food_main: "FOOD MENU",

        name_easy_rider: "EASY RIDER (Session IPA 4.5%)", price_easy_rider: "From 15 RON", desc_easy_rider: "A less alcoholic beer to be consumed during lunch or when you want to drink more without getting dizzy.", details_easy_rider: "0.2L: 15 RON | 0.4L: 29 RON | 1.5L: 99 RON | 0.33L: 27 RON",
        name_morning_glory: "MORNING GLORY (IPA 6%)", price_morning_glory: "From 16 RON", desc_morning_glory: "Exotic, with notes of mango, grapefruit and hints of citrus. Strongly bitter, perfectly highlighting the hop character.", details_morning_glory: "0.2L: 16 RON | 0.4L: 31 RON | 1.5L: 109 RON | 0.33L: 29 RON",
        name_split_pot: "SPLIT THE POT (NEIPA 7%)", price_split_pot: "From 17 RON", desc_split_pot: "A stronger, hazy, grassy beer, well flavored, with lots of hops and tropical fruits hints (pineapple, mango, peach).", details_split_pot: "0.2L: 17 RON | 0.4L: 33 RON | 1.5L: 119 RON | 0.33L: 31 RON",
        name_imperial_fuck: "IMPERIAL FUCK (Double IPA 9%)", price_imperial_fuck: "From 18 RON", desc_imperial_fuck: "A strong rich taste beer, bitter and more flavored than an IPA, but also with a discreet sweetness. One of the strongest beers produced in Romania.", details_imperial_fuck: "0.2L: 18 RON | 0.4L: 35 RON | 1.5L: 125 RON | 0.33L: 33 RON",
        name_amber_guerre: "AMBER GUERRE (American Red Ale 5.6%)", price_amber_guerre: "From 15 RON", desc_amber_guerre: "A red beer with a complex floral flavor and hints of black fruits, raisins, but with a sharp bitterness. Perfect for burger & grill pairing.", details_amber_guerre: "0.2L: 15 RON | 0.4L: 29 RON | 1.5L: 99 RON | 0.33L: 27 RON",
        name_black_hole: "BLACK HOLE (Hoppy Porter 4.5%)", price_black_hole: "From 15 RON", desc_black_hole: "A soft body and low alcoholic concentration dark beer, slightly sweet with roasted malt, chocolate, coffee hints and a long tasty finish.", details_black_hole: "0.2L: 15 RON | 0.4L: 29 RON | 1.5L: 99 RON | 0.33L: 32 RON",

        name_deranj_blonda: "DERANJ BLONDĂ (Kolsch 4.9%)", price_deranj_blonda: "From 15 RON", desc_deranj_blonda: "A traditional German beer style, naturally brewed until reaches its specific light and refreshing taste.", details_deranj_blonda: "0.2L: 15 RON | 0.4L: 29 RON | 1.5L: 95 RON | 0.5L: 32 RON",
        name_deranj_oranj: "DERANJ ORANJ (Orange Wheat Ale 5%)", price_deranj_oranj: "From 15 RON", desc_deranj_oranj: "German malt from barley and wheat topped with a bit of hops and a drop of 100% natural orange extract.", details_deranj_oranj: "0.2L: 15 RON | 0.4L: 29 RON | 1.5L: 95 RON | 0.5L: 32 RON",
        name_deranj_ipa: "DERANJ IPA (IPA 5.8%)", price_deranj_ipa: "From 16 RON", desc_deranj_ipa: "Top quality malts, hops and yeast for a perfect balance.", details_deranj_ipa: "0.2L: 16 RON | 0.4L: 31 RON | 1.5L: 107 RON | 0.5L: 35 RON",
        name_deranj_doar: "DOAR O BERE (Helles 5.0%)", price_deranj_doar: "From 15 RON", desc_deranj_doar: "A beer that offers the perfect balance between malt and hops and, through long maturation, develops intense aromas and a refined flavor.", details_deranj_doar: "0.2L: 15 RON | 0.4L: 29 RON | 1.5L: 99 RON | 0.5L: 32 RON",

        name_x029: "XPERIMENTALE 029 (Russian Imp. Stout 12%)", price_x029: "From 22 RON", desc_x029: "To create a malt profile that balances both the sweetness and bitterness of this classic style, we added cocoa beans, specialty coffee, and Madagascar vanilla. Notes of chocolate, sherry, cocoa beans, and dark fruits.", details_x029: "0.2L: 22 RON | 0.4L: 43 RON",
        name_x030: "XPERIMENTALE 030 (Citric Pils 5.2%)", price_x030: "From 17 RON", desc_x030: "Unfiltered German Pilsner made with malt from the Bamberg region of Germany and Mandarina Bavaria hops-featuring citrus aromas, a refined bitterness, and a super-refreshing taste.", details_x030: "0.2L: 17 RON | 0.4L: 33 RON | 1.5L: 119 RON",
        name_pachet: "BEER FLIGHT", price_pachet: "59 RON", desc_pachet: "Easy Rider, Morning Glory, Split the Pot, Imperial Fuck, Black Hole", details_pachet: "5 X 100ML",

        name_tap1: "SCHNEIDER WEISSE TAP 1 (4.9%)", price_tap1: "22 RON", desc_tap1: "Helle Weisse", details_tap1: "0.5L",
        name_tap3: "SCHNEIDER WEISSE TAP 3 (<0.5%)", price_tap3: "25 RON", desc_tap3: "Alkoholfree", details_tap3: "0.5L",
        name_tap5: "SCHNEIDER WEISSE TAP 5 (8.2%)", price_tap5: "27 RON", desc_tap5: "Hopfenweisse", details_tap5: "0.5L",
        name_sprit: "HOMEMADE CARBONATED WINE", price_sprit: "From 19 RON", desc_sprit: "", details_sprit: "0.2L: 19 RON | 0.4L: 37 RON",
        name_socata: "ELDERFLOWER DRINK", price_socata: "21 RON", desc_socata: "", details_socata: "0.33L",
        name_lemonaid_lime: "LEMONAID LIME ECO", price_lemonaid_lime: "23 RON", desc_lemonaid_lime: "", details_lemonaid_lime: "0.33L",
        name_lemonaid_blood: "LEMONAID BLOOD ORANGE ECO", price_lemonaid_blood: "23 RON", desc_lemonaid_blood: "", details_lemonaid_blood: "0.33L",
        name_lemonaid_passion: "LEMONAID PASSION FRUIT ECO", price_lemonaid_passion: "23 RON", desc_lemonaid_passion: "", details_lemonaid_passion: "0.33L",
        name_lemonaid_ginger: "LEMONAID GINGER ECO", price_lemonaid_ginger: "23 RON", desc_lemonaid_ginger: "", details_lemonaid_ginger: "0.33L",
        name_apple: "MERO JUICE", price_apple: "23 RON", desc_apple: "", details_apple: "0.33L",
        name_cidru_brut: "CIDER APPLE/PEAR", price_cidru_brut: "22 RON", desc_cidru_brut: "", details_cidru_brut: "0.33L",
        name_cidru_extra: "CIDER EXTRA APPLE", price_cidru_extra: "22 RON", desc_cidru_extra: "", details_cidru_extra: "0.33L",
        name_fritz: "FRITZ-KOLA +/- SUGAR", price_fritz: "19 RON", desc_fritz: "", details_fritz: "0.33L",

        name_carnat: "KASEKRAINER SAUSAGE", price_carnat: "45 RON", desc_carnat: "Pork Kasekrainer with cheese, mustard, pickles, bread.<br><i>Allergens: dairy, gluten, mustard</i><br><b>Pair with:</b> Helles, Kolsch - Deranj Blonda, Deranj Doar O Bere", details_carnat: "~320 g",
        name_aripi_bbq: "BBQ CHICKEN WINGS", price_aripi_bbq: "37 RON", desc_aripi_bbq: "BBQ glazed chicken wings sprinkled with green onions.<br><i>Allergens: mustard, sesame, soya</i><br><b>Pair with:</b> Lager, Kolsch - Deranj Blondă", details_aripi_bbq: "~280 g",
        name_aripi_picante: "HOT CHICKEN WINGS", price_aripi_picante: "39 RON", desc_aripi_picante: "Hot sauce glazed chicken wings sprinkled with green onions.<br><i>Allergens: mustard, sesame, soya</i><br><b>Pair with:</b> NEIPA - Split the Pot, Deranj IPA", details_aripi_picante: "~280 g",
        name_coaste: "BBQ PORK RIBS", price_coaste: "62 RON", desc_coaste: "BBQ glazed pork ribs* sprinkled with green onions.<br><i>Allergens: gluten</i><br><b>Pair with:</b> Imperial Stout, Porter - Black Hole", details_coaste: "~470 g",
        name_chiftea: "SMASH BURGER", price_chiftea: "47 RON", desc_chiftea: "Beef patty, cheddar, pickles, red onion, mustard, ketchup, soft butter bun.<br><i>Allergens: dairy, gluten, egg, mustard, celery</i><br><b>Pair with:</b> Red Ale, Pale Ale - Amber Guerre, Easy Rider", details_chiftea: "~270 g",
        name_chiftea_tunata: "THE OTHER SMASH BURGER", price_chiftea_tunata: "49 RON", desc_chiftea_tunata: "Beef patty, cheddar, bacon, pickled jalapeno, fried onion flakes, BBQ sauce, soft butter bun.<br><i>Allergens: gluten, egg, diary, mustard, sulphites - may contain celery, soya, lupine, sesame</i><br><b>Pair with:</b> Red Ale, IPA - Amber Guerre, Morning Glory, Imperial Fuck", details_chiftea_tunata: "~290 g",
        name_chiftea_dubla: "DOUBLE SMASH BURGER", price_chiftea_dubla: "68 RON", desc_chiftea_dubla: "Beef patty x2, cheddar x2, pickled cucumber, red onion, mustard, ketchup, soft butter bun.<br><i>Allergens: gluten, egg, dairy, mustard, celery</i><br><b>Pair with:</b> Red Ale, Pale Ale - Amber Guerre, Easy Rider", details_chiftea_dubla: "~400 g",
        name_chiftea_vara: "FRESH SMASH", price_chiftea_vara: "50 RON", desc_chiftea_vara: "Beef patty, cheddar, bacon, iceberg salad, tartar sauce (mayonnaise sauce, pickles, onions, mustard, paprika), soft butter bun.<br><i>Allergens: dairy egg, gluten, mustard</i><br><b>Pair with:</b> IPA - Split The Pot, Imperial fuck", details_chiftea_vara: "~270 g",
        name_mamaliga: "LOADED NACHOS", price_mamaliga: "65 RON", desc_mamaliga: "Nachos, roasted red pepper sauce, sprinkled bacon, pickled jalapeno, 4 types of cheese mix, green onion, guacamole, salsa.<br><i>Allergens: gluten, diary - may contain mustard, celery</i><br><b>Pair with:</b> Pale Ale - Easy Rider", details_mamaliga: "~500 g",
        name_curry: "SAUSAGE CURRY FRIES", price_curry: "40 RON", desc_curry: "Pork kasekrainer, fries, fried onion flakes, ketchup, curry.<br><i>Allergens: lactose, celery</i><br><b>Pair with:</b> IPA - Morning Glory", details_curry: "~340 g",
        name_cartofi_cor: "SPICY KOREAN FRIES", price_cartofi_cor: "32 RON", desc_cartofi_cor: "Fresh fried potatoes with mayo and Gochujang sauce, sprinkled with green onions, fried onion flakes and sesame seeds.<br><i>Allergens: soya, gluten, egg, mustard, sesame</i><br><b>Pair with:</b> IPA - Morning Glory, Imperial Fuck", details_cartofi_cor: "~300 g",
        name_cartofi: "FRIES", price_cartofi: "21 RON", desc_cartofi: "Fresh fried potatoes.", details_cartofi: "~200 g",
        name_cartofi_branza: "CHEESY FRIES", price_cartofi_branza: "23 RON", desc_cartofi_branza: "Fresh fries sprinkled with Grana Padano or Romanian cheese.<br><i>Allergens: diary</i>", details_cartofi_branza: "~200 g",
        name_sos: "EXTRA SAUCE", price_sos: "5 RON", desc_sos: "Spicy mayonnaise sauce, Mayonnaise sauce, Garlic mayo sauce, Ketchup, Bbq sauce.<br><i>Allergens: egg, soy, mustard, sulphites</i>", details_sos: "~40 ml",

        btn_details: "Details",
        mock_img_text: "[ Item Picture ]",
        title_info: "INFORMATION",
        btn_flyer_gz: "About Ground Zero",
        link_flyer_gz: "assets/pdf/ground_zero_pliant_en.pdf",
        btn_flyer_deranj: "About Deranj",
        link_flyer_deranj: "assets/pdf/deranj_pliant_en.pdf",
        review_title: "Did you enjoy your time?",
        review_desc: "Your feedback helps us grow!",
        review_btn: "⭐ Leave a review on Google!",
        popup_text: "We'd love your review!",
        popup_btn: "⭐ Leave feedback"
    }
};