import type { SelectTableProps } from './SelectTableProps';
import type { IOPromise } from 'awaitio';

// io.select.table, generic in the row: renderCell knows its type and the handler gets the picked records of `data`.
export type SelectTableSignature = <TRow extends object>(label: string, props: SelectTableProps<TRow>) => IOPromise<TRow[]>;
