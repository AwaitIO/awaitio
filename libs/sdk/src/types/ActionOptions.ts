import type { ActionParamsOf } from './ActionParamsOf';
import type { ActionParamsSchema } from './ActionParamsSchema';
import type { AwaitIOActionHandler } from './AwaitIOActionHandler';

export type ActionOptions<TIO, TSchema extends ActionParamsSchema | undefined = undefined> = {
  // Shown in the action list and on the run page. Required: a file name is not a name people read.
  name: string;
  description?: string;
  // Left out of the action list and the folder's column; it still runs from a link, ctx.redirect() or a table's row
  // menu, e.g. an edit screen that only makes sense for one record.
  unlisted?: boolean;
  // The query string the action expects, e.g. z.object({ id: z.string() }); a link that does not match is refused
  // before the handler runs, and ctx.params gets the parsed value.
  params?: TSchema;
  handler: AwaitIOActionHandler<TIO, ActionParamsOf<TSchema>>;
};
