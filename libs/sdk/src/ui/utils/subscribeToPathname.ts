import { constants as sharedConstants } from '../../shared/constants';

export const subscribeToPathname = (onChange: () => void) => {
  window.addEventListener('popstate', onChange);
  window.addEventListener(sharedConstants.NAVIGATE_EVENT, onChange);

  return () => {
    window.removeEventListener('popstate', onChange);
    window.removeEventListener(sharedConstants.NAVIGATE_EVENT, onChange);
  };
};
