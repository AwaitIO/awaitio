import { z } from 'zod/v4';

export const sessionUserSchema = z.object({
  email: z.string(),
  name: z.string(),
});
