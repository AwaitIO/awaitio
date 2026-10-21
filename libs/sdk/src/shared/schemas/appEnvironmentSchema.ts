import { z } from 'zod/v4';

export const appEnvironmentSchema = z.object({
  title: z.string(),
  color: z.string(),
});
