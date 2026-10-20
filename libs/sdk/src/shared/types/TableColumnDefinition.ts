import type { TableCellValue } from './TableCellValue';

// One column of io.display.table or io.select.table, as in Interval: a key of the row (its label is the key), or a
// label with the key to show and/or renderCell, which builds the cell from the whole row on the server.
export type TableColumnDefinition<TRow> =
  | (keyof TRow & string)
  | {
      label: string;
      accessorKey?: keyof TRow & string;
      renderCell?: (row: TRow) => TableCellValue;
    };
