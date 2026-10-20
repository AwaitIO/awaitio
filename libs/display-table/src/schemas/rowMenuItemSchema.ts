import { actionRouteSchema } from 'awaitio/ui';
import { z } from 'zod';

// One link in a row's "…" menu: action.route() with a label it must have.
export const rowMenuItemSchema = actionRouteSchema.extend({ label: z.string() });
