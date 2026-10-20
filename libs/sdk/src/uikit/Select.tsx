import type { Choice } from './ChoiceList';
import { themeBlock } from './themeBlock';

// A drop-down for one of many options.
export type SelectProps = {
  choices: Choice[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
};

export const Select = themeBlock<SelectProps>('Select');
