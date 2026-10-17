import { z } from 'zod';
import { runParamsSchema } from './runParamsSchema';

export const startRunRequestSchema = z.object({
  params: runParamsSchema.default({}),
});
