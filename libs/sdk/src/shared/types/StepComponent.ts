import { z } from 'zod';
import { stepComponentSchema } from '../schemas/stepComponentSchema';

export type StepComponent = z.infer<typeof stepComponentSchema>;
