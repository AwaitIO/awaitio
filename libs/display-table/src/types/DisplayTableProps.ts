import type { Route, TableColumnDefinition } from 'awaitio/ui';

// io.display.table's props, typed by the records in `data`: renderCell and rowMenuItems get one of them as `row`.
export type DisplayTableProps<TRow> = {
  data: TRow[];
  columns: TableColumnDefinition<TRow>[];
  // The links in the "…" menu at the end of a row, to actions or pages, e.g. [changeRole.route({ params: { id: row.id } })];
  // [] for none.
  rowMenuItems?: (row: TRow) => Route[];
  pageSize?: number;
  filterable?: boolean;
  emptyText?: string;
};
