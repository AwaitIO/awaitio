import { z } from 'zod';
import { actionResultSchema } from '../schemas/actionResultSchema';

export type ActionResult = z.infer<typeof actionResultSchema>;
