import { z } from 'zod/v4';

// A link to a folder's page: what page.route() returns. It goes wherever an action's route does (routeSchema).
export const pageRouteSchema = z.object({
  // What a link shows; ctx.redirect() leaves it out.
  label: z.string().optional(),
  // The folder the page stands for, e.g. 'users'.
  page: z.string(),
  // Becomes the page's ctx.params.
  params: z.record(z.string(), z.string()).optional(),
});
