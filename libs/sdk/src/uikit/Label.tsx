import { themeBlock } from './themeBlock';
import type { ReactNode } from 'react';

// The label of a form field; Field draws it, so a theme that replaces only Label changes every field.
export type LabelProps = {
  htmlFor?: string;
  children: ReactNode;
};

export const Label = themeBlock<LabelProps>('Label');
