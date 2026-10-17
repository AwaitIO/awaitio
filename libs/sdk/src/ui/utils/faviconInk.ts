import { constants } from '../constants';

// Browsers with a dark tab bar get a white mark, so the icon does not vanish into the tab.
export const faviconInk = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? constants.FAVICON_INK_DARK : constants.FAVICON_INK;
};
