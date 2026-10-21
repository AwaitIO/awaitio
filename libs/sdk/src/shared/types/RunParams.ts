import { z } from 'zod/v4';
import { runParamsSchema } from '../schemas/runParamsSchema';

export type RunParams = z.infer<typeof runParamsSchema>;
