import { defineComponent } from 'awaitio';
import { formatCellValue, Table } from 'awaitio/ui';
import { z } from 'zod';
import { toRowKey } from './utils/toRowKey';

export const selectTable = defineComponent({
  props: z.object({
    // Records as they come from the database.
    rows: z.array(z.record(z.unknown())).min(1),
    // Which keys to show and how to call them; by default every key of the rows.
    columns: z.array(z.union([z.string(), z.object({ key: z.string(), label: z.string() })])).optional(),
    // Rows picked at the start, taken from `rows`; a row is recognised by its values.
    defaultValue: z.array(z.record(z.unknown())).optional(),
    // How many rows must and may be picked: by default exactly one.
    minSelections: z.number().int().nonnegative().default(1),
    maxSelections: z.number().int().positive().default(1),
    pageSize: z.number().int().positive().default(10),
    helpText: z.string().optional(),
  }),
  // The picked rows, as they were sent to the browser: plain JSON values, dates as ISO strings.
  returns: z.array(z.record(z.unknown())),
  initialValue: (props) => {
    return props.defaultValue ?? [];
  },
  validate: ({ label, props, value }) => {
    const offered = new Set(
      props.rows.map((row) => {
        return toRowKey({ row });
      }),
    );

    if (
      value.some((row) => {
        return !offered.has(toRowKey({ row }));
      })
    ) {
      return `${label}: pick rows from the table only.`;
    }

    if (value.length < props.minSelections) {
      return props.minSelections === 1 ? `${label}: pick a row.` : `${label}: pick at least ${props.minSelections} rows.`;
    }

    if (value.length > props.maxSelections) {
      return `${label}: pick at most ${props.maxSelections} ${props.maxSelections === 1 ? 'row' : 'rows'}.`;
    }

    return null;
  },
  component: ({ props, value, onChange, disabled }) => {
    const columns = (props.columns ?? [...new Set(props.rows.flatMap((row) => Object.keys(row)))]).map((column) => {
      return typeof column === 'string' ? { key: column, label: column } : column;
    });

    const selectedKeys = new Set(
      value.map((row) => {
        return toRowKey({ row });
      }),
    );

    const rows = props.rows.map((row, index) => {
      const texts = columns.map((column) => {
        return formatCellValue(row[column.key]);
      });

      return {
        id: index,
        cells: Object.fromEntries(
          columns.map((column, columnIndex) => {
            return [column.key, texts[columnIndex]];
          }),
        ),
        searchText: texts.join(' '),
      };
    });

    return (
      <Table
        columns={columns}
        rows={rows}
        pageSize={props.pageSize}
        selection={{
          mode: props.maxSelections === 1 ? 'single' : 'multiple',
          selected: props.rows.flatMap((row, index) => {
            return selectedKeys.has(toRowKey({ row })) ? [index] : [];
          }),
          onChange: (selected) => {
            // A pick past the limit is ignored, so the checkbox stays unticked instead of failing on Continue.
            if (props.maxSelections > 1 && selected.length > props.maxSelections) {
              return;
            }

            onChange(
              selected.map((index) => {
                return props.rows[index] ?? {};
              }),
            );
          },
          disabled,
        }}
      />
    );
  },
});
