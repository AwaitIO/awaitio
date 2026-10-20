import { tableCellSchema } from '../shared/schemas/tableCellSchema';
import type { tableColumnSchema } from '../shared/schemas/tableColumnSchema';
import type { z } from 'zod';

export type RenderTableRowsArgs = {
  data: Record<string, unknown>[];
  columns: z.output<typeof tableColumnSchema>[];
};

// Runs on the server inside a table's props schema: turns the records and the column definitions into the cells the
// browser gets, so neither renderCell nor the whole records travel there. Problems come back as messages for the schema.
export const renderTableRows = ({ data, columns }: RenderTableRowsArgs) => {
  const issues: string[] = [];
  const definitions = columns.map((column, index) => {
    const definition = typeof column === 'string' ? { label: column, accessorKey: column, renderCell: undefined } : column;

    if (!definition.accessorKey && !definition.renderCell) {
      issues.push(`column ${index + 1} (${definition.label}) needs an accessorKey or a renderCell`);
    }

    return definition;
  });

  const rows = data.map((row, rowIndex) => {
    return definitions.map((definition) => {
      try {
        const value = definition.renderCell ? definition.renderCell(row) : definition.accessorKey ? row[definition.accessorKey] : undefined;

        // An object with a label means to be a cell, so a typo such as highlightColor: 'lime' is an error, not JSON.
        if (typeof value !== 'object' || value === null || value instanceof Date || !('label' in value)) {
          return value;
        }

        const cell = tableCellSchema.safeParse(value);

        if (cell.success) {
          return cell.data;
        }

        issues.push(`row ${rowIndex + 1}, ${definition.label}: ${cell.error.issues[0]?.message ?? 'invalid cell'}`);
      } catch (error) {
        issues.push(`row ${rowIndex + 1}, ${definition.label}: ${error instanceof Error ? error.message : String(error)}`);
      }

      return undefined;
    });
  });

  return {
    columns: definitions.map((definition, index) => {
      return { key: String(index), label: definition.label };
    }),
    rows,
    issues,
  };
};
