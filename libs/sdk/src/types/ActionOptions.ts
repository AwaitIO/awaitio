import type { ActionParamsOf } from './ActionParamsOf';
import type { ActionParamsSchema } from './ActionParamsSchema';
import type { AwaitIOActionHandler } from './AwaitIOActionHandler';

export type ActionOptions<TIO, TSchema extends ActionParamsSchema | undefined = undefined> = {
  // Shown in the action list and on the run page. Required: a file name is not a name people read.
  name: string;
  description?: string;
  // The query string the action expects, e.g. z.object({ id: z.string() }); a link that does not match is refused
  // before the handler runs, and ctx.params gets the parsed value.
  params?: TSchema;
  handler: AwaitIOActionHandler<TIO, ActionParamsOf<TSchema>>;
};
