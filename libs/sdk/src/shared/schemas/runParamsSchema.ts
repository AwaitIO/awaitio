import { z } from 'zod/v4';

const MAX_PARAMS = 50;

// Values from the query string of /actions/<slug>?…: always strings, and as untrusted as anything typed in a form.
export const runParamsSchema = z.record(z.string(), z.string().max(2000)).refine((params) => {
  return Object.keys(params).length <= MAX_PARAMS;
}, `At most ${MAX_PARAMS} params.`);
