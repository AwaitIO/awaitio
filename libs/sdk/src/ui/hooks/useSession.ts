import { useCallback, useEffect, useState } from 'react';
import type { SessionUser } from '../../shared/types/SessionUser';
import { fetchSession } from '../api/fetchSession';
import { logOut } from '../api/logOut';
import { constants } from '../constants';
import type { SessionState } from '../types/SessionState';
import { toErrorMessage } from '../utils/toErrorMessage';

export const useSession = () => {
  const [session, setSession] = useState<SessionState>({ status: 'LOADING' });

  useEffect(() => {
    fetchSession()
      .then((user) => {
        setSession(user ? { status: 'AUTHENTICATED', user } : { status: 'ANONYMOUS' });
      })
      .catch((error) => {
        setSession({ status: 'FAILED', message: toErrorMessage(error) });
      });

    const onUnauthorized = () => {
      setSession({ status: 'ANONYMOUS' });
    };
    window.addEventListener(constants.UNAUTHORIZED_EVENT, onUnauthorized);

    return () => {
      window.removeEventListener(constants.UNAUTHORIZED_EVENT, onUnauthorized);
    };
  }, []);

  const onLoggedIn = useCallback((user: SessionUser) => {
    setSession({ status: 'AUTHENTICATED', user });
  }, []);

  const onLogOut = useCallback(() => {
    void logOut().finally(() => {
      setSession({ status: 'ANONYMOUS' });
    });
  }, []);

  return { session, onLoggedIn, onLogOut };
};
