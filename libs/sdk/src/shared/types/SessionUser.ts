import { z } from 'zod';
import { sessionUserSchema } from '../schemas/sessionUserSchema';

// The logged-in user as the UI and ctx.user see it.
export type SessionUser = z.infer<typeof sessionUserSchema>;
