import { actionRouteSchema, pageRouteSchema } from 'awaitio/ui';
import { z } from 'zod/v4';

// One link in a row's "…" menu: action.route() or page.route() with a label it must have.
export const rowMenuItemSchema = z.union([actionRouteSchema.extend({ label: z.string() }), pageRouteSchema.extend({ label: z.string() })]);
