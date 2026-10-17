export type ParseRouteArgs = {
  pathname: string;
};

// Routes: / = action list, /actions/<slug> = start a run, /actions/<slug>/<runId> = one run.
export const parseRoute = ({ pathname }: ParseRouteArgs) => {
  const [, slug, runId] = pathname.match(/^\/actions\/([^/]+)(?:\/([^/]+))?\/?$/) ?? [];

  return { slug: slug ? decodeURIComponent(slug) : undefined, runId: runId ? decodeURIComponent(runId) : undefined };
};
