export type Invoice = {
  id: string;
  number: string;
  accountId: string;
  amount: number;
  status: 'paid' | 'open' | 'refunded';
  issuedAt: Date;
};
