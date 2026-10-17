import { z } from 'zod';

export const sessionUserSchema = z.object({
  email: z.string(),
  name: z.string(),
});
