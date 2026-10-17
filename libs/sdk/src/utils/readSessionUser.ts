import { parseCookies } from './parseCookies';
import type { Sessions } from '../classes/Sessions';
import { constants } from '../constants';
import type { Request } from 'express';

export type ReadSessionUserArgs = {
  req: Request;
  sessions: Sessions;
};

export const readSessionUser = ({ req, sessions }: ReadSessionUserArgs) => {
  return sessions.read(parseCookies({ header: req.headers.cookie }).get(constants.SESSION_COOKIE_NAME));
};
