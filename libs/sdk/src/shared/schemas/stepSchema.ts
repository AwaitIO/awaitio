import { z } from 'zod/v4';
import { stepComponentSchema } from './stepComponentSchema';

// One screen of a run: everything the handler awaited at once.
export const stepSchema = z.object({
  stepId: z.string(),
  // Position of the step in its run, from 1.
  index: z.number().int().positive(),
  components: z.array(stepComponentSchema),
  // One entry per component: what is wrong with its value, or null.
  errors: z.array(z.string().nullable()),
  // A problem with the step as a whole, not with one field.
  message: z.string().nullable(),
});
