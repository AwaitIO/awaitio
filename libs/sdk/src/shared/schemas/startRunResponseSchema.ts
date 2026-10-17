import { z } from 'zod';

export const startRunResponseSchema = z.object({
  runId: z.string(),
});
