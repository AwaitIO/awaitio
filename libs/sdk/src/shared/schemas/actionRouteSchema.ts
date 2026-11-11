import { z } from 'zod/v4';

// A link to an action: what action.route() returns. ctx.redirect(), table cells, a table's row menu and a layout's menu
// items take it, or a page's route (routeSchema).
export const actionRouteSchema = z.object({
  // What a link or menu item shows; ctx.redirect() leaves it out.
  label: z.string().optional(),
  // The action's slug, e.g. 'accounts/update_account'.
  action: z.string(),
  // Becomes the action's ctx.params.
  params: z.record(z.string(), z.string()).optional(),
});
