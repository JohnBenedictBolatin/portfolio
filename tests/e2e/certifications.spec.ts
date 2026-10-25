import { expect, test } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

test('credentials are grouped in relevance order with evidence attached', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/certifications');

  await expect(page.getByRole('heading', { level: 1, name: 'certifications.' })).toBeVisible();
  await expect(page.locator('.credential-filters')).toHaveCount(0);

  const sections = page.locator('.credential-section');
  await expect(sections).toHaveCount(3);
  await expect(sections.locator('h2')).toHaveText([
    'Networking & Cybersecurity',
    'AI, CRM & Business',
    'Salesforce Trailhead',
  ]);
  for (const [index, count] of [2, 6, 9].entries()) {
    await expect(sections.nth(index).getByRole('list').locator('> li')).toHaveCount(count);
  }

  const appkademiya = sections.nth(0).getByRole('listitem');
  await expect(appkademiya.getByRole('heading', { name: 'NetOps Certified Engineer (NTO-101)' })).toBeVisible();
  await expect(appkademiya.locator('time')).toHaveCount(0);
  await expect(appkademiya.getByRole('link')).toHaveCount(0);

  await expect(sections.nth(0).getByRole('heading', { name: 'Networking Basics' })).toBeVisible();
  await expect(sections.nth(1).getByRole('heading', { name: 'Generative AI Essentials: Using LLMs to Work with Data' })).toBeVisible();
  await expect(sections.nth(1).getByRole('heading', { name: 'Salesforce Essential Training' })).toBeVisible();
  const trailheadCards = sections.nth(2).locator('.credential-card');
  await expect(trailheadCards).toHaveCount(9);
  await expect(trailheadCards.locator('h3')).toHaveText([
    'Screen Flow Fundamentals',
    'User Access Fundamentals',
    'Access Governance',
    'Approval Process Management',
    'Data Quality and Validation',
    'Flow Fundamentals',
    'Flow Optimization',
    'Formulas',
    'Object Relationships',
  ]);
  await expect(trailheadCards.locator('.credential-meta span:first-child')).toHaveText(Array(9).fill('Superbadge'));

  await expect(page.getByRole('link', { name: 'Trailhead profile' })).toHaveAttribute(
    'href',
    'https://www.salesforce.com/trailblazer/stqarwvywg3zzlktnq',
  );
  const evidenceLinks = await page.locator('.credential-card a[href^="/credentials/"]').evaluateAll((links) =>
    links.map((link) => (link as HTMLAnchorElement).getAttribute('href')),
  );
  for (const href of evidenceLinks) {
    const response = await page.request.get(href!);
    expect(response.status(), href!).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
  }

  await page.goto('/');
  const credentialStat = page.locator('.hero-stat').filter({ hasText: 'credentials' });
  await expect(credentialStat.locator('.hero-stat-value')).toHaveText('17');

  await page.goto('/certifications');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect
    .poll(() => page.locator('.credential-card').first().evaluate((card) => getComputedStyle(card).transitionDuration))
    .toBe('0s');
});

for (const theme of ['dark', 'light']) {
  test(`${theme} certifications fit desktop and mobile widths`, async ({ page }) => {
    await page.addInitScript((value) => localStorage.setItem('theme', value), theme);
    await mkdir('.qa', { recursive: true });
    for (const width of [320, 375, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/certifications');
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      await expect(page.locator('.credential-card')).toHaveCount(17);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
        `${theme} at ${width}px`,
      ).toBe(true);
      if (width === 375 || width === 1440)
        await page.screenshot({ path: `.qa/certifications-${width}-${theme}.png`, fullPage: true });
    }
  });
}
