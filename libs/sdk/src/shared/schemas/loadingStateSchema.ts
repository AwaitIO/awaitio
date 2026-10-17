import { z } from 'zod';

export const loadingStateSchema = z.object({
  label: z.string(),
  description: z.string().nullable(),
});
