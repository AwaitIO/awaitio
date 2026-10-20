import type { Choice } from './ChoiceList';
import { themeBlock } from './themeBlock';

// Several of many options in one frame: a drop-down offering what is not chosen yet, and under it the chosen options,
// one per row, each with a button that removes it.
export type MultiSelectProps = {
  choices: Choice[];
  value: string[];
  onChange: (value: string[]) => void;
  // Shown in the drop-down, e.g. 'Add…'.
  placeholder?: string;
  // The drop-down stops offering more, e.g. when a limit is reached; chosen options can still be removed.
  isFull?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
};

export const MultiSelect = themeBlock<MultiSelectProps>('MultiSelect');
