import { useEffect, useState } from 'react';
import type { ActionList } from '../../shared/types/ActionList';
import { fetchActions } from '../api/fetchActions';
import { toErrorMessage } from '../utils/toErrorMessage';

// The header and the action list both need the list; one request per page load serves both. The actions only change
// when the server restarts, which reloads the UI anyway.
let request: Promise<ActionList> | null = null;

export const useActionList = () => {
  const [list, setList] = useState<ActionList | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;
    request ??= fetchActions();
    request
      .then((loaded) => {
        if (isCurrent) {
          setList(loaded);
        }
      })
      .catch((error) => {
        request = null;

        if (isCurrent) {
          setErrorMessage(toErrorMessage(error));
        }
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  return { list, errorMessage };
};
