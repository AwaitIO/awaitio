import { defineDisplay } from 'awaitio';
import { actionHref, actionRouteSchema, formatCellValue, Link, Table } from 'awaitio/ui';
import { z } from 'zod';
import { fillRouteParams } from './utils/fillRouteParams';

export const displayTable = defineDisplay({
  props: z.object({
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
    // Links in the "…" menu at the end of every row, e.g. changeRole.route({ params: { id: '{id}' } }).
    rowMenu: z.array(actionRouteSchema.extend({ label: z.string() })).optional(),
    pageSize: z.number().int().positive().default(20),
    filterable: z.boolean().default(true),
    emptyText: z.string().optional(),
  }),
  component: ({ props }) => {
    const columns = (props.columns ?? [...new Set(props.rows.flatMap((row) => Object.keys(row)))]).map((column) => {
      return typeof column === 'string' ? { key: column, label: column } : column;
    });

    const rows = props.rows.map((row) => {
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
        menu: (props.rowMenu ?? []).map((item) => {
          return { label: item.label, href: actionHref(fillRouteParams({ route: item, row })) };
        }),
      };
    });

    return <Table columns={columns} rows={rows} pageSize={props.pageSize} filterable={props.filterable} emptyText={props.emptyText} />;
  },
});
