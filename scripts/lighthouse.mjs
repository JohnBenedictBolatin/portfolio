import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import { launch } from 'chrome-launcher';
import { mkdir, writeFile } from 'node:fs/promises';
const url = process.argv[2] || 'http://127.0.0.1:3101';
await mkdir('.qa', { recursive: true });
const chrome = await launch({
  chromePath:
    process.env.CHROME_PATH || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  chromeFlags: ['--headless', '--disable-gpu'],
});
try {
  for (const formFactor of ['mobile', 'desktop']) {
    const result = await lighthouse(
      url,
      {
        port: chrome.port,
        output: ['html', 'json'],
        logLevel: 'error',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      },
      formFactor === 'desktop' ? desktopConfig : undefined,
    );
    await writeFile(`.qa/lighthouse-${formFactor}.html`, result.report[0]);
    await writeFile(`.qa/lighthouse-${formFactor}.json`, result.report[1]);
    console.log(
      JSON.stringify({
        formFactor,
        scores: Object.fromEntries(
          Object.entries(result.lhr.categories).map(([name, value]) => [name, value.score * 100]),
        ),
        findings: Object.values(result.lhr.audits)
          .filter((audit) => audit.score !== null && audit.score < 1)
          .map((audit) => ({ id: audit.id, title: audit.title, value: audit.displayValue })),
      }),
    );
  }
} finally {
  await chrome.kill();
}
