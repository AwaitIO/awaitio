import { themeBlock } from './themeBlock';
import type { ReactNode } from 'react';

// Buttons side by side, e.g. Confirm and Cancel of io.confirm.
export type ButtonRowProps = {
  children: ReactNode;
};

export const ButtonRow = themeBlock<ButtonRowProps>('ButtonRow');
