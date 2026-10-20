import { testApp } from '../testApp';

export const whoAmI = testApp.action({
  name: 'Who am I',
  handler: async (_io, ctx) => {
    return `${ctx.user.name} <${ctx.user.email}>`;
  },
});
