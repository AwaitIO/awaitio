import { useEffect, useState } from 'react';
import type { AppInfo } from '../../shared/types/AppInfo';
import { fetchAppInfo } from '../api/fetchAppInfo';

export type UseAppInfoArgs = {
  // Loads again when the user changes: only a logged-in user gets the environment list.
  userEmail: string | null;
};

// Null until loaded or when it fails; the pages work without it, only the name is missing.
export const useAppInfo = ({ userEmail }: UseAppInfoArgs) => {
  const [info, setInfo] = useState<AppInfo | null>(null);

  useEffect(() => {
    fetchAppInfo()
      .then((loaded) => {
        setInfo(loaded);
        document.title = loaded.environment ? `${loaded.name} (${loaded.environment.title})` : loaded.name;
      })
      .catch(() => {
        setInfo(null);
      });
  }, [userEmail]);

  return info;
};
