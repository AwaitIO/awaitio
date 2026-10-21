import { getBasePath } from '../../uikit/getBasePath';

// The route of the UI in the address bar, without the basePath: what routes.parse() reads.
export const getPathname = () => {
  const basePath = getBasePath();
  const { pathname } = window.location;

  return pathname.startsWith(basePath) ? pathname.slice(basePath.length) || '/' : pathname;
};
