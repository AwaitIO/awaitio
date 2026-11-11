import { defineDisplay } from 'awaitio';
import { Link, routeHref, routeSchema } from 'awaitio/ui';
import { z } from 'zod/v4';

export const displayLink = defineDisplay({
  props: z.union([
    z.object({
      // 'https://…' opens in a new tab; a path such as '/actions/users/change_role?id=2' stays in the app.
      url: z.string().min(1),
      // What the link says; the URL itself when left out.
      text: z.string().optional(),
    }),
    z.object({
      // An action or a folder's page inside the app, from action.route() or page.route(); opens in the same tab. The link
      // says the route's label: route({ label }) changes it.
      route: routeSchema,
      text: z.never({ error: 'A route link says the route label; pass route({ label }) instead of text' }).optional(),
    }),
  ]),
  component: ({ props }) => {
    if ('route' in props) {
      return <Link href={routeHref(props.route)}>{props.route.label ?? routeHref(props.route)}</Link>;
    }

    // A scheme (https:, mailto:…) means a page outside AwaitIO.
    const isExternal = /^[a-z][a-z\d+.-]*:/i.test(props.url);

    return (
      <Link href={props.url} external={isExternal}>
        {props.text ?? props.url}
      </Link>
    );
  },
});
