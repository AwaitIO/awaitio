import { z } from 'zod/v4';
import { runStatusSchema } from '../schemas/runStatusSchema';

export type RunStatus = z.infer<typeof runStatusSchema>;
