import { z } from 'zod/v4';
import { stepComponentSchema } from '../schemas/stepComponentSchema';

export type StepComponent = z.infer<typeof stepComponentSchema>;
