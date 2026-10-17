import { z } from 'zod';

export const stepResponseSchema = z.object({
  stepId: z.string(),
  values: z.array(z.unknown()),
});
