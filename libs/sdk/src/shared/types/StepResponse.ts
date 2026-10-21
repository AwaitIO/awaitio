import { z } from 'zod/v4';
import { stepResponseSchema } from '../schemas/stepResponseSchema';

export type StepResponse = z.infer<typeof stepResponseSchema>;
