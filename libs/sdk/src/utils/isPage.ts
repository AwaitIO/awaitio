import { Page } from '../classes/Page';

// Like isAction: instanceof misses a page created by another copy of the package, the marker does not.
export const isPage = (value: unknown): value is Page<unknown> => {
  return value instanceof Page || (typeof value === 'object' && value !== null && 'kind' in value && value.kind === 'awaitio-page');
};
