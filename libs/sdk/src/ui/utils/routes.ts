import { decodePath } from './decodePath';
import { encodePath } from './encodePath';
import { constants } from '../constants';
import type { Route } from '../types/Route';

export type RoutesGroupArgs = {
  group: string;
};

export type RoutesActionArgs = {
  slug: string;
  runId?: string;
};

export type RoutesParseArgs = {
  pathname: string;
};

// Every URL of the UI in one place. The builders and parse, the way back, share the same prefixes, so a link and
// the page it opens cannot drift apart.
export const routes = {
  // The action list is the home page of the UI.
  actionList: () => {
    return '/';
  },
  // The action list narrowed to one folder of the actions directory: /groups/billing, /groups/billing/invoices.
  group: ({ group }: RoutesGroupArgs) => {
    return `${constants.GROUPS_PATH}/${encodePath({ path: group })}`;
  },
  // /actions/<slug> starts a run, /actions/<slug>/<runId> shows one; the slug keeps its folders: /actions/billing/refund_order.
  action: ({ slug, runId }: RoutesActionArgs) => {
    const base = `${constants.ACTIONS_PATH}/${encodePath({ path: slug })}`;

    return runId ? `${base}/${encodeURIComponent(runId)}` : base;
  },
  // The page where someone without a login creates the entry for `users` to hand to whoever runs AwaitIO.
  access: () => {
    return constants.ACCESS_PATH;
  },
  // What a URL shows. Anything that is not an action, a folder or the access page is the action list.
  parse: ({ pathname }: RoutesParseArgs): Route => {
    const action = pathname.match(new RegExp(`^${constants.ACTIONS_PATH}/(.+?)(?:/(${constants.RUN_ID_PATTERN}))?/?$`, 'i'));

    if (action?.[1]) {
      return { kind: 'action', slug: decodePath({ path: action[1] }), runId: action[2] ?? null };
    }

    if (pathname.replace(/\/$/, '') === constants.ACCESS_PATH) {
      return { kind: 'access' };
    }

    const group = pathname.match(new RegExp(`^${constants.GROUPS_PATH}/(.+?)/?$`));

    return { kind: 'list', group: group?.[1] ? decodePath({ path: group[1] }) : null };
  },
};
