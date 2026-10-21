import { z } from 'zod/v4';
import { loadingStateSchema } from '../schemas/loadingStateSchema';

export type LoadingState = z.infer<typeof loadingStateSchema>;
