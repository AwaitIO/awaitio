import type { LoadingStartArgs } from './LoadingStartArgs';

export type ActionCtx = {
  runId: string;
  action: {
    slug: string;
  };
  // Shows what the action is waiting for until the next io call or the end.
  loading: {
    start: (args: LoadingStartArgs) => void;
  };
};
