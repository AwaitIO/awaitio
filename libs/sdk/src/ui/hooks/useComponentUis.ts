import { useEffect, useState } from 'react';
import { componentUiRegistry } from '../componentUiRegistry';
import type { ComponentUisState } from '../types/ComponentUisState';
import { toErrorMessage } from '../utils/toErrorMessage';

export const useComponentUis = (types: string[]) => {
  const [state, setState] = useState<ComponentUisState>({ status: 'loading' });
  // A stable dependency: the array itself is new on every render.
  const key = [...new Set(types)].join(',');

  useEffect(() => {
    let isCurrent = true;
    // An empty step (io.group({})) has no components to load and shows just the Continue button.
    const uniqueTypes = key ? key.split(',') : [];

    setState({ status: 'loading' });
    Promise.all(uniqueTypes.map(componentUiRegistry.load))
      .then((loaded) => {
        if (isCurrent) {
          setState({
            status: 'ready',
            uis: new Map(
              loaded.map((ui, index) => {
                return [uniqueTypes[index], ui];
              }),
            ),
          });
        }
      })
      .catch((error) => {
        if (isCurrent) {
          setState({ status: 'error', message: toErrorMessage(error) });
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [key]);

  return state;
};
