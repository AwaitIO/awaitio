import { z } from 'zod';
import { runParamsSchema } from '../schemas/runParamsSchema';

export type RunParams = z.infer<typeof runParamsSchema>;
