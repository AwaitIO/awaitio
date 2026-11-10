import { z } from 'zod/v4';
import { actionDefinitionSchema } from './actionDefinitionSchema';
import { pageDefinitionSchema } from './pageDefinitionSchema';

export const actionListSchema = z.object({
  actions: z.array(actionDefinitionSchema),
  // Folders with an index page, unlisted ones too: the folder still shows its page when opened by its URL.
  pages: z.array(pageDefinitionSchema),
});
