# John Benedict Bolatin — Portfolio

A restrained, typography-led portfolio built with Next.js App Router, React, TypeScript, Tailwind CSS, local JetBrains Mono, and trusted local MDX. Dark by default, with light/system choices. No database, account system, analytics, or paid service is required.

## Run locally

Install Node.js **24 LTS** (npm included), then run from this directory:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. The development runner validates content, generates MDX imports, and watches `src/content` for additions and edits. Invalid content prints an error; fix the source before publishing.

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

Formatting: `npm run format` or `npm run format:check`. Build output and generated content are ignored. Always use `npm run build`, which generates content first, instead of calling `next build` directly.

## Personal information

Edit `src/data/profile.ts` for your name (and the two hero/share-image `nameLines`), headline, introduction, education, interests, and optional contact information:

```ts
email: 'your verified email',
github: 'https://github.com/your-verified-handle',
linkedin: 'https://www.linkedin.com/in/your-verified-profile/',
resume: '/resume.pdf',
portrait: { src: '/images/profile/portrait.jpg', alt: 'Portrait of John Benedict Bolatin' },
availability: 'open to opportunities',
```

These examples are configuration instructions, not real contact details. Omit fields until confirmed. Missing fields do not render dead links, missing pictures, or disabled controls. Add your actual PDF at `public/resume.pdf` before setting `resume`. Add portrait/project assets beneath `public/images` and provide accurate alternative text.

Update `src/data/experience.ts` in reverse chronological order. The initial internship has no invented dates, duties, technologies, or completion status. Update `src/data/skills.ts` with confirmed skills and their category, familiarity, and optional description. Skills are intentionally empty initially. Do not treat technologies used to build this portfolio as a verified personal skills list.

The initial public project is SeedRover. Its overview is based only on the supplied facts. Social links, résumé, portrait, skills, dates, and detailed case-study claims still need the owner's information.

## Projects

Add a lowercase hyphenated `.mdx` file under `src/content/projects`. Its filename becomes its URL slug. Frontmatter must include:

```yaml
---
title: Your verified project name
description: An accurate one-sentence overview.
category: web
featured: true
draft: true
tags:
  - architecture
---
```

Allowed categories: `web`, `mobile`, `ai`, `iot`. Filters are generated only for categories with published entries. Up to three featured projects appear on the homepage.

Optional metadata: `technologies` (string list), `role`, `status`, `sourceUrl`, `demoUrl`, and `image: { src: '/images/projects/example.png', alt: 'Descriptive text' }`. External URLs must use HTTP(S); thumbnails must be local. Add the actual assets first.

Write the case study beneath the frontmatter. Suggested sections: overview, motivation, my role, architecture, development process, implementation decisions, challenges, results/status, and lessons learned. Add sections only when the information is verified. Set `draft: false` when ready. No route edits are necessary.

## Articles and MDX

The contact and writing pages have been removed from the site, navigation, homepage, and sitemap. Existing writing sources under `src/content/writing` are retained locally as authoring examples; changing their draft status does not publish a writing route. The MDX components below remain available for project case studies.

Code fences are highlighted at build time for both themes. Markdown tables scroll inside their container. Custom components are available without imports:

```mdx
<Figure
  src="/images/projects/actual-screenshot.png"
  alt="Describe the screenshot"
  width={1280}
  height={720}
  caption="Explain the view."
/>

<Diagram label="Describe the architecture diagram">
  <pre>{`client → server → storage`}</pre>
</Diagram>
```

MDX can execute JavaScript: accept only trusted, repository-owned content. Never compile submissions, remote content, or user uploads. The site has no endpoint for doing so. Normal MDX links reject unsafe schemes; deliberate executable MDX remains trusted code.

## Design and accessibility

The installed bryl-minimal-design skill informs the editorial approach. The owner's brief overrides its font, color, capitalization, card, motion, and default-theme choices. This site uses original artwork and copy, not Bryl Lim's personal assets.

The 224px sidebar becomes a sticky header below 1024px. The native modal menu supports keyboard navigation, Escape, and focus restoration. Theme preference is persisted and applied before paint. Decorative ASCII is hidden from screen readers. Reduced motion removes transitions and smooth scrolling. JetBrains Mono is served locally through `next/font`; its OFL license is in `public/fonts/OFL.txt`.

## Browser checks

```sh
npm run build
npm run test:e2e
```

The tests start the production server at port 3100. On this Windows workstation they use installed Microsoft Edge. For other systems, run `npx playwright install chromium` and set `PLAYWRIGHT_CHANNEL=chromium`. Screenshots and audit output go to ignored `.qa/` and `test-results/` directories. Tests exercise both themes, five viewport widths, navigation, missing slugs, drafts, metadata, and accessibility.

## Deploy with GitHub and Vercel

1. Create a GitHub repository and push the project. Preserve the existing skills; do not commit `node_modules`, `.next`, `.env.local`, or QA artifacts. If the installed skill is itself a nested Git checkout, keep it local unless you deliberately configure a submodule or vendor it.
2. In Vercel, select **Add New → Project**, import that repository, and choose **Next.js**.
3. Use the project root, Node.js **24.x**, install command `npm ci`, and build command `npm run build`. Leave output directory at the framework default.
4. Deploy. Core pages require no environment variables. Vercel supplies the deployment origin used by canonical URLs and the sitemap.
5. Add a custom domain in **Project → Settings → Domains**. Apply exactly the DNS records Vercel shows at your DNS provider, then wait for verification and TLS provisioning.
6. Set `NEXT_PUBLIC_SITE_URL` to the verified production origin (for example, `https://your-actual-domain.com`) for production and redeploy so canonical URLs, structured data, and the sitemap use it.
7. Verify `/`, `/projects/seedrover`, `/sitemap.xml`, `/robots.txt`, and `/opengraph-image` on the deployed domain.

Preview deployments emit `noindex` metadata and disallow crawling. Production Vercel deployments are indexable. Non-Vercel production builds need `NEXT_PUBLIC_SITE_URL` to become indexable. Local builds default to localhost and noindex. A robots exclusion is not access control; do not publish private content.

Deployment is not automatic from this workspace. A verified deployment URL will be reported only after an actual successful deployment.

## Completion and audit record

See [the seven-phase implementation report](docs/IMPLEMENTATION.md) for delivered features, test results, Lighthouse measurements, remaining personal content, and the development-only dependency advisory. Production dependencies passed `npm audit --omit=dev` at verification time.

To reproduce Lighthouse locally, run `npm run start -- --port 3101` after building, then `node scripts/lighthouse.mjs`. The script uses installed Edge on Windows; set `CHROME_PATH` to your Chromium-based browser executable on another system. It writes reports under `.qa/`.
