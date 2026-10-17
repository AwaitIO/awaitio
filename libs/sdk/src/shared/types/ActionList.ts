import { z } from 'zod';
import { actionListSchema } from '../schemas/actionListSchema';

export type ActionList = z.infer<typeof actionListSchema>;
