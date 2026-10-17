import { createHash } from 'crypto';

export type HashTokenArgs = {
  token: string;
};

export const hashToken = ({ token }: HashTokenArgs) => {
  return createHash('sha256').update(token).digest('hex');
};
