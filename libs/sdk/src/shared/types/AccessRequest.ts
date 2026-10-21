import { z } from 'zod/v4';
import { accessRequestSchema } from '../schemas/accessRequestSchema';

export type AccessRequest = z.input<typeof accessRequestSchema>;
