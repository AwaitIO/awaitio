import type { TableColumnDefinition } from 'awaitio/ui';

// io.select.table's props, typed by the records in `data`: renderCell gets one of them as `row`.
export type SelectTableProps<TRow> = {
  data: TRow[];
  columns: TableColumnDefinition<TRow>[];
  // Records of `data` picked at the start; a record is recognised by its values.
  defaultValue?: TRow[];
  minSelections?: number;
  maxSelections?: number;
  pageSize?: number;
  emptyText?: string;
  helpText?: string;
  disabled?: boolean;
};
