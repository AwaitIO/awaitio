import type { PageHandler } from './PageHandler';
import type { ActionDefinition } from '../shared/types/ActionDefinition';

export type RegisteredPage = ActionDefinition & {
  // The layout shape is checked where the page is defined (app.definePage); here it is the object built from the registry.
  handler: PageHandler<unknown>;
};
