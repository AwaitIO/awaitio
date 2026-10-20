import { z } from 'zod';

// Checks a column of a table's props; TableColumnDefinition<TRow> is its typed form. renderCell only has to be a function
// here: it runs on the server, row by row, and what it returns is checked as a cell.
export const tableColumnSchema = z.union([
  z.string(),
  z.object({
    label: z.string(),
    accessorKey: z.string().optional(),
    renderCell: z
      .custom<(row: Record<string, unknown>) => unknown>((value) => {
        return typeof value === 'function';
      }, 'Expected a function of the row')
      .optional(),
  }),
]);
