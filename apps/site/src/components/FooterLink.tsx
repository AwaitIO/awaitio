import Link from 'next/link';
import { ArrowIcon } from '../icons/ArrowIcon';
import type { FC, ReactNode } from 'react';

export type FooterLinkProps = {
  href: string;
  children: ReactNode;
  // A link that leaves awaitio.com, shown with the arrow after its label and opened in a new tab.
  external?: boolean;
};

// A footer link: a page of the site, or a link outside it with the arrow, opened in a new tab.
export const FooterLink: FC<FooterLinkProps> = ({ href, children, external = false }) => {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-gray-900">
        {children}
        <ArrowIcon />
      </a>
    );
  }

  return (
    <Link href={href} className="hover:text-gray-900">
      {children}
    </Link>
  );
};
