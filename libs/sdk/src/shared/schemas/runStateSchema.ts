import { z } from 'zod';
import { actionResultSchema } from './actionResultSchema';
import { loadingStateSchema } from './loadingStateSchema';
import { runParamsSchema } from './runParamsSchema';
import { runStatusSchema } from './runStatusSchema';
import { stepSchema } from './stepSchema';

export const runStateSchema = z.object({
  id: z.string(),
  actionSlug: z.string(),
  actionName: z.string(),
  // What the run was opened with (ctx.params), so "Run again" can start the same.
  params: runParamsSchema,
  // Bumped on every change, so a client can drop a state older than the one it already shows.
  version: z.number().int(),
  status: runStatusSchema,
  step: stepSchema.nullable(),
  // Set by ctx.loading while the handler works between io calls; cleared by the next io call or the end.
  loading: loadingStateSchema.nullable(),
  result: actionResultSchema.nullable(),
  // When the run succeeded, failed or was canceled (ISO); null while it runs.
  finishedAt: z.string().nullable(),
});
