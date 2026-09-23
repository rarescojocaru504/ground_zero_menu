# Ground Zero menu

The QR-code menu for the Ground Zero bar: drinks and food, in Romanian and English.

It's a plain static site: one HTML page, one CSS file and two JS files, with no build step and no framework. Upload the folder to any web host and it works. Node is only needed if you want to run the tests.

## What's where

```
index.html        the page: every beer, drink and dish, with prices
css/styles.css    all the styling (colours and fonts are at the top, in :root)
js/lang.js        every text that exists in both RO and EN
js/script.js      language switch, tabs, allergen filter, header glass, bottle zoom
assets/
  bottles/        bottle photos: *.webp is what the page uses, large/ is for the zoom,
                  *.png are the full-size originals
  food/           pairing icons + chilli
  icons/          Instagram / TikTok logos
  fonts/          Bebas Neue (the condensed font from the printed menu)
  img/            logo
  pdf/            the Ground Zero and Deranj flyers, RO and EN
tests/            Playwright tests
```

## Common changes

**A price.** Search `index.html` for the beer or dish and change the number in `<span class="p-val">`. In the Guest & Extra list, the price is the number right after `<small>0.33L</small>`. Prices don't need translating.

**A description, a name or an allergen.** These are in `js/lang.js`, once under `ro:` and once under `en:`. Change both. The text in `index.html` is only a Romanian fallback in case JavaScript doesn't load, so it doesn't matter much, but it's nice to keep it the same.

Allergens have to stay in this format, because the page turns them into the little chips and the filter reads them:

```
<i>Alergeni: gluten, ou, lactate - poate conține urme de țelină, soia</i>
<i>Allergens: gluten, egg, dairy - may contain celery, soya</i>
```

If you use an allergen word that isn't in the list yet, add it to `ALLERGEN_WORDS` in `js/script.js`, otherwise the filter won't know about it.

**A new beer.** Copy an existing `<div class="beer-card">` block in `index.html` and change the name, style, prices, taste bars (the `width: 40%` values) and pairing icons. Give the description a new `data-i18n` key and add that key to both languages in `lang.js`.

For the bottle photo you need two files with the same name:

- `assets/bottles/<name>.webp` – 240×360
- `assets/bottles/large/<name>.webp` – 500×750 (shown when someone taps the bottle)

[squoosh.app](https://squoosh.app) is the easiest way to resize and convert them. Keep the original PNG next to them.

**A new dish.** Same idea: copy a `food-card`, add `name_...` and `desc_...` to both languages. The chilli icon for spicy dishes goes after the translated name, see "Aripioare înflăcărate".

## After changing CSS or JS: bump the version

Phones keep a copy of `styles.css`, `lang.js` and `script.js`, and might not notice you uploaded new ones. That's why `index.html` loads them as `styles.css?v=18`, `lang.js?v=7` and so on. When you change one of those files, increase its number by one. The server ignores it, but the phone sees a new address and downloads the file again.

Images don't need this, as long as a new image gets a new file name.

## Running it locally

Opening `index.html` straight from the disk mostly works, but a local server is closer to the real thing:

```
npm install
npm start
```

and open http://localhost:4173.

## Tests

The tests open the menu in a real browser, both on a phone-sized screen and a desktop one, and check that:

- every text exists in both languages, and every price is a number
- the language is picked from the phone, can be switched, and is remembered
- tabs, category chips, the header glass and the bottle zoom work
- the allergen chips are right and the filter hides the right dishes
- all images and PDFs exist and load
- nothing sticks out sideways on a small phone
- no JavaScript errors show up anywhere

First time only:

```
npm install
npx playwright install chromium
```

Then:

```
npm test              run everything
npm run test:ui       same, but in a window where you can watch each test
npm run test:report   open the report of the last run (screenshots of whatever failed)
```

Run them before uploading a change. They take under a minute.

## Fonts and logos

Bebas Neue is under the SIL Open Font License (`assets/fonts/OFL-bebas-neue.txt`), which allows using it on the site. The Instagram and TikTok logos are the official ones, used only to link to the Ground Zero profiles.
