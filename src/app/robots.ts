import type { MetadataRoute } from 'next';
import { isIndexable, siteOrigin } from '@/lib/metadata';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', ...(isIndexable ? { allow: '/' } : { disallow: '/' }) },
    sitemap: `${siteOrigin()}/sitemap.xml`,
  };
}
