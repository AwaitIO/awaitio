import { z } from 'zod/v4';

export const actionDefinitionSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string().nullable(),
});
