import { constants } from '../constants';
import type { CookieOptions, Request } from 'express';

export type SessionCookieOptionsArgs = {
  req: Request;
};

// HttpOnly keeps it from scripts, SameSite=Strict keeps it off every request another site starts.
export const sessionCookieOptions = ({ req }: SessionCookieOptionsArgs): CookieOptions => {
  return {
    httpOnly: true,
    sameSite: 'strict',
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    path: '/',
    maxAge: constants.SESSION_MAX_AGE.as('milliseconds'),
  };
};
