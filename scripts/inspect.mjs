import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
await mkdir('.qa', { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
await page.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle' });
await page.screenshot({ path: '.qa/home-desktop-dark.png', fullPage: true });
await page.getByRole('button', { name: 'Use light theme', exact: true }).first().click();
await page.screenshot({ path: '.qa/home-desktop-light.png', fullPage: true });
await page.setViewportSize({ width: 375, height: 900 });
await page.screenshot({ path: '.qa/home-mobile-light.png', fullPage: true });
await page.getByRole('button', { name: 'Open navigation' }).click();
await page.screenshot({ path: '.qa/mobile-menu.png' });
await page.getByRole('button', { name: 'Use dark theme', exact: true }).last().click();
await page.keyboard.press('Escape');
await page.screenshot({ path: '.qa/home-mobile-dark.png', fullPage: true });
await writeFile('.qa/browser-errors.json', JSON.stringify(errors, null, 2));
console.log(
  JSON.stringify({
    title: await page.title(),
    errors,
    overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
  }),
);
await browser.close();
