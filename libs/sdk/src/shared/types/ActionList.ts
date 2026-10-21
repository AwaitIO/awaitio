import { z } from 'zod/v4';
import { actionListSchema } from '../schemas/actionListSchema';

export type ActionList = z.infer<typeof actionListSchema>;
