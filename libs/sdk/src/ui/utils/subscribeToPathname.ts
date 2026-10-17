import { constants } from '../constants';

export const subscribeToPathname = (onChange: () => void) => {
  window.addEventListener('popstate', onChange);
  window.addEventListener(constants.NAVIGATE_EVENT, onChange);

  return () => {
    window.removeEventListener('popstate', onChange);
    window.removeEventListener(constants.NAVIGATE_EVENT, onChange);
  };
};
