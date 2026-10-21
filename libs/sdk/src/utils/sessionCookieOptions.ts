import { constants } from '../constants';
import type { CookieOptions, Request } from 'express';

export type SessionCookieOptionsArgs = {
  req: Request;
  basePath: string;
};

// HttpOnly keeps it from scripts, SameSite=Strict keeps it off every request another site starts. Under a basePath
// the browser sends it only to AwaitIO, not to the app the domain is shared with.
export const sessionCookieOptions = ({ req, basePath }: SessionCookieOptionsArgs): CookieOptions => {
  return {
    httpOnly: true,
    sameSite: 'strict',
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    path: basePath || '/',
    maxAge: constants.SESSION_MAX_AGE.as('milliseconds'),
  };
};
