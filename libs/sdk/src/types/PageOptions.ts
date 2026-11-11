import type { ActionParamsOf } from './ActionParamsOf';
import type { ActionParamsSchema } from './ActionParamsSchema';
import type { PageHandler } from './PageHandler';

export type PageOptions<TIO, TSchema extends ActionParamsSchema | undefined = undefined> = {
  // Shown as the page's title. Defaults to the folder's name in words.
  name?: string;
  description?: string;
  // Does not put its folder into the navigation (a tab or a folder card); the page still opens from its URL and
  // ctx.redirect(), e.g. a detail of one record. A folder with listed actions is still shown for them.
  unlisted?: boolean;
  // Where the page's folder stands among its sibling folders, as a tab or in the folder's column: lower first, e.g.
  // order: 1. Folders without an order follow, alphabetical by name.
  order?: number;
  // The query string the page expects, e.g. z.object({ role: z.enum(['admin', 'member']).optional() }); a link that
  // does not match shows an error instead of the page, and ctx.params gets the parsed value.
  params?: TSchema;
  handler: PageHandler<TIO, ActionParamsOf<TSchema>>;
};
