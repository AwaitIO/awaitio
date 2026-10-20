import { z } from 'zod';

// Generic on purpose: the props of each type are defined and checked by its component package.
// `type` is the component's key path in the registered tree, e.g. 'input.textarea'.
export const stepComponentSchema = z.object({
  type: z.string(),
  label: z.string(),
  props: z.record(z.unknown()),
  // The io call's `disabled`: the field is locked and the server keeps its starting value.
  disabled: z.boolean().optional(),
  // From .optional(): the field may stay empty and the handler gets undefined.
  optional: z.boolean().optional(),
  // A display component (io.display.*): drawn with its label as a heading, no answer.
  display: z.boolean().optional(),
});
