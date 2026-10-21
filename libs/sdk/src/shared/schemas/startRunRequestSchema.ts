import { z } from 'zod/v4';
import { runParamsSchema } from './runParamsSchema';

export const startRunRequestSchema = z.object({
  params: runParamsSchema.default({}),
});
