import type { AwaitItActionHandler } from './AwaitItActionHandler';
import type { ActionDefinition } from '../shared/types/ActionDefinition';

export type RegisteredAction = ActionDefinition & {
  // The io shape is checked where the action is defined (app.action); at run time it is just built from the registry.
  handler: AwaitItActionHandler<unknown>;
};
