import { z } from 'zod/v4';
import { actionRouteSchema } from '../schemas/actionRouteSchema';

export type ActionRoute = z.infer<typeof actionRouteSchema>;
