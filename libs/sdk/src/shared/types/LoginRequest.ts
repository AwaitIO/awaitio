import { z } from 'zod';
import { loginRequestSchema } from '../schemas/loginRequestSchema';

export type LoginRequest = z.infer<typeof loginRequestSchema>;
