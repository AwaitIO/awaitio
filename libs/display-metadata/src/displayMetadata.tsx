import { defineDisplay } from 'awaitio';
import { formatCellValue, Metadata } from 'awaitio/ui';
import { z } from 'zod/v4';

export const displayMetadata = defineDisplay({
  props: z.object({
    // One tile each: { label: 'Total accounts', value: 542 }.
    items: z.array(z.object({ label: z.string().nullable(), value: z.union([z.string(), z.number(), z.boolean(), z.null()]), description: z.string().optional() })),
  }),
  component: ({ props }) => {
    return (
      <Metadata
        items={props.items.map((item) => {
          return { label: item.label, value: formatCellValue(item.value), description: item.description };
        })}
      />
    );
  },
});
