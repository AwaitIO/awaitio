import { withBasePath } from './withBasePath';
import type { Route } from '../shared/types/Route';
import { routeHref as routePath } from '../shared/utils/routeHref';

// The link to an action or a folder's page in the browser: the server's routeHref under the basePath, ready for a Link
// or navigateTo().
export const routeHref = (route: Route) => {
  return withBasePath(routePath(route));
};
