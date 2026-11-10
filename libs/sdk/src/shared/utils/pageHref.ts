import type { PageRoute } from '../types/PageRoute';

// The URL that opens a folder's page in the AwaitIO UI, the same on the server and in the browser.
export const pageHref = ({ page, params }: PageRoute) => {
  const path = page.split('/').map(encodeURIComponent).join('/');
  const query = new URLSearchParams(params).toString();

  return `/groups/${path}${query ? `?${query}` : ''}`;
};
