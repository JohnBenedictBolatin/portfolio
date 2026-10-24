import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Navigation } from '@/components/navigation';
import { ThemeProvider } from '@/components/theme-provider';
import { Footer } from '@/components/ui';
import { AsciiArtBackground } from '@/components/ascii-art-background';
import { ScrollRevealObserver } from '@/components/scroll-reveal-observer';
import { profile, education } from '@/data/profile';
import { isIndexable, siteOrigin } from '@/lib/metadata';
import './globals.css';
const jetbrains = localFont({
  src: [
    {
      path: '../../public/fonts/JetBrainsMono-Latin-Variable.woff2',
      weight: '400 700',
      style: 'normal',
    },
  ],
  variable: '--font-jetbrains',
  display: 'swap',
});
const sora = localFont({
  src: '../../public/fonts/Sora-Variable.ttf',
  weight: '100 800',
  style: 'normal',
  variable: '--font-sora',
  display: 'swap',
});
const title = `${profile.name} | Software Engineering Portfolio`;
const description =
  'The portfolio of John Benedict Bolatin, an aspiring software engineer and AI enthusiast based in the Philippines.';
export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin()),
  title: { default: title, template: `%s | ${profile.name}` },
  description,
  alternates: { canonical: '/' },
  authors: [{ name: profile.name }],
  robots: { index: isIndexable, follow: isIndexable },
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'en_PH',
    siteName: `${profile.shortName} / portfolio`,
    url: '/',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: title }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/opengraph-image'] },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: siteOrigin(),
    description: profile.headline,
    homeLocation: { '@type': 'Place', name: profile.location },
    knowsAbout: profile.interests,
    affiliation: { '@type': 'CollegeOrUniversity', name: education.university },
    ...(profile.github || profile.linkedin
      ? { sameAs: [profile.github, profile.linkedin].filter(Boolean) }
      : {}),
  };
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${jetbrains.variable} ${sora.variable}`} id="top">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, '\\u003c') }}
        />
        <ThemeProvider>
          <ScrollRevealObserver />
          <AsciiArtBackground />
          <a href="#main-content" className="skip-link">
            skip to content
          </a>
          <Navigation />
          <main id="main-content" className="site-main" tabIndex={-1}>
            <div className="content-wrap">
              <div className="topline">
                <span>{profile.shortName.toLowerCase()} / personal portfolio</span>
                <span className="topline-location">
                  <span className="status-dot" />
                  based in the {profile.location}
                </span>
              </div>
              {children}
              <Footer />
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
