import { z } from 'zod';

export const runStatusSchema = z.enum(['RUNNING', 'SUCCESS', 'FAILURE', 'CANCELED']);
