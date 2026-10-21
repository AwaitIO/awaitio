import type { z } from 'zod/v4';

// Any zod schema, as z.ZodTypeAny was in zod 3. zod 4's plain z.ZodType has unknown input and output, and a concrete
// definition (props of a text input) would not fit the generic one stored in a ComponentTree.
export type AnySchema = z.ZodType<any, any>;
