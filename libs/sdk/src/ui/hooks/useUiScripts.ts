import { useEffect, useState } from 'react';
import type { UiScriptRegistry } from '../classes/UiScriptRegistry';
import type { UiScriptsState } from '../types/UiScriptsState';
import { toErrorMessage } from '../utils/toErrorMessage';

export type UseUiScriptsArgs<TUi> = {
  registry: UiScriptRegistry<TUi>;
  types: string[];
};

// Loads the UI scripts of the given component or layout types and hands them over once all are registered.
export const useUiScripts = <TUi>({ registry, types }: UseUiScriptsArgs<TUi>) => {
  const [state, setState] = useState<UiScriptsState<TUi>>({ status: 'loading' });
  // A stable dependency: the array itself is new on every render.
  const key = [...new Set(types)].join(',');

  useEffect(() => {
    let isCurrent = true;
    // An empty step (io.group({})) has no components to load and shows just the Continue button.
    const uniqueTypes = key ? key.split(',') : [];

    setState({ status: 'loading' });
    Promise.all(uniqueTypes.map(registry.load))
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
  }, [key, registry]);

  return state;
};
