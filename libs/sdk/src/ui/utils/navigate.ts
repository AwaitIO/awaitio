import { constants as sharedConstants } from '../../shared/constants';

export type NavigateOptions = {
  replace?: boolean;
};

// Two client-side routes do not need a router library: change the URL and tell usePathname about it.
export const navigate = (path: string, { replace = false }: NavigateOptions = {}) => {
  if (replace) {
    window.history.replaceState(null, '', path);
  } else {
    window.history.pushState(null, '', path);
  }

  window.dispatchEvent(new Event(sharedConstants.NAVIGATE_EVENT));
};
