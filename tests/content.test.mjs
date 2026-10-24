import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { compile } from '@mdx-js/mdx';
import rehypePrettyCode from 'rehype-pretty-code';
import { generateContent, validateContent } from '../scripts/content.mjs';

const project = {
  title: 'Test project',
  description: 'A test fixture.',
  draft: false,
  tags: [],
  category: 'iot',
};
test('requires honest, explicit publication metadata and safe slugs', () => {
  assert.equal(validateContent(project, 'projects', 'example', '').slug, 'example');
  for (const data of [
    { ...project, draft: undefined },
    { ...project, title: '' },
    { ...project, category: 'unknown' },
    { ...project, tags: 'text' },
  ])
    assert.throws(() => validateContent(data, 'projects', 'example', ''));
  assert.throws(() => validateContent(project, 'projects', '../unsafe', ''));
});
test('rejects unsafe URLs and incomplete image metadata', () => {
  for (const sourceUrl of ['javascript:alert(1)', 'https://user:secret@example.com', 'not a URL'])
    assert.throws(() => validateContent({ ...project, sourceUrl }, 'projects', 'example', ''));
  assert.throws(() =>
    validateContent({ ...project, image: { src: '/images/test.png' } }, 'projects', 'example', ''),
  );
  assert.throws(() =>
    validateContent(
      { ...project, image: { src: '/images/../private.png', alt: 'Image' } },
      'projects',
      'example',
      '',
    ),
  );
});
test('validates real article dates and calculates reading time', () => {
  const article = { ...project, date: '2026-10-14' };
  assert.equal(
    validateContent(article, 'writing', 'example', 'word '.repeat(401)).readingMinutes,
    3,
  );
  for (const date of ['yesterday', '2026-02-30', undefined])
    assert.throws(() => validateContent({ ...article, date }, 'writing', 'example', ''));
});
test('discovers new content and excludes drafts, including newly unpublished entries', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'portfolio-content-'));
  try {
    for (const kind of ['projects', 'writing'])
      await mkdir(path.join(root, 'src/content', kind), { recursive: true });
    const publicPath = path.join(root, 'src/content/projects/public-entry.mdx');
    const fixture = `---\ntitle: Fixture\ndescription: An unpublished test fixture.\ndraft: false\ntags: []\ncategory: iot\n---\n## overview\nFixture text.\n`;
    await writeFile(publicPath, fixture);
    await writeFile(
      path.join(root, 'src/content/projects/draft-entry.mdx'),
      fixture.replace('draft: false', 'draft: true'),
    );
    await generateContent(root);
    let manifest = await readFile(path.join(root, 'src/generated/content.ts'), 'utf8');
    assert.match(manifest, /public-entry/);
    assert.doesNotMatch(manifest, /draft-entry/);
    await writeFile(publicPath, fixture.replace('draft: false', 'draft: true'));
    await generateContent(root);
    manifest = await readFile(path.join(root, 'src/generated/content.ts'), 'utf8');
    assert.doesNotMatch(manifest, /public-entry/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
test('unpublished writing fixture compiles highlighted code and custom diagrams', async () => {
  const source = await readFile('src/content/writing/authoring-example.mdx', 'utf8');
  const body = source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
  const result = String(
    await compile(body, {
      rehypePlugins: [
        [rehypePrettyCode, { theme: { dark: 'github-dark', light: 'github-light' } }],
      ],
    }),
  );
  assert.match(result, /data-rehype-pretty-code/);
  assert.match(result, /Diagram/);
});
