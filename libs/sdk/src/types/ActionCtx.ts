import type { LoadingStartArgs } from './LoadingStartArgs';
import type { SessionUser } from '../shared/types/SessionUser';

export type ActionCtx = {
  runId: string;
  action: {
    slug: string;
  };
  // Who started the run.
  user: SessionUser;
  // Shows what the action is waiting for until the next io call or the end.
  loading: {
    start: (args: LoadingStartArgs) => void;
  };
};
