import type { Choice } from './ChoiceList';
import { themeBlock } from './themeBlock';

// A searchable drop-down for one of many options.
export type SelectProps = {
  choices: Choice[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  // Shows a × that empties the field, onChange('').
  clearable?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
};

export const Select = themeBlock<SelectProps>('Select');
