import { defineDisplay } from 'awaitio';
import { Heading } from 'awaitio/ui';
import { z } from 'zod/v4';

export const displayHeading = defineDisplay({
  props: z.object({
    // A line under the title, e.g. what the section below is for.
    description: z.string().optional(),
    // 2 is a section title, bigger than the labels of the fields under it; 3 matches the headings above tables.
    level: z.union([z.literal(2), z.literal(3)]).default(2),
  }),
  // The label is the heading itself, so the SDK does not draw it a second time above.
  wrap: false,
  component: ({ label, props }) => {
    return (
      <Heading description={props.description} level={props.level}>
        {label}
      </Heading>
    );
  },
});
