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
      throw new Error(`Invalid action slug "${slug}". Use letters, numbers, "_" and "-" only.`);
    }

    const action = route instanceof Action ? route : new Action({ handler: route });
    // The typed io was checked where the action was defined; at run time io is built from the same registry.
    const handler = action.handler as unknown as AwaitIOActionHandler<unknown, unknown>;
    actions.set(slug, { slug, name: action.name ?? slugToName({ slug }), description: action.description ?? null, handler, params: action.params });
  });

  return actions;
};
