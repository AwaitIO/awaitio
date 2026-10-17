import { z } from 'zod';
import { loadingStateSchema } from '../schemas/loadingStateSchema';

export type LoadingState = z.infer<typeof loadingStateSchema>;
