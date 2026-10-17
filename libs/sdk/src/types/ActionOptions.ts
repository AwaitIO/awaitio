import type { AwaitItActionHandler } from './AwaitItActionHandler';

export type ActionOptions<TIO> = {
  // Shown in the action list. Defaults to the route key turned into words ("full_name" -> "Full name").
  name?: string;
  description?: string;
  handler: AwaitItActionHandler<TIO>;
};
