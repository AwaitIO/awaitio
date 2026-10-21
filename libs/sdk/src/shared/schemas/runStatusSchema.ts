import { z } from 'zod/v4';

export const runStatusSchema = z.enum(['RUNNING', 'SUCCESS', 'FAILURE', 'CANCELED', 'REDIRECTED']);
