import type { Metadata } from 'next';
import { profile } from '@/data/profile';
export function siteOrigin() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  const vercel =
    process.env.VERCEL_ENV === 'production'
      ? process.env.VERCEL_PROJECT_PRODUCTION_URL
      : process.env.VERCEL_URL;
  const raw = explicit || (vercel ? `https://${vercel}` : 'http://localhost:3000');
  const url = new URL(raw);
  if (!['https:', 'http:'].includes(url.protocol))
    throw new Error('Site URL must use HTTP or HTTPS');
  return url.origin;
}
export const isIndexable =
  process.env.VERCEL_ENV === 'production' ||
  (!process.env.VERCEL_ENV &&
    process.env.NODE_ENV === 'production' &&
    !!process.env.NEXT_PUBLIC_SITE_URL);
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = `${title} | ${profile.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      type: 'website',
      images: ['/opengraph-image'],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: ['/opengraph-image'],
    },
  };
}
