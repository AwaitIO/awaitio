import type { SelectMultipleProps } from './SelectMultipleProps';
import type { IOPromise } from 'awaitio';

// io.select.multiple, generic in the option: the handler gets the chosen options themselves, records or enum members.
export type SelectMultipleSignature = <TOption>(label: string, props: SelectMultipleProps<TOption>) => IOPromise<TOption[]>;
