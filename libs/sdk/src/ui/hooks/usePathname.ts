import { useSyncExternalStore } from 'react';
import { getPathname } from '../utils/getPathname';
import { subscribeToPathname } from '../utils/subscribeToPathname';

export const usePathname = () => {
  return useSyncExternalStore(subscribeToPathname, getPathname);
};
