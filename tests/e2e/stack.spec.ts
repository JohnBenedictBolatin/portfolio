import { expect, test } from '@playwright/test';

test('stack focuses on three core technology categories', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/stack');

  await expect(
    page.getByRole('heading', { level: 1, name: 'tools & technologies.' }),
  ).toBeVisible();

  const cards = page.locator('main .page-body section.interest-card.credential-card');
  await expect(cards).toHaveCount(3);
  await expect(cards.locator('h2')).toHaveText(['Frontend', 'Backend', 'Developer tools']);

  const technologies = cards.locator('ul > li');
  await expect(technologies).toHaveCount(16);
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
  ]);
  await expect(
    page.locator('main .page-description, main .page-body p, main .page-body a'),
  ).toHaveCount(0);
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
