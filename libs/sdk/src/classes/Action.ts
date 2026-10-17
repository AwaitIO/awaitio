import type { ActionOptions } from '../types/ActionOptions';
import type { AwaitIOActionHandler } from '../types/AwaitIOActionHandler';

// Created through app.action(), which fills in the io type from the registered components.
export class Action<TIO> {
  readonly name: string | undefined;
  readonly description: string | undefined;
  readonly handler: AwaitIOActionHandler<TIO>;

  constructor({ name, description, handler }: ActionOptions<TIO>) {
    this.name = name;
    this.description = description;
    this.handler = handler;
  }
}
