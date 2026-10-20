import { z } from 'zod';
import { actionRouteSchema } from '../schemas/actionRouteSchema';

export type ActionRoute = z.infer<typeof actionRouteSchema>;
