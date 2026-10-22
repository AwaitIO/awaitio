import type { OgImage } from '../types/OgImage';
import { getSiteUrl } from '../utils/getSiteUrl';
import type { FC, ReactNode } from 'react';

export type PageProps = {
  children: ReactNode;
  title: 'AwaitIO' | `AwaitIO – ${string}` | `${string} – AwaitIO`;
  // What the page is about, for search results and link previews
  description: string;
  ogImage: OgImage;
  canonicalPath: string;
  // ISO date, the same one the sitemap uses as lastmod
  lastModifiedAt?: string;
};

// The meta tags of one page. React hoists <title>, <meta> and <link> into <head>, so every page names its own
// title, canonical URL and link preview right next to its content.
export const Page: FC<PageProps> = ({ children, title, description, ogImage, canonicalPath, lastModifiedAt }) => {
  const canonicalUrl = getSiteUrl({ path: canonicalPath });
  const ogImageUrl = `${getSiteUrl({ path: '/' })}og/${ogImage}.png`;

  return (
    <>
      <>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AwaitIO" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        {lastModifiedAt && <meta property="og:updated_time" content={lastModifiedAt} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImageUrl} />
      </>

      {children}
    </>
  );
};
