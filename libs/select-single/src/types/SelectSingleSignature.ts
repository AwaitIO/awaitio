import type { SelectSingleProps } from './SelectSingleProps';
import type { IOPromise } from 'awaitio';

// io.select.single, generic in the option: the handler gets the chosen option itself, a record or an enum member.
export type SelectSingleSignature = <TOption>(label: string, props: SelectSingleProps<TOption>) => IOPromise<TOption>;
