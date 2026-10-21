import type { Plan } from './Plan';

export type Account = {
  id: string;
  name: string;
  domain: string;
  plan: Plan;
  status: 'trial' | 'active' | 'suspended';
  monthlyRevenue: number;
  ownerEmail: string;
  trialEndsAt: Date | null;
  createdAt: Date;
};
