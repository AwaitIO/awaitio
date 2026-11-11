import type { ActionParamsSchema } from './ActionParamsSchema';
import type { PageHandler } from './PageHandler';

export type PageInit<TIO> = {
  name?: string;
  description?: string;
  unlisted?: boolean;
  order?: number;
  params?: ActionParamsSchema;
  // ctx.params is typed where the page is defined (app.definePage); here the handler accepts whatever its schema produced.
  handler: PageHandler<TIO, never>;
};
