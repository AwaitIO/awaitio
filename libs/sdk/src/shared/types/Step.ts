import { z } from 'zod/v4';
import { stepSchema } from '../schemas/stepSchema';

export type Step = z.infer<typeof stepSchema>;
