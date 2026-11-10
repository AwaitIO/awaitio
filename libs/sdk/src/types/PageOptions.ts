import type { ActionParamsOf } from './ActionParamsOf';
import type { ActionParamsSchema } from './ActionParamsSchema';
import type { PageHandler } from './PageHandler';

export type PageOptions<TIO, TSchema extends ActionParamsSchema | undefined = undefined> = {
  // Shown as the page's title. Defaults to the folder's name in words.
  name?: string;
  description?: string;
  // The query string the page expects, e.g. z.object({ role: z.enum(['admin', 'member']).optional() }); a link that
  // does not match shows an error instead of the page, and ctx.params gets the parsed value.
  params?: TSchema;
  handler: PageHandler<TIO, ActionParamsOf<TSchema>>;
};
