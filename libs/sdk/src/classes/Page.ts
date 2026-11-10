import type { PageRoute } from '../shared/types/PageRoute';
import type { ActionParamsSchema } from '../types/ActionParamsSchema';
import type { ActionRouteArgs } from '../types/ActionRouteArgs';
import type { PageHandler } from '../types/PageHandler';
import type { PageInit } from '../types/PageInit';
import { slugToName } from '../utils/slugToName';
import { toRouteParams } from '../utils/toRouteParams';

// Created through app.definePage() in a folder's index file, which fills in the io type from the registered display components and layouts.
export class Page<TIO, TSchema extends ActionParamsSchema | undefined = ActionParamsSchema | undefined> {
  // Recognizes a page loaded from the actions directory even when it comes from another copy of the package.
  readonly kind = 'awaitio-page';
  readonly name: string | undefined;
  readonly description: string | undefined;
  readonly unlisted: boolean;
  readonly params: ActionParamsSchema | null;
  readonly handler: PageHandler<TIO, never>;
  // The folder the page stands for, filled in when listen() loads the folder.
  slug: string | null = null;

  constructor({ name, description, unlisted = false, params, handler }: PageInit<TIO>) {
    this.name = name;
    this.description = description;
    this.unlisted = unlisted;
    this.params = params ?? null;
    this.handler = handler;
  }

  // A link to this page for ctx.redirect(), with params typed by its schema, like an action's route():
  // usersPage.route({ params: { role: 'admin' } }). Values travel in the query string, so they become strings.
  route(...[args]: ActionRouteArgs<TSchema>): PageRoute & { label: string } {
    if (this.slug === null) {
      throw new Error(`The page${this.name ? ` "${this.name}"` : ''} has no route: it is not in the actions directory, or listen() has not loaded it yet.`);
    }

    return {
      label: args?.label ?? this.name ?? slugToName({ slug: this.slug.split('/').at(-1) ?? this.slug }),
      page: this.slug,
      params: toRouteParams({ params: args && 'params' in args ? (args.params as Record<string, unknown>) : undefined }),
    };
  }
}
