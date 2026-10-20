import { themeBlock } from './themeBlock';
import type { InputHTMLAttributes } from 'react';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'className' | 'id'> & {
  value: string;
  onChange: (value: string) => void;
};

export const Input = themeBlock<InputProps>('Input');
