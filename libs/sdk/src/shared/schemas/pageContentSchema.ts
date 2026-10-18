import { z } from 'zod';

// A served page: its layout with the display components in it, every props object already checked by its schema.
export const pageContentSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  layout: z.object({
    type: z.string(),
    props: z.unknown(),
    children: z.array(z.object({ type: z.string(), label: z.string(), props: z.unknown() })),
  }),
});
