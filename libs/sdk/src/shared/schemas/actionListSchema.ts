import { z } from 'zod';
import { actionDefinitionSchema } from './actionDefinitionSchema';

export const actionListSchema = z.object({
  actions: z.array(actionDefinitionSchema),
});
