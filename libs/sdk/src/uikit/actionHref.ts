import { withBasePath } from './withBasePath';
import type { ActionRoute } from '../shared/types/ActionRoute';
import { actionHref as actionPath } from '../shared/utils/actionHref';

// The link to an action in the browser: the server's actionHref under the basePath, ready for a Link or navigateTo().
export const actionHref = (route: ActionRoute) => {
  return withBasePath(actionPath(route));
};
