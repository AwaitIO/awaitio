import Link from 'next/link';
import { FooterLink } from './FooterLink';
import { FooterSection } from './FooterSection';
import { Lockup } from './logos/Lockup';
import { SponsorStrip } from './SponsorStrip';
import { constants } from '../constants';
import { DiscordIcon } from '../icons/DiscordIcon';
import { GitHubIcon } from '../icons/GitHubIcon';
import { XIcon } from '../icons/XIcon';
import type { FC } from 'react';

// The logo with one line about AwaitIO and GitHub on the right, then the links in columns: the site's pages, outside
// resources, a comparison page for each similar tool, and the legal pages with the contact.
export const SiteFooter: FC = () => {
  return (
    <>
      <SponsorStrip />
      <footer className="border-t border-gray-900/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-14 px-4 pt-14 pb-16">
          <div className="flex items-start justify-between gap-6">
            <div className="flex max-w-sm flex-col gap-4">
              <Link href="/" aria-label="AwaitIO home" className="self-start">
                <Lockup size={24} tone="light" />
              </Link>
              <p className="text-sm text-gray-600">Internal tools written as plain TypeScript functions. Your code awaits, the browser answers.</p>
            </div>
            <div className="flex items-center gap-5 text-gray-600">
              <a href={constants.DISCORD_URL} target="_blank" rel="noopener noreferrer" aria-label="AwaitIO on Discord" className="hover:text-gray-900">
                <DiscordIcon className="h-7 w-7" />
              </a>
              <a href={constants.X_URL} target="_blank" rel="noopener noreferrer" aria-label="AwaitIO on X" className="hover:text-gray-900">
                <XIcon className="h-7 w-7" />
              </a>
              <a href={constants.GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="AwaitIO on GitHub" className="hover:text-gray-900">
                <GitHubIcon className="h-7 w-7" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3">
            <FooterSection title="Product">
              <FooterLink href="/pricing">Pricing</FooterLink>
              <FooterLink href="/demo">Demo</FooterLink>
              <FooterLink href="/brand">Brand</FooterLink>
            </FooterSection>

            <FooterSection title="Resources">
              <FooterLink href={constants.DOCS_URL} external>
                Docs
              </FooterLink>
              <FooterLink href={`${constants.DOCS_URL}/changelog`} external>
                Changelog
              </FooterLink>
              <FooterLink href={constants.GITHUB_URL} external>
                GitHub
              </FooterLink>
              <FooterLink href={constants.SPONSORS_URL} external>
                Sponsor
              </FooterLink>
            </FooterSection>


            <FooterSection title="Company">
              <FooterLink href={`mailto:${constants.CONTACT_EMAIL}`} external>
                Contact
              </FooterLink>
              <FooterLink href="/terms-of-use">Terms of use</FooterLink>
              <FooterLink href="/privacy">Privacy</FooterLink>
            </FooterSection>
          </div>
        </div>
      </footer>
    </>
  );
};
