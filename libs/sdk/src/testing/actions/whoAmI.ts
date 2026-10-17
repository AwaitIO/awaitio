import { testApp } from '../testApp';

export const whoAmI = testApp.action({
  handler: async (_io, ctx) => {
    return `${ctx.user.name} <${ctx.user.email}>`;
  },
});
