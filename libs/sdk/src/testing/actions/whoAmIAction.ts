import { testApp } from '../testApp';

export const whoAmIAction = testApp.defineAction({
  name: 'Who am I',
  handler: async ({ ctx }) => {
    return `${ctx.user.name} <${ctx.user.email}>`;
  },
});
