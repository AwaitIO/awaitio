import { defineDisplay, withSignature } from 'awaitio';
import { actionHref, formatCellValue, renderTableRows, Table, TableCellView, tableColumnSchema } from 'awaitio/ui';
import { z } from 'zod';
import { rowMenuItemSchema } from './schemas/rowMenuItemSchema';
import type { DisplayTableSignature } from './types/DisplayTableSignature';

// Typed by DisplayTableSignature: the schema checks the props, the signature gives renderCell and rowMenuItems the row type.
export const displayTable = withSignature<DisplayTableSignature>()(
  defineDisplay({
    props: z
      .object({
        // Records as they come from the database; none is fine. They stay on the server, the browser gets only the cells.
        data: z.array(z.record(z.unknown())),
        // Required, because an empty table has no rows to read them from: a key, or { label, accessorKey?, renderCell? }.
        columns: z.array(tableColumnSchema),
        // Builds each row's "…" menu from the row, [] for none.
        rowMenuItems: z
          .custom<(row: Record<string, unknown>) => z.input<typeof rowMenuItemSchema>[]>((value) => {
            return typeof value === 'function';
          }, 'Expected a function of the row')
          .optional(),
        pageSize: z.number().int().positive().default(20),
        filterable: z.boolean().default(true),
        emptyText: z.string().optional(),
      })
      // renderCell and rowMenuItems cannot go to the browser, so they run here, once per row.
      .transform(({ data, columns, rowMenuItems, ...props }, ctx) => {
        const table = renderTableRows({ data, columns });

        table.issues.forEach((message) => {
          ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['columns'], message });
        });

        const rows = table.rows.map((cells, index) => {
          const row = data[index] ?? {};

          if (!rowMenuItems) {
            return { cells, menu: [] };
          }

          try {
            const menu = z.array(rowMenuItemSchema).safeParse(rowMenuItems(row));

            if (menu.success) {
              return { cells, menu: menu.data };
            }

            ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['rowMenuItems'], message: `row ${index + 1}: ${menu.error.issues[0]?.message ?? 'invalid menu'}` });
          } catch (error) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['rowMenuItems'], message: `row ${index + 1}: ${error instanceof Error ? error.message : String(error)}` });
          }

          return { cells, menu: [] };
        });

        return { ...props, columns: table.columns, rows };
      }),
    component: ({ props }) => {
      const rows = props.rows.map((row) => {
        return {
          cells: Object.fromEntries(
            props.columns.map((column, index) => {
              return [column.key, <TableCellView value={row.cells[index]} />];
            }),
          ),
          searchText: row.cells
            .map((cell) => {
              return formatCellValue(cell);
            })
            .join(' '),
          menu: row.menu.map((item) => {
            return { label: item.label, href: actionHref(item) };
          }),
        };
      });

      return <Table columns={props.columns} rows={rows} pageSize={props.pageSize} filterable={props.filterable} emptyText={props.emptyText} />;
    },
  }),
);
