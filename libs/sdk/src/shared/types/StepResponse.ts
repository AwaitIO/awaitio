import { z } from 'zod';
import { stepResponseSchema } from '../schemas/stepResponseSchema';

export type StepResponse = z.infer<typeof stepResponseSchema>;
