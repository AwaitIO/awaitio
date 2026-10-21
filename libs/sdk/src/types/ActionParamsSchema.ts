import type { AnySchema } from './AnySchema';

// Checks the query string an action was opened with; it gets an object of strings, so numbers need z.coerce.
export type ActionParamsSchema = AnySchema;
