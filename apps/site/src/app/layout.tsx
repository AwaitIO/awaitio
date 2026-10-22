import './globals.css';
import { Geist, Geist_Mono, IBM_Plex_Mono } from 'next/font/google';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import type { ReactNode } from 'react';

// Both mono fonts fall back to a system mono, not to the Arial-based fallback next/font makes by default: while the
// font loads, code and the wordmark stay monospaced instead of jumping from Arial on every refresh.
// The wordmark font: IBM Plex Mono (semibold and regular), exposed as --font-wordmark for the logo lockup.
const wordmarkFont = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-wordmark',
  adjustFontFallback: false,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
});

// Vercel's Geist: the sans for text, the mono for code and labels.
const sansFont = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const monoFont = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', adjustFontFallback: false, fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'] });

export type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" className={[wordmarkFont.variable, sansFont.variable, monoFont.variable].join(' ')}>
      <body className="min-h-screen bg-white font-sans text-gray-900 antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
};

// Next.js requires page and layout files to default-export their component.
// eslint-disable-next-line import/no-default-export
export default RootLayout;
