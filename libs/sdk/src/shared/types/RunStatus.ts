import { z } from 'zod';
import { runStatusSchema } from '../schemas/runStatusSchema';

export type RunStatus = z.infer<typeof runStatusSchema>;
