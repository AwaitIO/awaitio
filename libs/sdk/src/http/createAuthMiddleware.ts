import { constants } from '../constants';
import { hashToken } from '../utils/hashToken';
import { isTokenHashValid } from '../utils/isTokenHashValid';
import { parseCookies } from '../utils/parseCookies';
import type { RequestHandler } from 'express';

export type CreateAuthMiddlewareArgs = {
  token: string;
};

// The token comes once in the URL (/?token=...). It is swapped for an HttpOnly cookie holding its hash and the
// browser is redirected to the same URL without it, so the token does not stay in the address bar or history.
// API clients can send `Authorization: Bearer <token>` instead.
export const createAuthMiddleware = ({ token }: CreateAuthMiddlewareArgs): RequestHandler => {
  const expected = hashToken({ token });

  return (req, res, next) => {
    const queryToken = req.query.token;

    if (typeof queryToken === 'string') {
      if (!isTokenHashValid({ candidate: hashToken({ token: queryToken }), expected })) {
        return res.status(401).type('text').send('Invalid token.');
      }

      res.cookie(constants.SESSION_COOKIE_NAME, expected, {
        httpOnly: true,
        sameSite: 'strict',
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
        path: '/',
        maxAge: constants.SESSION_COOKIE_MAX_AGE.as('milliseconds'),
      });

      const url = new URL(req.originalUrl, 'http://localhost');
      url.searchParams.delete('token');

      return res.redirect(302, `${url.pathname}${url.search}`);
    }

    const authorization = req.headers.authorization;
    const candidate = authorization?.startsWith('Bearer ')
      ? hashToken({ token: authorization.slice('Bearer '.length) })
      : parseCookies({ header: req.headers.cookie }).get(constants.SESSION_COOKIE_NAME) ?? null;

    if (isTokenHashValid({ candidate, expected })) {
      return next();
    }

    if (req.path.startsWith('/api/')) {
      return res.status(401).json({ error: 'UNAUTHORIZED' });
    }

    return res.status(401).type('text').send('Unauthorized. Open this app with the link that contains ?token=...');
  };
};
