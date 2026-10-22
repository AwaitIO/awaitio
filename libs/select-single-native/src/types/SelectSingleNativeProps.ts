import type { SelectOptionKey } from './SelectOptionKey';
import type { SelectOptionNaming } from './SelectOptionNaming';

// io.select.singleNative's props, typed by its options: `key` and `label` get one of them, the handler gets the chosen one.
export type SelectSingleNativeProps<TOption> = SelectOptionNaming<TOption> & {
  options: readonly TOption[];
  // The option chosen at the start: its key (an id is enough) or the option itself. A key that is not among the options
  // leaves nothing chosen and is reported on the server.
  defaultValue?: SelectOptionKey | TOption;
  helpText?: string;
  disabled?: boolean;
};
