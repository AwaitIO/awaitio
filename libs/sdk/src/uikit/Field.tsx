import { themeBlock } from './themeBlock';
import type { ReactNode } from 'react';

// Label, control, help text and error of one form field. The SDK wraps every component in it unless the component
// sets `wrap: false`; a component drawing its own layout can use it directly too. It gives the control its id through
// FieldContext (useFieldId).
export type FieldProps = {
  label: string;
  helpText?: string;
  // What is wrong with the value, shown under the control.
  error?: string | null;
  children: ReactNode;
};

export const Field = themeBlock<FieldProps>('Field');
