import { expect, test } from '@playwright/test';

test('stack focuses on four core technology categories', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/stack');

  await expect(
    page.getByRole('heading', { level: 1, name: 'tools & technologies.' }),
  ).toBeVisible();

  const grid = page.locator('main .page-body > div');
  const columnCount = () =>
    grid.evaluate(
      (element) => getComputedStyle(element).gridTemplateColumns.trim().split(' ').length,
    );

  expect(await columnCount()).toBe(2);
  await page.setViewportSize({ width: 375, height: 900 });
  expect(await columnCount()).toBe(1);
  await page.setViewportSize({ width: 1440, height: 900 });

  const cards = page.locator('main .page-body section.interest-card.credential-card');
  await expect(cards).toHaveCount(4);
  await expect(cards.locator('h2')).toHaveText([
    'Frontend',
    'Backend',
    'Developer tools',
    'Embedded & IoT',
  ]);

  const technologies = cards.locator('ul > li');
  await expect(technologies).toHaveCount(18);
  await expect(technologies).toHaveText([
    'HTML',
    'CSS',
    'JavaScript',
    'TypeScript',
    'Next.js',
    'Vue.js',
    'Tailwind CSS',
    'PHP',
    'Laravel',
    'Supabase',
    'PostgreSQL',
    'Node.js',
    'npm',
    'Vite',
    'Git',
    'GitHub',
    'ESP32',
    'Arduino C++',
  ]);
  await expect(page.locator('main .page-description')).toHaveText(
    'Tools and technologies behind my projects, with foundations built through continued learning.',
  );
  await expect(page.locator('main .page-body p, main .page-body a')).toHaveCount(0);
  await expect(page.getByText(/Inertia|next-themes|Playwright|MDX|Salesforce Flow/)).toHaveCount(0);

  for (const card of await cards.all()) {
    await expect(card.locator('.credential-card-surface')).toBeVisible();
    await expect(card.locator('h2')).toHaveCount(1);
    await expect(card.locator('ul > li')).not.toHaveCount(0);
    for (const technology of await card.locator('ul > li').all()) {
      await expect(technology.locator('img, svg')).toHaveCount(1);
    }
  }
});
