import { testApp } from '../../../testApp';

// A nested file: its slug is billing/invoices/send_reminder.
export const sendReminderAction = testApp.defineAction({
  name: 'Send reminder',
  handler: async () => {
    return 'Reminder sent';
  },
});
