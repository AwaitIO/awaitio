import { actionHref } from './actionHref';
import { pageHref } from './pageHref';
import type { Route } from '../types/Route';

// The URL that opens an action or a folder's page in the AwaitIO UI, the same on the server and in the browser.
export const routeHref = (route: Route) => {
  return 'page' in route ? pageHref(route) : actionHref(route);
};
