const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();

  page.on('console', (msg) => {
    if (msg.type() === 'error') console.log('CONSOLE ERROR:', msg.text());
  });

  // seed a fake token so auth-gated pages don't redirect
  await page.addInitScript(() => {
    window.localStorage.setItem('token', 'fake-token-for-visual-check');
  });

  const routes = ['/MyPage', '/InformationEdit', '/accountSettings', '/'];
  for (const route of routes) {
    await page.goto(`http://localhost:5173${route}`, { waitUntil: 'networkidle' }).catch((e) => console.log('nav error', route, e.message));
    await page.waitForTimeout(800);
    const name = route.replace(/\W+/g, '_') || 'root';
    await page.screenshot({ path: `/tmp/shots/${name}.png`, fullPage: true });
    const docWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const winWidth = await page.evaluate(() => window.innerWidth);
    console.log(route, 'scrollWidth=', docWidth, 'innerWidth=', winWidth);
  }

  await browser.close();
})();
