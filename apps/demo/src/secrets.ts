/* eslint-disable no-process-env */
import { z } from 'zod/v4';

// The only place that reads process.env.
export const secrets = z
  .object({
    SESSION_SECRET: z.string().min(32),
    PORT: z.coerce.number().int().default(3000),
    HOST: z.string().default('127.0.0.1'),
  })
  .parse(process.env);
