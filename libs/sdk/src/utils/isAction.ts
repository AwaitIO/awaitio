import { Action } from '../classes/Action';

// instanceof misses an action created by another copy of the package (a symlinked or duplicated install), so the
// marker on the instance counts too.
export const isAction = (value: unknown): value is Action<unknown> => {
  return value instanceof Action || (typeof value === 'object' && value !== null && 'kind' in value && value.kind === 'awaitio-action');
};
