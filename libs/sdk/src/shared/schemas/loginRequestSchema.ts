import { z } from 'zod/v4';

export const loginRequestSchema = z.object({
  email: z.string().max(320),
  // Caps the work one request can cause; scrypt hashes whatever it gets.
  password: z.string().max(1024),
});
