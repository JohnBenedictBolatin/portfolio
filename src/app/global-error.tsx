'use client';

import localFont from 'next/font/local';
import { AsciiArtBackground } from '@/components/ascii-art-background';
import { ErrorState } from '@/components/error-state';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const jetbrains = localFont({
  src: '../../public/fonts/JetBrainsMono-Latin-Variable.woff2',
  weight: '400 700',
  style: 'normal',
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
const dotoDigits = localFont({
  src: '../../public/fonts/Doto-Variable.ttf',
  weight: '100 900',
  style: 'normal',
  variable: '--font-doto-digits',
  display: 'swap',
  adjustFontFallback: false,
  declarations: [{ prop: 'unicode-range', value: 'U+0030-0039' }],
});
const doto = localFont({
  src: '../../public/fonts/Doto-Variable.ttf',
  weight: '100 900',
  style: 'normal',
  variable: '--font-doto',
  display: 'swap',
  adjustFontFallback: false,
});

export default function GlobalError({ retry }: { error: unknown; retry: () => void }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <title>Page error | John Benedict Bolatin</title>
      </head>
      <body
        className={`${jetbrains.variable} ${sora.variable} ${dotoDigits.variable} ${doto.variable}`}
      >
        <ThemeProvider>
          <AsciiArtBackground />
          <main className="error-global-main">
            <ErrorState
              global
              code="500"
              title="something went wrong."
              description="The site hit a problem while loading. Try again or head back home."
              retry={retry}
            />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
