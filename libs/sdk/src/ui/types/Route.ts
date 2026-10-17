// What the URL shows: the action list (all of it, or one folder), or one action, starting or running.
export type Route = { kind: 'list'; group: string | null } | { kind: 'action'; slug: string; runId: string | null };
