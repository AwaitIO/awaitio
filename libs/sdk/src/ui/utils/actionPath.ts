export type ActionPathArgs = {
  slug: string;
  runId?: string;
};

// /actions/<slug> starts a run, /actions/<slug>/<runId> shows one.
export const actionPath = ({ slug, runId }: ActionPathArgs) => {
  const base = `/actions/${encodeURIComponent(slug)}`;

  return runId ? `${base}/${encodeURIComponent(runId)}` : base;
};
