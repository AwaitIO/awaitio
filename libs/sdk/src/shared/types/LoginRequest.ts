import { z } from 'zod/v4';
import { loginRequestSchema } from '../schemas/loginRequestSchema';

export type LoginRequest = z.infer<typeof loginRequestSchema>;
