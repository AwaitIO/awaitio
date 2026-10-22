import { constants } from '../constants';

export type GetSiteUrlArgs = {
  path: string;
};

// The site is exported with trailingSlash, so every page is served from its path with a trailing slash and
// without a query. Canonical links, og:url and the sitemap all go through this, so they name the exact URL
// the server returns instead of a variant that redirects.
export const getSiteUrl = ({ path }: GetSiteUrlArgs) => {
  const pathname = path.split('?')[0];

  return `${constants.SITE_URL}${pathname.endsWith('/') ? pathname : `${pathname}/`}`;
};
