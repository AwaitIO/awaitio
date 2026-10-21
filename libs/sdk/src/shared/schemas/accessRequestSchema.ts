import { z } from 'zod/v4';
import { constants } from '../constants';

// What someone asking for access sends: who they are and the password they want, to get the line for `users`.
export const accessRequestSchema = z.object({
  email: z.string().trim().toLowerCase().email('Enter a valid email').max(320),
  name: z.string().trim().min(1, 'Enter your name').max(100),
  // The upper limit caps the work one request can cause, as at login.
  password: z.string().min(constants.MIN_PASSWORD_LENGTH, `Use at least ${constants.MIN_PASSWORD_LENGTH} characters`).max(1024),
});
