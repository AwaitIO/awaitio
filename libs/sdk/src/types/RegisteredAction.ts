import type { ActionParamsSchema } from './ActionParamsSchema';
import type { AwaitIOActionHandler } from './AwaitIOActionHandler';
import type { ActionDefinition } from '../shared/types/ActionDefinition';

export type RegisteredAction = ActionDefinition & {
  // The io shape is checked where the action is defined (app.action); at run time it is just built from the registry.
  handler: AwaitIOActionHandler<unknown, unknown>;
  params: ActionParamsSchema | null;
  // Runs from a link but is not in the action list.
  unlisted: boolean;
};
