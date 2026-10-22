import Link from 'next/link';
import { SponsorStrip } from './SponsorStrip';
import { constants } from '../constants';
import { ArrowIcon } from '../icons/ArrowIcon';
import type { FC } from 'react';

export const SiteFooter: FC = () => {
  return (
    <>
      <SponsorStrip />
      <footer className="border-t border-gray-100">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/pricing" className="hover:text-gray-900">
              Pricing
            </Link>
            <Link href="/demo" className="hover:text-gray-900">
              Demo
            </Link>
            <a href={constants.DOCS_URL} className="inline-flex items-center gap-1 hover:text-gray-900">
              Docs
              <ArrowIcon />
            </a>
            <a href={`${constants.DOCS_URL}/changelog`} className="inline-flex items-center gap-1 hover:text-gray-900">
              Changelog
              <ArrowIcon />
            </a>
            <a href={constants.GITHUB_URL} className="inline-flex items-center gap-1 hover:text-gray-900">
              GitHub
              <ArrowIcon />
            </a>
            <Link href="/terms-of-use" className="hover:text-gray-900">
              Terms of use
            </Link>
            <Link href="/privacy" className="hover:text-gray-900">
              Privacy
            </Link>
          </nav>
          <p>© 2026 Orukami s.r.o.</p>
        </div>
      </footer>
    </>
  );
};
