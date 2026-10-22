import type { SelectOptionKey } from './SelectOptionKey';

// Strings, numbers and { value, label } objects name themselves; any other record needs `key` and `label`.
// Wrapped in a tuple so a union of string literals (an enum) is not split into one branch per member.
export type SelectOptionNaming<TOption> = [TOption] extends [string | number] | [{ value: SelectOptionKey; label: string }]
  ? { key?: (option: TOption) => SelectOptionKey; label?: (option: TOption) => string }
  : { key: (option: TOption) => SelectOptionKey; label: (option: TOption) => string };
