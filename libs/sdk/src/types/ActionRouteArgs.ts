import type { ActionParamsSchema } from './ActionParamsSchema';
import type { z } from 'zod';

// What action.route() takes: the params its schema expects (before parsing, so z.coerce.number() takes a number),
// and a label for a menu item, the action's name by default. Without a schema there are no params to pass.
export type ActionRouteArgs<TSchema extends ActionParamsSchema | undefined> = TSchema extends ActionParamsSchema
  ? [args: { params: z.input<TSchema>; label?: string }]
  : [args?: { label?: string }];
