'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import type { FC } from 'react';

// Next.js scrolls to the first element of the new page, but <Page> starts with <title> and <meta> tags that React moves
// into <head>, so it finds nothing to scroll to and the new page opens where the old one was scrolled. This puts every
// page change back at the top; a link to an anchor (/brand#icons) keeps its own scroll.
export const ScrollToTop: FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname]);

  return null;
};
