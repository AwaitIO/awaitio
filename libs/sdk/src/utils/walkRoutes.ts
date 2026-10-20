import { isAction } from './isAction';
import { slugToName } from './slugToName';
import { Action } from '../classes/Action';
import { constants } from '../constants';
import type { AwaitIOActionHandler } from '../types/AwaitIOActionHandler';
import type { AwaitIORoutes } from '../types/AwaitIORoutes';
import type { RegisteredAction } from '../types/RegisteredAction';

export type WalkRoutesArgs<TIO> = {
  routes: AwaitIORoutes<TIO>;
};

export const walkRoutes = <TIO>({ routes }: WalkRoutesArgs<TIO>) => {
  const actions = new Map<string, RegisteredAction>();

  Object.entries(routes).forEach(([slug, route]) => {
    if (!constants.ACTION_SLUG_PATTERN.test(slug)) {
      throw new Error(`Invalid action slug "${slug}". Use letters, numbers, "_" and "-", with "/" between folders.`);
    }

    // A bare handler only comes from tests; its name is the last part of the slug: billing/send_reminder → Send reminder.
    const action = isAction(route) ? (route as Action<TIO>) : new Action({ name: slugToName({ slug: slug.split('/').at(-1) ?? slug }), handler: route as AwaitIOActionHandler<TIO, never> });

    // The type requires a name; this catches plain JavaScript and an empty string.
    if (typeof action.name !== 'string' || action.name.trim().length === 0) {
      throw new Error(`The action "${slug}" has no name. Give app.action() a name, e.g. name: 'Send reminder'.`);
    }

    // The typed io was checked where the action was defined; at run time io is built from the same registry.
    const handler = action.handler as unknown as AwaitIOActionHandler<unknown, unknown>;
    actions.set(slug, { slug, name: action.name.trim(), description: action.description ?? null, unlisted: action.unlisted === true, handler, params: action.params });
  });

  return actions;
};
