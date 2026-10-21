import type { tableCellSchema } from '../schemas/tableCellSchema';
import type { z } from 'zod/v4';

export type TableCell = z.infer<typeof tableCellSchema>;
