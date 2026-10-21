import { z } from 'zod/v4';

export const errorResponseSchema = z.object({
  error: z.string(),
  message: z.string().optional(),
});
