'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type FC } from 'react';
import { constants } from '../constants';
import { ArrowIcon } from '../icons/ArrowIcon';
import { CloseIcon } from '../icons/CloseIcon';
import { GitHubIcon } from '../icons/GitHubIcon';
import { MenuIcon } from '../icons/MenuIcon';
import { Lockup } from './logos/Lockup';
import { LogoMark10 } from './logos/LogoMark10';

// Text links in a row from the sm breakpoint up; below it they fold into a menu behind a button, GitHub stays visible.
export const SiteHeader: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false); 
  }, [pathname]);

  const links = (
    <>
      <Link href="/pricing" className="hover:text-gray-900">
        Pricing
      </Link>
      <Link href="/demo" className="hover:text-gray-900">
        Demo
      </Link>
      <a href={`${constants.DOCS_URL}/changelog`} className="hover:text-gray-900">
        Changelog
      </a>
      <a href={constants.DOCS_URL} className="inline-flex items-center gap-1 hover:text-gray-900">
        Docs
        <ArrowIcon />
      </a>
    </>
  );

  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" aria-label="AwaitIO home" className="shrink-0">
          <Lockup size={24} tone="light" Mark={LogoMark10} />
        </Link>
        <nav className="flex items-center gap-5 text-sm text-gray-600">
          <div className="hidden items-center gap-5 sm:flex">{links}</div>
          <a href={constants.GITHUB_URL} aria-label="AwaitIO on GitHub" className="hover:text-gray-900">
            <GitHubIcon />
          </a>
          <button
            type="button"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="site-menu"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="-mr-2 rounded p-2 hover:text-gray-900 sm:hidden"
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </nav>
      </div>
      {isOpen && (
        <div id="site-menu" className="border-t border-gray-100 sm:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 text-base text-gray-600">{links}</nav>
        </div>
      )}
    </header>
  );
};
