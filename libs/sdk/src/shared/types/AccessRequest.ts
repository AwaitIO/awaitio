import { z } from 'zod';
import { accessRequestSchema } from '../schemas/accessRequestSchema';

export type AccessRequest = z.input<typeof accessRequestSchema>;
