import { z } from 'zod';

export const actionResultSchema = z.discriminatedUnion('status', [
  z.object({
    status: z.literal('SUCCESS'),
    data: z.unknown(),
  }),
  z.object({
    status: z.literal('FAILURE'),
    error: z.string(),
    message: z.string(),
  }),
]);
