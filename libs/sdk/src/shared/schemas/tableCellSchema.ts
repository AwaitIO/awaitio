import { z } from 'zod';
import { highlightColorSchema } from './highlightColorSchema';

// A table cell that is more than its value: { label, highlightColor } draws a colored label, { label, url } a link
// to a page outside AwaitIO. Plain values stay as they are.
export const tableCellSchema = z.object({
  label: z.union([z.string(), z.number()]),
  highlightColor: highlightColorSchema.optional(),
  url: z.string().url().optional(),
});
