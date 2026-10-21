import type { highlightColorSchema } from '../schemas/highlightColorSchema';
import type { z } from 'zod/v4';

export type HighlightColor = z.infer<typeof highlightColorSchema>;
