import type { ActionParamsSchema } from './ActionParamsSchema';
import type { AwaitIOActionHandler } from './AwaitIOActionHandler';

export type ActionInit<TIO> = {
  name: string;
  description?: string;
  unlisted?: boolean;
  params?: ActionParamsSchema;
  // ctx.params is typed where the action is defined (app.action); here the handler accepts whatever its schema produced.
  handler: AwaitIOActionHandler<TIO, never>;
};
