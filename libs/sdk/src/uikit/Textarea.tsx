import { themeBlock } from './themeBlock';
import type { TextareaHTMLAttributes } from 'react';

export type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange' | 'className' | 'id'> & {
  value: string;
  onChange: (value: string) => void;
};

export const Textarea = themeBlock<TextareaProps>('Textarea');
