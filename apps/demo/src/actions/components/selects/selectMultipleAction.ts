import { app } from '../../../app';

export const selectMultipleAction = app.defineAction({
  name: 'Select multiple',
  description: 'io.select.multiple asks to pick any number of options.',
  handler: async ({ io }) => {
    const channels = await io.select.multiple('Tell them by', {
      options: [
        { value: 'email', label: 'Email' },
        { value: 'slack', label: 'Slack' },
        { value: 'sms', label: 'SMS' },
      ],
      defaultValue: ['email'],
      maxSelections: 2,
      helpText: 'Leave it empty to change the role quietly.',
    });

    return { channels: channels.map((channel) => channel.label).join(', ') };
  },
});
