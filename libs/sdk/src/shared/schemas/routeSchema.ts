import { z } from 'zod/v4';
import { actionRouteSchema } from './actionRouteSchema';
import { pageRouteSchema } from './pageRouteSchema';

// A link inside AwaitIO, to an action (action.route()) or to a folder's page (page.route()): what ctx.redirect() takes,
// a table cell's route, a table's row menu and a layout's menu items list.
export const routeSchema = z.union([actionRouteSchema, pageRouteSchema]);
