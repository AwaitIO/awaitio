import type { SelectSingleNativeProps } from './SelectSingleNativeProps';
import type { IOPromise } from 'awaitio';

// io.select.singleNative, generic in the option: the handler gets the chosen option itself, a record or an enum member.
export type SelectSingleNativeSignature = <TOption>(label: string, props: SelectSingleNativeProps<TOption>) => IOPromise<TOption>;
