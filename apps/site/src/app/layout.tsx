import './globals.css';
import { Geist, Geist_Mono, IBM_Plex_Mono } from 'next/font/google';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'AwaitIO – internal tools with just async/await',
  description: 'Write internal tools as async TypeScript functions. Every await asks a person in the browser. One Node process inside your own app.',
};

// The wordmark font: IBM Plex Mono (semibold and regular), exposed as --font-wordmark for the logo lockup.
const wordmarkFont = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-wordmark' });

// Vercel's Geist: the sans for text, the mono for code and labels.
const sansFont = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const monoFont = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

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
