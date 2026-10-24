import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

export function validateContent(data, kind, slug, body) {
  const fail = (message) => {
    throw new Error(`${kind}/${slug}: ${message}`);
  };
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) fail('use a lowercase, hyphenated filename');
  for (const field of ['title', 'description'])
    if (typeof data[field] !== 'string' || !data[field].trim()) fail(`${field} is required`);
  if (typeof data.draft !== 'boolean') fail('draft must be explicitly true or false');
  if (!Array.isArray(data.tags) || !data.tags.every((tag) => typeof tag === 'string'))
    fail('tags must be an array of strings');
  const meta = {
    slug,
    title: data.title,
    description: data.description,
    draft: data.draft,
    tags: data.tags,
  };
  if (kind === 'projects') {
    if (!['web', 'mobile', 'ai', 'iot'].includes(data.category))
      fail('category must be web, mobile, ai, or iot');
    meta.category = data.category;
    if (data.featured !== undefined && typeof data.featured !== 'boolean')
      fail('featured must be a boolean');
    if (data.featured !== undefined) meta.featured = data.featured;
    for (const field of ['status', 'role']) {
      if (data[field] !== undefined) {
        if (typeof data[field] !== 'string') fail(`${field} must be text`);
        meta[field] = data[field];
      }
    }
    if (data.technologies !== undefined) {
      if (
        !Array.isArray(data.technologies) ||
        !data.technologies.every((item) => typeof item === 'string')
      )
        fail('technologies must be an array of strings');
      meta.technologies = data.technologies;
    }
    for (const field of ['sourceUrl', 'demoUrl'])
      if (data[field] !== undefined) {
        let url;
        try {
          url = new URL(data[field]);
        } catch {
          fail(`${field} must be a valid URL`);
        }
        if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password)
          fail(`${field} must be an HTTP(S) URL without credentials`);
        meta[field] = data[field];
      }
    if (data.image !== undefined) {
      if (
        typeof data.image?.src !== 'string' ||
        !data.image.src.startsWith('/images/') ||
        data.image.src.includes('..') ||
        typeof data.image.alt !== 'string' ||
        !data.image.alt.trim()
      )
        fail('image requires a local /images/ path and descriptive alt text');
      meta.image = data.image;
    }
  } else {
    if (
      typeof data.date !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}$/.test(data.date) ||
      Number.isNaN(Date.parse(data.date)) ||
      new Date(data.date).toISOString().slice(0, 10) !== data.date
    )
      fail('date must be a quoted valid YYYY-MM-DD string');
    meta.date = data.date;
    const words = body
      .replace(/```[\s\S]*?```/g, '')
      .split(/\s+/)
      .filter(Boolean).length;
    meta.readingMinutes = Math.max(1, Math.ceil(words / 200));
  }
  return meta;
}

export async function generateContent(root = process.cwd()) {
  const output = path.join(root, 'src/generated');
  await mkdir(output, { recursive: true });
  const imports = [
    "import type { ComponentType } from 'react';",
    "import type { Project, ArticleMetadata } from '@/lib/types';",
  ];
  const exports = [];
  for (const kind of ['projects', 'writing']) {
    const directory = path.join(root, 'src/content', kind);
    const files = (await readdir(directory)).filter((file) => file.endsWith('.mdx')).sort();
    const entries = [];
    for (const file of files) {
      const slug = file.slice(0, -4);
      const source = await readFile(path.join(directory, file), 'utf8');
      const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
      if (!match) throw new Error(`${kind}/${slug}: YAML frontmatter is required`);
      const data = parse(match[1]);
      const content = source.slice(match[0].length);
      const meta = validateContent(data, kind, slug, content);
      if (meta.draft) continue;
      const id = `${kind}_${entries.length}`;
      const target = `${kind}-${slug}.mdx`;
      await writeIfChanged(path.join(output, target), content);
      imports.push(`import ${id} from './${target}';`);
      entries.push(`{ meta: ${JSON.stringify(meta)}, Content: ${id} }`);
    }
    exports.push(
      `export const ${kind}Entries: Array<{ meta: ${kind === 'projects' ? 'Project' : 'ArticleMetadata'}; Content: ComponentType }> = [${entries.join(',\n')}];`,
    );
  }
  await writeIfChanged(
    path.join(output, 'content.ts'),
    `${imports.join('\n')}\n${exports.join('\n')}\n`,
  );
}
async function writeIfChanged(file, content) {
  try {
    if ((await readFile(file, 'utf8')) === content) return;
  } catch {
    /* first generation */
  }
  await writeFile(file, content);
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await generateContent();
  console.log('Content validated and generated.');
}
