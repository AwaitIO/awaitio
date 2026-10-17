import type { AwaitIOActionHandler } from './AwaitIOActionHandler';
import type { Action } from '../classes/Action';

// Key = action slug, order = order in the action list.
export type AwaitIORoutes<TIO> = Record<string, Action<TIO> | AwaitIOActionHandler<TIO>>;
