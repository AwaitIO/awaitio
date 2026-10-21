import { z } from 'zod/v4';

export const stepResponseSchema = z.object({
  stepId: z.string(),
  values: z.array(z.unknown()),
});
