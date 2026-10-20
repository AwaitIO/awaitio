import { themeBlock } from './themeBlock';

export type Choice = {
  value: string;
  label: string;
  description?: string;
};

// Options as a list of cards to pick from, for a short list; a long one reads better as a Select.
export type ChoiceListProps = {
  choices: Choice[];
  // Radio buttons for one choice, checkboxes for several.
  mode: 'single' | 'multiple';
  // The chosen values; one at most in single mode.
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
};

export const ChoiceList = themeBlock<ChoiceListProps>('ChoiceList');
