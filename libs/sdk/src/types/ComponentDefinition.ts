import type { ComponentValidateArgs } from './ComponentValidateArgs';
import type { ComponentUiProps } from '../client/types/ComponentUiProps';
import type { ComponentType } from 'react';
import type { z } from 'zod';

// One io component, written in a single .tsx file with defineComponent(). The same definition runs on the server
// (props, returns, validate) and, built by `awaitit/vite`, in the browser (component, initialValue).
export type ComponentDefinition<TProps extends z.ZodTypeAny = z.ZodTypeAny, TReturns extends z.ZodTypeAny = z.ZodTypeAny> = {
  kind: 'awaitit-component';
  props: TProps;
  // Parses the value the browser sends. May transform it (an ISO string into a DateTime); the handler gets the output.
  returns: TReturns;
  // Server-side check after `returns` parsed the value. Returns a message for the user, or null when fine.
  // Method syntax on purpose: it keeps a concrete definition assignable to the generic one stored in a ComponentTree.
  validate?(args: ComponentValidateArgs<z.output<TProps>, z.output<TReturns>>): string | null;
  // The value the form starts with, before the user touches the control.
  initialValue?(props: z.output<TProps>): z.input<TReturns>;
  // Only the control; the SDK wraps it in a Field (label, help text) unless `wrap` is false.
  component: ComponentType<ComponentUiProps<z.output<TProps>, z.input<TReturns>>>;
  wrap?: boolean;
  // Folder of the file that called defineComponent; `awaitit/vite` builds the browser script into <folder>/ui/ui.js.
  // Filled in by defineComponent on the server, null in the browser build.
  uiDirectory: string | null;
};
