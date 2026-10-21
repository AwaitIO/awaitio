export type User = {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member';
  accountId: string;
  lastLoginAt: Date | null;
  createdAt: Date;
};
