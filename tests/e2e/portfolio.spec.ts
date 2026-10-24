import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
const routes = [
  '/',
  '/about',
  '/projects',
  '/projects/seedrover',
  '/experience',
  '/stack',
];

for (const theme of ['dark', 'light']) {
  test(`${theme}: all routes fit five viewport widths and render accessible headings`, async ({
    page,
  }) => {
    await page.addInitScript((value) => localStorage.setItem('theme', value), theme);
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await mkdir('.qa', { recursive: true });
    for (const width of [320, 375, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of routes) {
        const response = await page.goto(route);
        expect(response?.status(), route).toBe(200);
        await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
        await expect(page.locator('h1')).toHaveCount(1);
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('main')).toHaveCount(1);
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
          `${route} @ ${width}`,
        ).toBe(true);
        await expect(page.locator('a[href="#"], a[href=""], img:not([alt])')).toHaveCount(0);
        if (route === '/')
          await page.screenshot({ path: `.qa/home-${width}-${theme}.png`, fullPage: true });
      }
    }
    expect(errors).toEqual([]);
  });
  test(`${theme}: accessibility audit on every public route`, async ({ page }) => {
    await page.addInitScript((value) => localStorage.setItem('theme', value), theme);
    await page.setViewportSize({ width: theme === 'dark' ? 1440 : 375, height: 900 });
    const results = [];
    for (const route of routes) {
      await page.goto(route);
      const audit = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();
      results.push({ route, violations: audit.violations });
      expect(audit.violations, `${theme} ${route}`).toEqual([]);
    }
    await mkdir('.qa', { recursive: true });
    await writeFile(`.qa/accessibility-${theme}.json`, JSON.stringify(results, null, 2));
  });
}

test('dark default, persisted light choice, and live system preference', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Use light theme', exact: true }).first().click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(
    page.getByRole('button', { name: 'Use light theme', exact: true }).first(),
  ).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Use system theme', exact: true }).first().click();
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(
    page.getByRole('button', { name: 'Use system theme', exact: true }).first(),
  ).toHaveAttribute('aria-pressed', 'true');
});

test('mobile menu traps focus, closes with Escape, restores focus, and navigates', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 850 });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Open navigation' });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  for (let i = 0; i < 14; i++) {
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => !!document.activeElement?.closest('dialog'))).toBe(true);
  }
  const audit = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(audit.violations).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole('link', { name: /projects/ }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(dialog).not.toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
});

test('project filters use actual categories; unverified actions and drafts stay hidden', async ({
  page,
  request,
}) => {
  await page.goto('/projects');
  await expect(page.getByRole('button', { name: 'IoT', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'AI', exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'IoT', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('1 project');
  await expect(page.getByRole('heading', { name: 'SeedRover' })).toBeVisible();
  await page.goto('/');
  await expect(page.locator('a[href^="/contact"], a[href^="/writing"]')).toHaveCount(0);
  await expect(
    page.locator(
      'a[href^="mailto:"], a[href*="github.com"], a[href*="linkedin.com"], a[href$=".pdf"]',
    ),
  ).toHaveCount(0);
  for (const route of [
    '/contact',
    '/writing',
    '/projects/not-real',
    '/writing/not-real',
    '/writing/authoring-example',
    '/does-not-exist',
  ])
    expect((await request.get(route)).status(), route).toBe(404);
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap).toContain('/projects/seedrover');
  expect(sitemap).not.toContain('authoring-example');
  expect(sitemap).not.toContain('/contact');
  expect(sitemap).not.toContain('/writing');
});

test('metadata, share image, security headers, and reduced motion work', async ({
  page,
  request,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const titles = new Set<string>();
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.headers()['x-content-type-options']).toBe('nosniff');
    const title = await page.title();
    expect(titles.has(title)).toBe(false);
    titles.add(title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(new URL(canonical!).pathname).toBe(route);
    await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute(
      'content',
      /opengraph-image/,
    );
  }
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    'auto',
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  const og = await request.get('/opengraph-image');
  expect(og.status()).toBe(200);
  expect(og.headers()['content-type']).toContain('image/png');
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toContain('Disallow: /');
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'skip to content' })).toBeFocused();
});
