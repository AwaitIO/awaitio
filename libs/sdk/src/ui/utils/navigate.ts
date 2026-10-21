import { constants as sharedConstants } from '../../shared/constants';
import { withBasePath } from '../../uikit/withBasePath';

export type NavigateOptions = {
  replace?: boolean;
};

// Two client-side routes do not need a router library: change the URL and tell usePathname about it. The path is a
// route of the UI (routes.action(), a run's redirect); the address bar gets it under the basePath.
export const navigate = (path: string, { replace = false }: NavigateOptions = {}) => {
  if (replace) {
    window.history.replaceState(null, '', withBasePath(path));
  } else {
    window.history.pushState(null, '', withBasePath(path));
  }

  window.dispatchEvent(new Event(sharedConstants.NAVIGATE_EVENT));
};
