import type { ActionRoute } from '../shared/types/ActionRoute';
import type { ActionInit } from '../types/ActionInit';
import type { ActionParamsSchema } from '../types/ActionParamsSchema';
import type { ActionRouteArgs } from '../types/ActionRouteArgs';
import type { AwaitIOActionHandler } from '../types/AwaitIOActionHandler';
import { toRouteParams } from '../utils/toRouteParams';

// Created through app.defineAction(), which fills in the io type from the registered components.
export class Action<TIO, TSchema extends ActionParamsSchema | undefined = ActionParamsSchema | undefined> {
  // Recognizes an action loaded from the actions directory even when it comes from another copy of the package.
  readonly kind = 'awaitio-action';
  readonly name: string;
  readonly description: string | undefined;
  readonly unlisted: boolean;
  readonly order: number | null;
  readonly params: ActionParamsSchema | null;
  readonly handler: AwaitIOActionHandler<TIO, never>;
  // Its path in the actions directory, filled in when listen() loads the folder.
  slug: string | null = null;

  constructor({ name, description, unlisted = false, order, params, handler }: ActionInit<TIO>) {
    this.name = name;
    this.description = description;
    this.unlisted = unlisted;
    this.order = order ?? null;
    this.params = params ?? null;
    this.handler = handler;
  }

  // A link to this action for ctx.redirect() or a table's row menu, with params typed by its schema:
  // changeRole.route({ params: { id: user.id } }). Values travel in the query string, so they become strings.
  route(...[args]: ActionRouteArgs<TSchema>): ActionRoute & { label: string } {
    if (this.slug === null) {
      throw new Error(`The action "${this.name}" has no route: it is not in the actions directory, or listen() has not loaded it yet.`);
    }

    return { label: args?.label ?? this.name, action: this.slug, params: toRouteParams({ params: args && 'params' in args ? (args.params as Record<string, unknown>) : undefined }) };
  }
}
