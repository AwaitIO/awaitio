export type Ticket = {
  id: string;
  subject: string;
  message: string;
  accountId: string;
  requesterEmail: string;
  priority: 'low' | 'normal' | 'high';
  status: 'open' | 'pending' | 'closed';
  createdAt: Date;
};
