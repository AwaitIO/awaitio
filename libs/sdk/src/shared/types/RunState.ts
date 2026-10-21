import { z } from 'zod/v4';
import { runStateSchema } from '../schemas/runStateSchema';

export type RunState = z.infer<typeof runStateSchema>;
