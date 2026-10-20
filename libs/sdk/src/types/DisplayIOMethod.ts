import type { DisplayDefinition } from './DisplayDefinition';
import type { IOPromise } from '../classes/IOPromise';
import type { z } from 'zod';

// A display component in an action: shows something in the step, on its own (with Continue) or in io.group next to
// inputs, and gives nothing back. The label is its heading, null for none.
export type DisplayIOMethod<TDefinition extends DisplayDefinition> = (
  label: string | null,
  ...props: Record<string, never> extends z.input<TDefinition['props']> ? [props?: z.input<TDefinition['props']>] : [props: z.input<TDefinition['props']>]
) => IOPromise<undefined>;
