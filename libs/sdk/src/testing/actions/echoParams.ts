import { testApp } from '../testApp';

export const echoParams = testApp.action({
  handler: async (_io, ctx) => {
    return ctx.params;
  },
});
