import type { ActionOptions } from '../types/ActionOptions';
import type { AwaitItActionHandler } from '../types/AwaitItActionHandler';

// Created through app.action(), which fills in the io type from the registered components.
export class Action<TIO> {
  readonly name: string | undefined;
  readonly description: string | undefined;
  readonly handler: AwaitItActionHandler<TIO>;

  constructor({ name, description, handler }: ActionOptions<TIO>) {
    this.name = name;
    this.description = description;
    this.handler = handler;
  }
}
