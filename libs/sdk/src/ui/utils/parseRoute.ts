import type { Route } from '../types/Route';

export type ParseRouteArgs = {
  pathname: string;
};

const UUID = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}';

const decodePath = (path: string) => {
  return path.split('/').map(decodeURIComponent).join('/');
};

// Routes: / = all actions, /groups/<folder path> = one folder, /actions/<slug> = start a run,
// /actions/<slug>/<runId> = one run. A slug can have any number of segments; a run id is a UUID, so it never
// reads as a folder.
export const parseRoute = ({ pathname }: ParseRouteArgs): Route => {
  const action = pathname.match(new RegExp(`^/actions/(.+?)(?:/(${UUID}))?/?$`, 'i'));

  if (action?.[1]) {
    return { kind: 'action', slug: decodePath(action[1]), runId: action[2] ?? null };
  }

  const group = pathname.match(/^\/groups\/(.+?)\/?$/);

  return { kind: 'list', group: group?.[1] ? decodePath(group[1]) : null };
};
