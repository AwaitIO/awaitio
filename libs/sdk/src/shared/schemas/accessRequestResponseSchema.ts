import { z } from 'zod/v4';
import { sessionUserSchema } from './sessionUserSchema';

// The entry for `users` in app.ts, ready to hand to whoever runs AwaitIO.
export const accessRequestResponseSchema = z.object({
  user: sessionUserSchema.extend({ passwordHash: z.string() }),
});
