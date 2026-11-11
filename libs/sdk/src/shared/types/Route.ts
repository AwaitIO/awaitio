import type { routeSchema } from '../schemas/routeSchema';
import type { z } from 'zod/v4';

export type Route = z.infer<typeof routeSchema>;
