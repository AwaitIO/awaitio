import type { tableCellSchema } from '../schemas/tableCellSchema';
import type { z } from 'zod';

export type TableCell = z.infer<typeof tableCellSchema>;
