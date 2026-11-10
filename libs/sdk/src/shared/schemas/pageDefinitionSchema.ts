import { z } from 'zod/v4';
import { actionDefinitionSchema } from './actionDefinitionSchema';

// A folder with an index page, as the action list sends it: slug = the folder, e.g. users for actions/users/index.ts.
export const pageDefinitionSchema = actionDefinitionSchema.extend({
  // The page does not put its folder into the navigation; it still opens from its URL and ctx.redirect().
  unlisted: z.boolean(),
});
