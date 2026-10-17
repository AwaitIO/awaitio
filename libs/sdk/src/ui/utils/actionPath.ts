import { encodePath } from './encodePath';

export type ActionPathArgs = {
  slug: string;
  runId?: string;
};

// /actions/<slug> starts a run, /actions/<slug>/<runId> shows one; the slug keeps its folders: /actions/billing/refund_order.
export const actionPath = ({ slug, runId }: ActionPathArgs) => {
  const base = `/actions/${encodePath({ path: slug })}`;

  return runId ? `${base}/${encodeURIComponent(runId)}` : base;
};
