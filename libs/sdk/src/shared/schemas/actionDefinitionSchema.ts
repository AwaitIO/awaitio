import { z } from 'zod/v4';

export const actionDefinitionSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  // Lower first among its siblings; null keeps the alphabetical order, after the ones with a number.
  order: z.number().nullable(),
});
