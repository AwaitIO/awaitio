import type { ActionRoute } from '../types/ActionRoute';

// The URL that opens an action in the AwaitIO UI, the same on the server and in the browser.
export const actionHref = ({ action, params }: ActionRoute) => {
  const path = action.split('/').map(encodeURIComponent).join('/');
  const query = new URLSearchParams(params).toString();

  return `/actions/${path}${query ? `?${query}` : ''}`;
};
