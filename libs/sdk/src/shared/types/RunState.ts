import { z } from 'zod';
import { runStateSchema } from '../schemas/runStateSchema';

export type RunState = z.infer<typeof runStateSchema>;
