import { z } from 'zod/v4';

export const startRunResponseSchema = z.object({
  runId: z.string(),
});
