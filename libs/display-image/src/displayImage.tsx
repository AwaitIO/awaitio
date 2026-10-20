import { defineDisplay } from 'awaitio';
import { Image } from 'awaitio/ui';
import { z } from 'zod';

export const displayImage = defineDisplay({
  props: z.object({
    // Any image the browser can load, e.g. a chart from QuickChart or a signed file URL.
    url: z.string().min(1),
    // Read by screen readers and shown when the image does not load; the label when left out.
    alt: z.string().optional(),
    // How tall it may get; without a size it is as wide as there is room for.
    size: z.enum(['thumbnail', 'small', 'medium', 'large']).optional(),
  }),
  component: ({ label, props }) => {
    return <Image src={props.url} alt={props.alt ?? label ?? ''} size={props.size} />;
  },
});
