import type { ActionParamsSchema } from './ActionParamsSchema';
import type { z } from 'zod/v4';

// What action.route() takes: the params its schema expects (before parsing, so z.coerce.number() takes a number),
// and a label for a menu item, the action's name by default. Without a schema, or when every param is optional,
// the params can be left out: createUser.route({ label: 'Create user' }).
export type ActionRouteArgs<TSchema extends ActionParamsSchema | undefined> = TSchema extends ActionParamsSchema
  ? Record<string, never> extends z.input<TSchema>
    ? [args?: { params?: z.input<TSchema>; label?: string }]
    : [args: { params: z.input<TSchema>; label?: string }]
  : [args?: { label?: string }];
