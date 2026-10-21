import { defineDisplay } from 'awaitio';
import { z } from 'zod/v4';
import { MarkdownText } from './components/MarkdownText';

export const displayMarkdown = defineDisplay({
  props: z.object({}),
  // The label is the markdown itself, so the SDK does not draw it as a heading.
  wrap: false,
  component: ({ label }) => {
    return <MarkdownText text={label ?? ''} />;
  },
});
