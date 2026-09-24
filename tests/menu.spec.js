// End-to-end tests for the menu. Run with `npm test` (see README).
const { test: base, expect } = require('@playwright/test');

// Every test fails if the page throws a JavaScript error or logs one in the console.
// Files that fail to download are left to the image/PDF tests below, so one missing
// picture doesn't make every test fail.
const test = base.extend({
  consoleErrors: [async ({ page }, use) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    page.on('console', msg => {
      if (msg.type() === 'error' && !msg.text().startsWith('Failed to load resource')) errors.push(msg.text());
    });
    await use(errors);
    expect(errors, 'errors in the browser console').toEqual([]);
  }, { auto: true }],
});

// Opens the menu in a given language, as if the guest had picked it before.
async function openMenu(page, lang = 'ro') {
  await page.addInitScript(l => {
    try { localStorage.setItem('gz-menu-lang', l); } catch (e) { /* ignore */ }
  }, lang);
  await page.goto('/');
}

async function openFoodTab(page) {
  await page.locator('#btn-food').click();
  await expect(page.locator('#section-food')).toBeVisible();
}

// Scrolls through the whole page so every lazy-loaded image gets requested.
async function scrollThrough(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
  });
}


test.describe('texts', () => {
  test('every translated text exists in both languages', async ({ page }) => {
    await openMenu(page);
    const problems = await page.evaluate(() => {
      const used = new Set();
      document.querySelectorAll('[data-i18n]').forEach(el => used.add(el.dataset.i18n));
      document.querySelectorAll('[data-i18n-href]').forEach(el => used.add(el.dataset.i18nHref));
      // keys that script.js uses without them being in the HTML at load time
      ['food_service', 'allergens_label', 'may_contain'].forEach(k => used.add(k));

      const out = [];
      for (const lang of ['ro', 'en']) {
        used.forEach(key => { if (!translations[lang][key]) out.push(`${lang} is missing "${key}"`); });
      }
      const ro = Object.keys(translations.ro), en = Object.keys(translations.en);
      ro.filter(k => !en.includes(k)).forEach(k => out.push(`"${k}" is only in RO`));
      en.filter(k => !ro.includes(k)).forEach(k => out.push(`"${k}" is only in EN`));
      return out;
    });
    expect(problems).toEqual([]);
  });

  test('every price is a plain number', async ({ page }) => {
    await openMenu(page);
    const prices = await page.locator('.p-val').allTextContents();
    const listPrices = await page.locator('.list-price').evaluateAll(els =>
      els.map(el => el.lastChild.textContent));
    expect(prices.length + listPrices.length).toBeGreaterThan(40);
    for (const price of [...prices, ...listPrices]) expect(price.trim()).toMatch(/^\d+$/);
  });
});


test.describe('language', () => {
  test.describe('on a phone set to Romanian', () => {
    test.use({ locale: 'ro-RO' });
    test('opens in Romanian', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('html')).toHaveAttribute('lang', 'ro');
      await expect(page.locator('#btn-drinks')).toHaveText('BĂUTURI');
    });
  });

  test.describe('on a phone set to English', () => {
    test.use({ locale: 'en-US' });
    test('still opens in Romanian', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('html')).toHaveAttribute('lang', 'ro');
      await expect(page.locator('#btn-drinks')).toHaveText('BĂUTURI');
    });
  });

  test.describe('switching', () => {
    test.use({ locale: 'ro-RO' });

    test('changes the texts and is remembered after a reload', async ({ page }) => {
      await page.goto('/');
      await page.locator('.language-switcher a[data-lang="en"]').click();

      await expect(page.locator('#btn-food')).toHaveText('FOOD');
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page.locator('.language-switcher a.active')).toHaveText('EN');
      await expect(page.locator('.btn-flyer').first()).toHaveAttribute('href', /_en\.pdf$/);

      await page.reload();
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    });

    test('quick taps end on the last one', async ({ page }) => {
      await page.goto('/');
      for (const lang of ['en', 'ro', 'en', 'ro']) {
        await page.locator(`.language-switcher a[data-lang="${lang}"]`).click();
      }
      await expect(page.locator('body')).not.toHaveClass(/lang-fading/);
      await expect(page.locator('html')).toHaveAttribute('lang', 'ro');
      await expect(page.locator('#btn-drinks')).toHaveText('BĂUTURI');
    });
  });
});


