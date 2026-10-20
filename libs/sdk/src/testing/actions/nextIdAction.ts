import { z } from 'zod';
import { testApp } from '../testApp';

export const nextIdAction = testApp.defineAction({
  name: 'Next ID',
  params: z.object({ id: z.coerce.number().int() }),
  handler: async ({ ctx }) => {
    // ctx.params.id is a number here: the schema typed and parsed it.
    return ctx.params.id + 1;
  },
});
