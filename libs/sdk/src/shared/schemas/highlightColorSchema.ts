import { z } from 'zod';

// The colors a table cell's label can be highlighted with, the same as in Interval.
export const highlightColorSchema = z.enum(['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'gray']);
