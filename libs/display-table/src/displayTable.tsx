import { defineDisplay } from 'awaitio';
import { actionHref, actionRouteSchema, formatCellValue, Link, Table } from 'awaitio/ui';
import { z } from 'zod';
import { rowMenuItemSchema } from './schemas/rowMenuItemSchema';
import { fillRouteParams } from './utils/fillRouteParams';

export const displayTable = defineDisplay({
  props: z
    .object({
      // Which keys to show and how to call them; by default every key of the rows, in the order they first appear.
      columns: z
        .array(
          z.union([
            z.string(),
            // `route` makes the cells links; its params may use '{key}' for that key of the row: { id: '{id}' }.
            z.object({ key: z.string(), label: z.string(), route: actionRouteSchema.optional() }),
          ]),
        )
        .optional(),
      // Records as they come from the database; keys not shown as columns can still fill a link's params.
      rows: z.array(z.record(z.unknown())),
      // Links in the "…" menu at the end of every row: one menu for all rows, e.g. changeRole.route({ params: { id: '{id}' } }),
      // or a function that builds each row's own menu from the row, [] for none.
      rowMenu: z
        .union([
          z.array(rowMenuItemSchema),
          z.custom<(row: Record<string, unknown>) => z.input<typeof rowMenuItemSchema>[]>((value) => {
            return typeof value === 'function';
          }, 'Expected an array of links or a function of the row'),
        ])
        .optional(),
      pageSize: z.number().int().positive().default(20),
      filterable: z.boolean().default(true),
      emptyText: z.string().optional(),
    })
    // A function cannot go to the browser, so it runs here, once per row, and the browser gets each row's finished menu.
    .transform(({ rowMenu, ...props }, ctx) => {
      if (typeof rowMenu !== 'function') {
        return { ...props, rowMenu, rowMenus: undefined };
      }

      const rowMenus = props.rows.map((row, index) => {
        try {
          const items = z.array(rowMenuItemSchema).safeParse(rowMenu(row));

          if (items.success) {
            return items.data;
          }

          ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['rowMenu'], message: `row ${index + 1}: ${items.error.issues[0]?.message ?? 'invalid menu'}` });
        } catch (error) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['rowMenu'], message: `row ${index + 1}: ${error instanceof Error ? error.message : String(error)}` });
        }

        return [];
      });

      return { ...props, rowMenu: undefined, rowMenus };
    }),
  component: ({ props }) => {
    const columns = (props.columns ?? [...new Set(props.rows.flatMap((row) => Object.keys(row)))]).map((column) => {
      return typeof column === 'string' ? { key: column, label: column } : column;
    });

    const rows = props.rows.map((row, rowIndex) => {
      const texts = columns.map((column) => {
        return formatCellValue(row[column.key]);
      });

      return {
        cells: Object.fromEntries(
          columns.map((column, index) => {
            const text = texts[index];

            return [column.key, 'route' in column && column.route ? <Link href={actionHref(fillRouteParams({ route: column.route, row }))}>{text}</Link> : text];
          }),
        ),
        searchText: texts.join(' '),
        // A menu built by a function already holds the row's values; only the shared menu fills '{key}' templates.
        menu: props.rowMenus
          ? (props.rowMenus[rowIndex] ?? []).map((item) => {
              return { label: item.label, href: actionHref(item) };
            })
          : (props.rowMenu ?? []).map((item) => {
              return { label: item.label, href: actionHref(fillRouteParams({ route: item, row })) };
            }),
      };
    });

    return <Table columns={columns} rows={rows} pageSize={props.pageSize} filterable={props.filterable} emptyText={props.emptyText} />;
  },
});
