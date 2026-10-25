import fs from 'fs';
import path from 'path';
import { LAST_MODIFIED_AT as PRICING_LAST_MODIFIED_AT } from '../src/app/pricing/page';
import { LAST_MODIFIED_AT as PRIVACY_LAST_MODIFIED_AT } from '../src/app/privacy/page';
import { LAST_MODIFIED_AT as TERMS_OF_USE_LAST_MODIFIED_AT } from '../src/app/terms-of-use/page';
import { constants } from '../src/constants';
import { competitors } from '../src/utils/competitors';
import { getSiteUrl } from '../src/utils/getSiteUrl';

// Writes public/sitemap.xml and public/robots.txt on every build. Both are committed, so a diff shows which
// pages entered or left the sitemap. Each URL goes through getSiteUrl, the same helper the canonical links use.
//
//   pnpm --filter @awaitio/site generate:sitemap

const publicDirectory = path.join(process.cwd(), 'public');

(() => {
  // Pages with a date export it next to their content, the same value <Page lastModifiedAt> renders.
  const entries: { path: string; lastModifiedAt?: string }[] = [
    { path: '/' },
    { path: '/pricing/', lastModifiedAt: PRICING_LAST_MODIFIED_AT },
    { path: '/demo/' },
    { path: '/brand/' },
    { path: '/vs/' },
    ...competitors.map((competitor) => ({ path: `/vs/${competitor.slug}/`, lastModifiedAt: competitor.lastModifiedAt })),
    { path: '/terms-of-use/', lastModifiedAt: TERMS_OF_USE_LAST_MODIFIED_AT },
    { path: '/privacy/', lastModifiedAt: PRIVACY_LAST_MODIFIED_AT },
  ];

  const urls = entries.map((entry) => {
    const lastModified = entry.lastModifiedAt ? `<lastmod>${entry.lastModifiedAt}</lastmod>` : '';

    return `  <url><loc>${getSiteUrl({ path: entry.path })}</loc>${lastModified}</url>`;
  });

  fs.writeFileSync(path.join(publicDirectory, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
  fs.writeFileSync(path.join(publicDirectory, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${constants.SITE_URL}/sitemap.xml\n`);

  console.info(`[sitemap] ${entries.length} URLs written to sitemap.xml, robots.txt points at it`);
})();
