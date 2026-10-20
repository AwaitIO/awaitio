import { themeBlock } from './themeBlock';
import type { ReactNode } from 'react';

// Small secondary text under a control, e.g. the time zone of a date field.
export type HintProps = {
  children: ReactNode;
};

export const Hint = themeBlock<HintProps>('Hint');
