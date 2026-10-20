import { themeBlock } from './themeBlock';

// A checkbox for a yes or no answer with a line of text beside it. Field draws the label above and the error under it,
// as for every other control.
export type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  // What checking the box means, shown to its right; clicking it toggles the box too.
  text: string;
  disabled?: boolean;
  autoFocus?: boolean;
};

export const Checkbox = themeBlock<CheckboxProps>('Checkbox');
