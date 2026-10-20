import { z } from 'zod';

export const loadingStateSchema = z.object({
  label: z.string(),
  description: z.string().nullable(),
  // With itemsInQueue the page shows a progress bar: itemsCompleted of itemsInQueue.
  itemsInQueue: z.number().int().nonnegative().nullable(),
  itemsCompleted: z.number().int().nonnegative(),
});
