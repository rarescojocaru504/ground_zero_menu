# Ground Zero menu

The QR-code menu for the Ground Zero bar: drinks and food, in Romanian and English.

It's a plain static site: one HTML page, one CSS file and two JS files, with no build step and no framework. Upload the folder to any web host and it works. Node is only needed if you want to run the tests.

## What's where

```
index.html        the page: every beer, drink and dish, with prices
despre_*.html     the flyers behind the "Despre gama ..." buttons, one page per brand and language
                  (despre_gz_ro, despre_gz_en, despre_deranj_ro, despre_deranj_en)
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
  despre/         the flyer pages as images (despre_gz_ro-1.webp, ...), used by despre_*.html
  pdf/            the original flyer PDFs (no longer linked from the menu, kept for old links)
tests/            Playwright tests
scripts/          build-deploy.js, which makes the upload package (npm run build)
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

The `data-shop="..."` on the card is the page on groundzerobeer.ro/shop that the "Buy online" button opens when someone taps the bottle. If a beer isn't sold online, leave `data-shop` out and the button says "Unavailable online" instead.

The last price column is the bottle price and is shown in fuchsia automatically.

For the bottle photo you need two files with the same name:

- `assets/bottles/<name>.webp` – 240×360
- `assets/bottles/large/<name>.webp` – 500×750 (shown when someone taps the bottle)

[squoosh.app](https://squoosh.app) is the easiest way to resize and convert them. Keep the original PNG next to them.

**A drink that's not available.** In the Guest & Extra list, add `is-unavailable` to its `list-row` and the red tag after its small line, copied from one of the Schneider beers. Remove both when it's back.

**Packs.** The BEER PACKS section (chip "Packs") has the beer flight and the two bottle discounts. The discount is the `-10%` in the price column; the names and "Ask the bartender" are in `lang.js` (`pack4_title`, `pack6_title`, `packs_note`).

**A new section.** Add an `<h2 id="sec-..." class="section-banner">` and a chip with `href="#sec-..."` in the chips row at the top of the page; the chip lights up by itself when the section is in view.

**New flyers.** The "Despre" buttons don't open the PDFs, because Android phones download a PDF
instead of showing it. Instead each flyer page is an image in `assets/despre/`. For a new flyer, export
its pages as images (about 1600px wide, .webp) with the same names, e.g. `despre_gz_en-1.webp` and
`despre_gz_en-2.webp`, and replace the old ones. If the size of the pages changes, update the `width`
and `height` of the images in the matching `despre_*.html`.

**A new dish.** Same idea: copy a `food-card`, add `name_...` and `desc_...` to both languages. The chilli icon for spicy dishes goes after the translated name, see "Aripioare înflăcărate".

## After changing CSS or JS: bump the version

Phones keep a copy of `styles.css`, `lang.js` and `script.js`, and might not notice you uploaded new ones. That's why `index.html` loads them as `styles.css?v=22`, `lang.js?v=11` and so on. When you change one of those files, increase its number by one. The server ignores it, but the phone sees a new address and downloads the file again.

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
- the menu opens in Romanian, can be switched to English, and remembers the choice
- tabs, category chips, the header glass and the bottle zoom work, and every "Buy online" button goes to the right shop page
- bottle prices are fuchsia, the packs and the "unavailable" tags are there in both languages
- the allergen chips are right and the filter hides the right dishes
- all images exist and load, and each "Despre" button opens the right flyer page in the right language
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

## Publishing on groundzerobeer.ro

The menu lives in `public_html/menu` on the hosting, so it opens at https://www.groundzerobeer.ro/menu/.

1. `npm run build`. This puts only the files the site needs into `_deploy/menu` (no PNG originals, tests or Node files) and stops with an error if the page uses a file that's missing.
2. Open `_deploy/menu`, select everything inside it, right-click → Send to → Compressed (zipped) folder, and call it `menu.zip`.
3. In cPanel → File Manager → `public_html/menu`: delete the old files, upload `menu.zip`, right-click → Extract, then delete the zip. `index.html` must end up directly in `menu`, not in a subfolder.
4. Open the menu on a phone and check it. If it still looks old, try a private tab: it's the phone's cache.

For a small change you can also upload just the changed file over the old one (and bump its `?v=`).

`_deploy/` is in `.gitignore`, so the package never ends up in git.

## Fonts and logos

Bebas Neue is under the SIL Open Font License (`assets/fonts/OFL-bebas-neue.txt`), which allows using it on the site. The Instagram and TikTok logos are the official ones, used only to link to the Ground Zero profiles.
