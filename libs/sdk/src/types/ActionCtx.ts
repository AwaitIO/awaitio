import type { LoadingStartArgs } from './LoadingStartArgs';
import type { ActionRoute } from '../shared/types/ActionRoute';
import type { RunParams } from '../shared/types/RunParams';
import type { SessionUser } from '../shared/types/SessionUser';

export type ActionCtx<TParams = Readonly<RunParams>> = {
  runId: string;
  action: {
    slug: string;
  };
  // The query string the action was opened with: /actions/<slug>?id=42 gives { id: '42' }, parsed by the action's
  // params schema when it has one. As untrusted as a form field: anyone can craft the link.
  params: TParams;
  // Who started the run.
  user: SessionUser;
  // Shows what the action is waiting for until the next io call or the end.
  loading: {
    start: (args: LoadingStartArgs) => void;
  };
  // Ends the run and opens another action in the same browser tab: ctx.redirect(changeRole.route({ params: { id } })).
  // An io call after it throws, like after a cancel.
  redirect: (route: ActionRoute) => Promise<void>;
};