test.describe('tabs and categories', () => {
  test('Food tab shows the food, hides the drink chips and changes the banner', async ({ page }) => {
    await openMenu(page, 'ro');
    await expect(page.locator('#drink-chips')).toBeVisible();
    await expect(page.locator('.service-banner')).toContainText('la bar');

    await openFoodTab(page);
    await expect(page.locator('#section-drinks')).toBeHidden();
    await expect(page.locator('#drink-chips')).toBeHidden();
    await expect(page.locator('.service-banner')).toContainText('bucătărie');

    await page.locator('#btn-drinks').click();
    await expect(page.locator('#section-drinks')).toBeVisible();
    await expect(page.locator('.service-banner')).toContainText('la bar');
  });

  for (const [chip, section] of [['Deranj', '#sec-deranj'], ['Special', '#sec-special'], ['Guest & Extra', '#sec-guest']]) {
    test(`"${chip}" chip scrolls to its section and lights up`, async ({ page }) => {
      await openMenu(page);
      await page.locator('.chip', { hasText: chip }).click();

      await expect(page.locator('.chip.active')).toHaveText(chip);
      // the section title should end up just below the sticky header, not hidden under it
      await expect.poll(async () => {
        const header = await page.evaluate(() =>
          parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')));
        const top = (await page.locator(section).boundingBox()).y;
        return top >= header - 1 && top <= header + 40;
      }).toBe(true);
    });
  }
});


test.describe('header', () => {
  test('glass is off at the top, on while scrolling, and covers both bars once the tabs stick', async ({ page }) => {
    await openMenu(page);
    const body = page.locator('body');
    await expect(body).not.toHaveClass(/scrolled/);

    await page.mouse.wheel(0, 60);
    await expect(body).toHaveClass(/scrolled/);
    await expect(body).not.toHaveClass(/bars-stuck/);

    await page.evaluate(() => window.scrollTo(0, 1500));
    await expect(body).toHaveClass(/bars-stuck/);

    // the two bars must meet exactly, otherwise a gap shows between them
    const gap = await page.evaluate(() =>
      document.querySelector('.menu-tabs').getBoundingClientRect().top -
      document.querySelector('.top-bar').getBoundingClientRect().bottom);
    expect(Math.abs(gap)).toBeLessThan(1);
  });

  test('Review and language buttons stay on screen while scrolling', async ({ page }) => {
    await openMenu(page);
    await page.evaluate(() => window.scrollTo(0, 3000));
    await expect(page.locator('.review-btn-top')).toBeInViewport();
    await expect(page.locator('.language-switcher')).toBeInViewport();
    await expect(page.locator('#btn-food')).toBeInViewport();
  });
});


test.describe('allergens', () => {
  test('the allergen line of each dish is shown as chips', async ({ page }) => {
    await openMenu(page, 'ro');
    await openFoodTab(page);
    await expect(page.locator('#section-food .food-desc i')).toHaveCount(0);

    const burger = page.locator('.food-card', { has: page.locator('[data-i18n="name_chiftea"]') });
    await expect(burger.locator('.a-chip')).toHaveText(['gluten', 'ou', 'lactate', 'muștar', 'țelină']);

    const tunata = page.locator('.food-card', { has: page.locator('[data-i18n="name_chiftea_tunata"]') });
    await expect(tunata.locator('.may-contain')).toContainText('țelină, soia, lupin, susan');
  });

  test('filter hides every dish with that allergen and survives a language switch', async ({ page }) => {
    await openMenu(page, 'ro');
    await openFoodTab(page);
    const visible = page.locator('#section-food .food-card:not(.filtered-out)');
    const total = await visible.count();

    await page.locator('.filter-chip[data-allergen="gluten"]').click();
    await expect(page.locator('.filter-chip[data-allergen="gluten"]')).toHaveAttribute('aria-pressed', 'true');

    const left = await visible.count();
    expect(left).toBeLessThan(total);
    expect(left).toBeGreaterThan(0);
    const allergensLeft = await visible.evaluateAll(cards => cards.map(c => c.dataset.allergens));
    for (const list of allergensLeft) expect(list.split(' ')).not.toContain('gluten');

    await page.locator('.language-switcher a[data-lang="en"]').click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(visible).toHaveCount(left);

    await page.locator('.filter-chip[data-allergen="gluten"]').click();
    await expect(visible).toHaveCount(total);
  });
});


test.describe('images and files', () => {
  test('every image loads', async ({ page }) => {
    await openMenu(page);
    await scrollThrough(page);
    await openFoodTab(page);
    await scrollThrough(page);

    const broken = await page.evaluate(async () => {
      const imgs = [...document.querySelectorAll('img[src]')];
      await Promise.all(imgs.map(img => img.complete ? null : new Promise(r => { img.onload = img.onerror = r; })));
      return imgs.filter(img => img.naturalWidth === 0).map(img => img.getAttribute('src'));
    });
    expect(broken).toEqual([]);
  });

  test('tapping a bottle shows the large image, Escape closes it', async ({ page }) => {
    await openMenu(page);
    await page.locator('.beer-img-col img').first().click();

    const lightbox = page.locator('#lightbox');
    await expect(lightbox).toBeVisible();
    await expect(lightbox.locator('.lightbox-caption')).toHaveText('EASY RIDER');
    await expect(lightbox.locator('img')).toHaveAttribute('src', /bottles\/large\/easyrider\.webp$/);
    await expect.poll(() => lightbox.locator('img').evaluate(img => img.naturalWidth)).toBeGreaterThan(0);

    await page.keyboard.press('Escape');
    await expect(lightbox).toBeHidden();
  });

  test('the zoom has a "Buy online" link to the shop page of that beer', async ({ page }) => {
    await openMenu(page, 'ro');
    const expected = {
      'EASY RIDER': 'easy-rider', 'MORNING GLORY': 'morning-glory', 'SPLIT THE POT': 'split-the-pot',
      'IMPERIAL FUCK': 'imperial-fuck', 'AMBER GUERRE': 'amber-guerre', 'BLACK HOLE': 'gipsy-porter',
      'DERANJ BLONDĂ': 'deranj-blonda', 'DERANJ ORANJ': 'deranj-oranj', 'DERANJ IPA': 'deranj-IPA',
      'DOAR O BERE': 'deranj-doar-o-bere',
    };
    const lightbox = page.locator('#lightbox');
    for (const [name, slug] of Object.entries(expected)) {
      const card = page.locator('.beer-card', { has: page.locator('.beer-title', { hasText: name }) });
      await card.locator('.beer-img-col img').click();
      const link = lightbox.locator('a.lightbox-shop');
      await expect(link).toBeVisible();
      await expect(link).toHaveText('Cumpără online');
      await expect(link).toHaveAttribute('href', `https://www.groundzerobeer.ro/shop/ground-zero-beer-${slug}`);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(lightbox.locator('.lightbox-shop.is-disabled')).toBeHidden();
      await page.keyboard.press('Escape');
    }
  });

  test('a beer without a shop page shows "unavailable" instead of the link', async ({ page }) => {
    await openMenu(page, 'en');
    // every beer has a shop page right now, so take one away to test the fallback
    const card = page.locator('.beer-card').first();
    await card.evaluate(el => el.removeAttribute('data-shop'));
    await card.locator('.beer-img-col img').click();
    const lightbox = page.locator('#lightbox');
    await expect(lightbox.locator('a.lightbox-shop')).toBeHidden();
    await expect(lightbox.locator('.lightbox-shop.is-disabled')).toHaveText('Unavailable online');
    // tapping it doesn't close the zoom
    await lightbox.locator('.lightbox-shop.is-disabled').click();
    await expect(lightbox).toBeVisible();
  });

  test('the About buttons point to PDFs that exist, in both languages', async ({ page, request }) => {
    for (const lang of ['ro', 'en']) {
      await openMenu(page, lang);
      const links = await page.locator('.btn-flyer').evaluateAll(as => as.map(a => a.getAttribute('href')));
      expect(links).toHaveLength(2);
      for (const href of links) {
        expect(href).toContain(`_${lang}.pdf`);
        const res = await request.get(href);
        expect(res.ok(), href).toBe(true);
      }
    }
  });

  test('Instagram and TikTok show their logos and point to the right profiles', async ({ page }) => {
    await openMenu(page);
    const pills = page.locator('.social-pill');
    await expect(pills.nth(0)).toHaveAttribute('href', 'https://www.instagram.com/groundzero.beer/');
    await expect(pills.nth(1)).toHaveAttribute('href', 'https://www.tiktok.com/@ground.zero.beer');
    await expect(pills.nth(0)).toHaveClass(/has-logo/);
    await expect(pills.nth(1)).toHaveClass(/has-logo/);
  });
});


test.describe('availability', () => {
  test('the Schneider beers are marked unavailable, in both languages', async ({ page }) => {
    await openMenu(page, 'ro');
    const rows = page.locator('.list-row.is-unavailable');
    await expect(rows).toHaveCount(3);
    for (const row of await rows.all()) {
      await expect(row.locator('.list-title')).toContainText('SCHNEIDER WEISSE');
      await expect(row.locator('.badge-unavailable')).toHaveText('INDISPONIBIL');
    }
    await page.locator('.language-switcher a[data-lang="en"]').click();
    await expect(page.locator('.badge-unavailable').first()).toHaveText('UNAVAILABLE');
  });
});


test.describe('general', () => {
  test('links that open a new tab use rel="noopener"', async ({ page }) => {
    await openMenu(page);
    const missing = await page.locator('a[target="_blank"]').evaluateAll(as =>
      as.filter(a => !(a.rel || '').includes('noopener')).map(a => a.href));
    expect(missing).toEqual([]);
  });

  test('CSS and JS files carry a ?v= version so phones fetch new copies', async ({ page }) => {
    await openMenu(page);
    const urls = await page.evaluate(() => [
      ...[...document.querySelectorAll('link[rel="stylesheet"]')].map(l => l.getAttribute('href')),
      ...[...document.querySelectorAll('script[src]')].map(s => s.getAttribute('src')),
    ]);
    expect(urls.length).toBe(3);
    for (const url of urls) expect(url).toMatch(/\?v=\d+$/);
  });

  test.describe('on a small phone', () => {
    test.use({ viewport: { width: 360, height: 740 } });
    test('nothing sticks out sideways', async ({ page }) => {
      for (const lang of ['ro', 'en']) {
        await openMenu(page, lang);
        const overflow = () => page.evaluate(() =>
          document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(await overflow()).toBeLessThanOrEqual(0);
        await openFoodTab(page);
        expect(await overflow()).toBeLessThanOrEqual(0);
      }
    });
  });

  test('the "order at the bar" banner hides at the bottom of the page', async ({ page }) => {
    await openMenu(page);
    const banner = page.locator('.service-banner');
    await expect(banner).not.toHaveClass(/hidden-on-scroll/);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(banner).toHaveClass(/hidden-on-scroll/);
  });
});
