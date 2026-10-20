import { defineDisplay } from 'awaitio';
import { Prose } from 'awaitio/ui';
import DOMPurify from 'dompurify';
import { z } from 'zod';

export const displayHtml = defineDisplay({
  props: z.object({
    // Markup to show, e.g. an email template; scripts, event handlers and other active content are removed first.
    html: z.string(),
  }),
  component: ({ props }) => {
    // The markup can carry data from users, so it is sanitized in the browser right before it is shown.
    return (
      <Prose>
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.html) }} />
      </Prose>
    );
  },
});
