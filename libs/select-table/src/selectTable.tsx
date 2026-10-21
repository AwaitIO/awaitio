import { defineComponent, withSignature } from 'awaitio';
import { formatCellValue, renderTableRows, Table, TableCellView, tableColumnSchema } from 'awaitio/ui';
import { z } from 'zod/v4';
import type { SelectTableSignature } from './types/SelectTableSignature';
import { toRowKey } from './utils/toRowKey';

// A record as the handler passed it: checked to be an object, but not copied.
const recordSchema = z.custom<Record<string, unknown>>((value) => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}, 'Expected a record');

// Typed by SelectTableSignature: the schema checks the props, the signature gives renderCell the row type and the
// handler the picked records.
export const selectTable = withSignature<SelectTableSignature>()(
  defineComponent({
    props: z
      .object({
        // Records as they come from the database; none is fine, e.g. an account without devices. They stay on the server,
        // the browser gets only the cells and answers with the indexes of the picked rows.
        // Kept by reference (no copies), so defaultValue can name records of `data` by identity.
        data: z.array(recordSchema),
        // Required, because an empty table has no rows to read them from: a key, or { label, accessorKey?, renderCell? }.
        columns: z.array(tableColumnSchema),
        // Records of `data` picked at the start: the same objects, or copies with the same values.
        defaultValue: z.array(recordSchema).optional(),
        // How many rows must and may be picked: by default exactly one.
        minSelections: z.number().int().nonnegative().default(1),
        maxSelections: z.number().int().positive().default(1),
        pageSize: z.number().int().positive().default(10),
        // Shown instead of the table when there are no rows, e.g. 'No devices on this account.'
        emptyText: z.string().optional(),
        helpText: z.string().optional(),
      })
      // renderCell cannot go to the browser, so it runs here, once per row.
      .transform(({ data, columns, defaultValue, ...props }, ctx) => {
        const table = renderTableRows({ data, columns });

        table.issues.forEach((message) => {
          ctx.addIssue({ code: 'custom', path: ['columns'], message });
        });

        const selected = (defaultValue ?? []).flatMap((picked) => {
          const sameObject = data.indexOf(picked);
          const index =
            sameObject !== -1
              ? sameObject
              : data.findIndex((row) => {
                  return toRowKey({ row }) === toRowKey({ row: picked });
                });

          return index === -1 ? [] : [index];
        });

        return { ...props, columns: table.columns, rows: table.rows, selected };
      }),
    // The indexes of the picked rows; the handler gets the records themselves, see toValue.
    returns: z.array(z.number().int().nonnegative()),
    initialValue: (props) => {
      return props.selected;
    },
    validate: ({ label, props, value }) => {
      if (
        new Set(value).size !== value.length ||
        value.some((index) => {
          return index >= props.rows.length;
        })
      ) {
        return `${label}: pick rows from the table only.`;
      }

      // A table with fewer rows than the minimum cannot be answered otherwise, so all of them are enough, none for an empty one.
      const minSelections = Math.min(props.minSelections, props.rows.length);

      if (value.length < minSelections) {
        return minSelections === 1 ? `${label}: pick a row.` : `${label}: pick at least ${minSelections} rows.`;
      }

      if (value.length > props.maxSelections) {
        return `${label}: pick at most ${props.maxSelections} ${props.maxSelections === 1 ? 'row' : 'rows'}.`;
      }

      return null;
    },
    // The original records, Dates and nested objects included, in the order they were picked.
    toValue: ({ props, value }) => {
      return value.map((index) => {
        return props.data[index];
      });
    },
    component: ({ props, value, onChange, disabled }) => {
      const rows = props.rows.map((cells, index) => {
        return {
          id: index,
          cells: Object.fromEntries(
            props.columns.map((column, columnIndex) => {
              return [column.key, <TableCellView value={cells[columnIndex]} />];
            }),
          ),
          searchText: cells
            .map((cell) => {
              return formatCellValue(cell);
            })
            .join(' '),
        };
      });

      return (
        <Table
          columns={props.columns}
          rows={rows}
          pageSize={props.pageSize}
          emptyText={props.emptyText}
          selection={{
            mode: props.maxSelections === 1 ? 'single' : 'multiple',
            selected: value,
            onChange: (selected) => {
              // A pick past the limit is ignored, so the checkbox stays unticked instead of failing on Continue.
              if (props.maxSelections > 1 && selected.length > props.maxSelections) {
                return;
              }

              onChange(selected);
            },
            disabled,
          }}
        />
      );
    },
  }),
);
