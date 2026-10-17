import { z } from 'zod';
import { stepSchema } from '../schemas/stepSchema';

export type Step = z.infer<typeof stepSchema>;
