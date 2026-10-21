import Link from 'next/link';
import { constants } from '../constants';
import { Lockup } from './logos/Lockup';
import { LogoMark10 } from './logos/LogoMark10';
import type { FC } from 'react';

export const SiteHeader: FC = () => {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" aria-label="AwaitIO home">
          <Lockup size={24} tone="light" Mark={LogoMark10} />
        </Link>
        <nav className="flex items-center gap-5 text-sm text-gray-600">
          <Link href="/pricing" className="hover:text-gray-900">
            Pricing
          </Link>
          <Link href="/demo" className="hover:text-gray-900">
            Demo
          </Link>
          <a href={constants.DOCS_URL} className="inline-flex items-center gap-1 hover:text-gray-900">
            Docs
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </a>
          <a href={constants.GITHUB_URL} aria-label="AwaitIO on GitHub" className="hover:text-gray-900">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
};
