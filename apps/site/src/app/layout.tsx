import './globals.css';
import { Geist, Geist_Mono, IBM_Plex_Mono, Silkscreen } from 'next/font/google';
import { MotionSettings } from '../components/motion/MotionSettings';
import { ScrollToTop } from '../components/ScrollToTop';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { UmamiAnalytics } from '../components/UmamiAnalytics';
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

// Silkscreen: the pixel type of the section headings, the same pixels as the dither ring of the logo.
const pixelFont = Silkscreen({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-silkscreen', adjustFontFallback: false, fallback: ['ui-monospace', 'monospace'] });

export type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" className={[wordmarkFont.variable, sansFont.variable, monoFont.variable, pixelFont.variable].join(' ')}>
      {/* Browser extensions such as Grammarly add attributes to <body> before React hydrates; ignore that one level. */}
      <body className="min-h-screen bg-paper font-sans text-gray-900 antialiased" suppressHydrationWarning>
        <ScrollToTop />
        <UmamiAnalytics />
        <MotionSettings>
          {/* `site-chrome` boxes add nothing to the layout; a page that stands alone (the 404) hides them. */}
          <div className="site-chrome contents">
            <SiteHeader />
          </div>
          <main>{children}</main>
          <div className="site-chrome contents">
            <SiteFooter />
          </div>
        </MotionSettings>
      </body>
    </html>
  );
};

// Next.js requires page and layout files to default-export their component.
// eslint-disable-next-line import/no-default-export
export default RootLayout;
