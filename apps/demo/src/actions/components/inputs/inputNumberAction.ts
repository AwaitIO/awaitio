import { app } from '../../../app';

export const inputNumberAction = app.defineAction({
  name: 'Input number',
  description: 'io.input.number asks for a number, with limits and decimal places.',
  handler: async ({ io }) => {
    const amount = await io.input.number('Refund amount', {
      min: 0,
      max: 500,
      decimals: 2,
      helpText: 'In euros, up to 500',
    });

    return { amount };
  },
});
