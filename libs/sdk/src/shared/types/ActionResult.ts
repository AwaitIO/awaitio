import { z } from 'zod/v4';
import { actionResultSchema } from '../schemas/actionResultSchema';

export type ActionResult = z.infer<typeof actionResultSchema>;
