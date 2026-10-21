import { constants as sharedConstants } from '../shared/constants';

// For a theme's Link: changes the URL of the AwaitIO UI without reloading it. The href is the link's own, already under
// the basePath (actionHref()).
export const navigateTo = (href: string) => {
  window.history.pushState(null, '', href);
  window.dispatchEvent(new Event(sharedConstants.NAVIGATE_EVENT));
};
