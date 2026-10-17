import { testApp } from '../../../testApp';

// A nested file: its slug is billing/invoices/send_reminder.
export const sendReminder = testApp.action({
  handler: async () => {
    return 'Reminder sent';
  },
});
