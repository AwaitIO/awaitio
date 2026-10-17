import type { ActionInit } from '../types/ActionInit';
import type { ActionParamsSchema } from '../types/ActionParamsSchema';
import type { AwaitIOActionHandler } from '../types/AwaitIOActionHandler';

// Created through app.action(), which fills in the io type from the registered components.
export class Action<TIO> {
  readonly name: string | undefined;
  readonly description: string | undefined;
  readonly params: ActionParamsSchema | null;
  readonly handler: AwaitIOActionHandler<TIO, never>;

  constructor({ name, description, params, handler }: ActionInit<TIO>) {
    this.name = name;
    this.description = description;
    this.params = params ?? null;
    this.handler = handler;
  }
}
