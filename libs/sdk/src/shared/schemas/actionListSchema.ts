import { z } from 'zod/v4';
import { actionDefinitionSchema } from './actionDefinitionSchema';

export const actionListSchema = z.object({
  actions: z.array(actionDefinitionSchema),
  // Folders with an index page: slug = the folder, e.g. users for actions/users/index.ts.
  pages: z.array(actionDefinitionSchema),
});
