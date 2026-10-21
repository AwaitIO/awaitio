import { defineDisplay } from 'awaitio';
import { Link } from 'awaitio/ui';
import { z } from 'zod/v4';

export const displayLink = defineDisplay({
  props: z.object({
    // 'https://…' opens in a new tab; a path such as '/actions/users/change_role?id=2' stays in the app.
    url: z.string().min(1),
    // What the link says; the URL itself when left out.
    text: z.string().optional(),
  }),
  component: ({ props }) => {
    // A scheme (https:, mailto:…) means a page outside AwaitIO.
    const isExternal = /^[a-z][a-z\d+.-]*:/i.test(props.url);

    return (
      <Link href={props.url} external={isExternal}>
        {props.text ?? props.url}
      </Link>
    );
  },
});
