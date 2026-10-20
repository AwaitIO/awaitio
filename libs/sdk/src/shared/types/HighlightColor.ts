import type { highlightColorSchema } from '../schemas/highlightColorSchema';
import type { z } from 'zod';

export type HighlightColor = z.infer<typeof highlightColorSchema>;
