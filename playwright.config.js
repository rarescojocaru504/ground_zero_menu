// Playwright config. `npm test` starts a local server on port 4173 and runs
// every test twice: once on a phone-sized screen and once on a desktop one.
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: 'http://localhost:4173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    // most guests open the menu from a QR code on their phone
    { name: 'phone', use: { ...devices['Pixel 7'] } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } } },
  ],

  webServer: {
    // -c-1 turns caching off, so the tests always see the files as they are on disk
    command: 'npx http-server . -p 4173 -c-1 -s',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },
});
