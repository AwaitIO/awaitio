import type { Choice } from './ChoiceList';
import { themeBlock } from './themeBlock';

// The browser's own drop-down for one of many options: no search and no clearing, for short lists.
export type NativeSelectProps = {
  choices: Choice[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
};

export const NativeSelect = themeBlock<NativeSelectProps>('NativeSelect');
