import type { AnySchema } from './AnySchema';
import type { ComponentToValueArgs } from './ComponentToValueArgs';
import type { ComponentValidateArgs } from './ComponentValidateArgs';
import type { ComponentUiProps } from '../client/types/ComponentUiProps';
import type { ComponentType } from 'react';
import type { z } from 'zod/v4';

// One io component, written in a single .tsx file with defineComponent(). The same definition runs on the server
// (props, returns, validate) and, built by `awaitio/vite`, in the browser (component, initialValue).
export type ComponentDefinition<TProps extends AnySchema = AnySchema, TReturns extends AnySchema = AnySchema> = {
  kind: 'awaitio-component';
  props: TProps;
  // Parses the value the browser sends. May transform it (an ISO string into a DateTime); the handler gets the output.
  returns: TReturns;
  // Server-side check after `returns` parsed the value. Returns a message for the user, or null when fine.
  // Method syntax on purpose: it keeps a concrete definition assignable to the generic one stored in a ComponentTree.
  validate?(args: ComponentValidateArgs<z.output<TProps>, z.output<TReturns>>): string | null;
  // Turns the checked answer into what the handler gets, on the server, with the props as the handler passed them, e.g.
  // the indexes of picked table rows into those rows. Without it the handler gets the answer as `returns` parsed it.
  toValue?(args: ComponentToValueArgs<z.input<TProps>, z.output<TReturns>>): unknown;
  // The value the form starts with, before the user touches the control.
  initialValue?(props: z.output<TProps>): z.input<TReturns>;
  // Only the control; the SDK wraps it in a Field (label, help text) unless `wrap` is false.
  component: ComponentType<ComponentUiProps<z.output<TProps>, z.input<TReturns>>>;
  wrap?: boolean;
  // False when the component sends the step itself with submit(), e.g. Confirm and Cancel buttons; the step shows no
  // Continue button then.
  submitButton?: boolean;
  // Folder of the file that called defineComponent; `awaitio/vite` builds the browser script into <folder>/ui/ui.js.
  // Filled in by defineComponent on the server, null in the browser build.
  uiDirectory: string | null;
  // Type only, set by withSignature(): a hand-written io method for props a schema cannot type, e.g. a table whose row
  // type comes from its `data`. Without it the method is typed from `props` and `returns`.
  signature?: unknown;
};
