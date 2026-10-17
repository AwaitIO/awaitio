import type { AwaitItActionHandler } from './AwaitItActionHandler';
import type { Action } from '../classes/Action';

// Key = action slug, order = order in the action list.
export type AwaitItRoutes<TIO> = Record<string, Action<TIO> | AwaitItActionHandler<TIO>>;
