import { z } from 'zod';
import { testApp } from '../testApp';

export const nextId = testApp.action({
  params: z.object({ id: z.coerce.number().int() }),
  handler: async (_io, ctx) => {
    // ctx.params.id is a number here: the schema typed and parsed it.
    return ctx.params.id + 1;
  },
});
