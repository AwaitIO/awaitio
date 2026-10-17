import { z } from 'zod';

export const actionDefinitionSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string().nullable(),
});
