import type { SessionUser } from '../shared/types/SessionUser';
import type { Response } from 'express';

export type GetSessionUserArgs = {
  res: Response;
};

// The user the auth middleware put on the response; routes behind it always have one.
export const getSessionUser = ({ res }: GetSessionUserArgs): SessionUser => {
  const user: unknown = res.locals.user;

  if (!user) {
    throw new Error('The route is not behind the auth middleware.');
  }

  return user as SessionUser;
};
