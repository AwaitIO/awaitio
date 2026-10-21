import { z } from 'zod/v4';

// A link to an action: what action.route() returns, what ctx.redirect() takes and what a table's row menu lists.
export const actionRouteSchema = z.object({
  // What a link or menu item shows; ctx.redirect() leaves it out.
  label: z.string().optional(),
  // The action's slug, e.g. 'accounts/update_account'.
  action: z.string(),
  // Becomes the action's ctx.params.
  params: z.record(z.string(), z.string()).optional(),
});
