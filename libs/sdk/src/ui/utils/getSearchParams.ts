import type { RunParams } from '../../shared/types/RunParams';

// The query string as ctx.params; a key given twice keeps its last value.
export const getSearchParams = (): RunParams => {
  return Object.fromEntries(new URLSearchParams(window.location.search));
};
