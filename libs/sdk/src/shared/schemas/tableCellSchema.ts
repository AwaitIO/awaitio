import { z } from 'zod/v4';
import { actionRouteSchema } from './actionRouteSchema';
import { highlightColorSchema } from './highlightColorSchema';

// A table cell that is more than its value, e.g. what renderCell returns: { label, highlightColor } draws a colored
// label, { label, url } a link to a page outside AwaitIO, { label, route } a link to an action (action.route()).
// Plain values stay as they are.
export const tableCellSchema = z.object({
  label: z.union([z.string(), z.number()]),
  highlightColor: highlightColorSchema.optional(),
  url: z.string().url().optional(),
  route: actionRouteSchema.optional(),
});
