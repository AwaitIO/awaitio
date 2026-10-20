import type { SelectOptionKey } from './SelectOptionKey';
import type { SelectOptionNaming } from './SelectOptionNaming';

// io.select.multiple's props, typed by its options: `key` and `label` get one of them, the handler gets the chosen ones.
export type SelectMultipleProps<TOption> = SelectOptionNaming<TOption> & {
  options: readonly TOption[];
  // The options chosen at the start: their keys (ids are enough) or the options themselves. Keys that are not among the
  // options are left out and reported on the server.
  defaultValue?: readonly (SelectOptionKey | TOption)[];
  minSelections?: number;
  maxSelections?: number;
  helpText?: string;
  disabled?: boolean;
};
