import type { DisplayTableProps } from './DisplayTableProps';
import type { DisplayElement, IOPromise } from 'awaitio';

// io.display.table in an action and in a page, generic in the row so that renderCell and rowMenuItems know its type.
export type DisplayTableSignature = {
  action: <TRow extends object>(label: string | null, props: DisplayTableProps<TRow>) => IOPromise<undefined>;
  page: <TRow extends object>(label: string | null, props: DisplayTableProps<TRow>) => DisplayElement;
};
