import type { MetadataRoute } from 'next';
import { navigation } from '@/data/navigation';
import { projects } from '@/lib/content';
import { siteOrigin } from '@/lib/metadata';
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin();
  return [
    ...navigation.map(({ href }) => ({
      url: `${origin}${href}`,
      priority: href === '/' ? 1 : 0.7,
    })),
    ...projects.map(({ slug }) => ({ url: `${origin}/projects/${slug}`, priority: 0.8 })),
  ];
}
