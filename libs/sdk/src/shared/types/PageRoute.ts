import { z } from 'zod/v4';
import { pageRouteSchema } from '../schemas/pageRouteSchema';

export type PageRoute = z.infer<typeof pageRouteSchema>;
