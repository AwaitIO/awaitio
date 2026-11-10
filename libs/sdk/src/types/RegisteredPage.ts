import type { ActionParamsSchema } from './ActionParamsSchema';
import type { PageHandler } from './PageHandler';
import type { ActionDefinition } from '../shared/types/ActionDefinition';

export type RegisteredPage = ActionDefinition & {
  // The layout shape and ctx.params are checked where the page is defined (app.definePage); here it is the object built from the registry.
  handler: PageHandler<unknown, unknown>;
  params: ActionParamsSchema | null;
};
