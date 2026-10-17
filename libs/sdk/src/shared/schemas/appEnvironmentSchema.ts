import { z } from 'zod';

export const appEnvironmentSchema = z.object({
  title: z.string(),
  color: z.string(),
});
