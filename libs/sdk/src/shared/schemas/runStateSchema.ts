import { z } from 'zod';
import { actionResultSchema } from './actionResultSchema';
import { loadingStateSchema } from './loadingStateSchema';
import { runStatusSchema } from './runStatusSchema';
import { stepSchema } from './stepSchema';

export const runStateSchema = z.object({
  id: z.string(),
  actionSlug: z.string(),
  actionName: z.string(),
  // Bumped on every change, so a client can drop a state older than the one it already shows.
  version: z.number().int(),
  status: runStatusSchema,
  step: stepSchema.nullable(),
  // Set by ctx.loading while the handler works between io calls; cleared by the next io call or the end.
  loading: loadingStateSchema.nullable(),
  result: actionResultSchema.nullable(),
});
