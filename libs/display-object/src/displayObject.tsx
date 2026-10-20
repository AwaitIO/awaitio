import { defineDisplay } from 'awaitio';
import { z } from 'zod';
import { ObjectView } from './components/ObjectView';

export const displayObject = defineDisplay({
  props: z.object({
    // A record as it comes from the database or an API; a Date arrives as its ISO string.
    data: z.union([z.record(z.unknown()), z.array(z.unknown())]),
  }),
  component: ({ props }) => {
    return <ObjectView data={props.data} />;
  },
});
