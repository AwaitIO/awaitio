import { getBasePath } from './getBasePath';

// A path of AwaitIO (/api/actions, /actions/billing) as the browser has to request it: under the basePath.
export const withBasePath = (path: string) => {
  return `${getBasePath()}${path}`;
};
