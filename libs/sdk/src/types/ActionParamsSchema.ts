import type { z } from 'zod';

// Checks the query string an action was opened with; it gets an object of strings, so numbers need z.coerce.
export type ActionParamsSchema = z.ZodTypeAny;
