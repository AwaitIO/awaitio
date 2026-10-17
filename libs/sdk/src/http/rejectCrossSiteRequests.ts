import { constants } from '../shared/constants';
import type { RequestHandler } from 'express';

// SameSite counts sites, not origins: a page on localhost:<other port> or on a sibling subdomain gets the session
// cookie attached too. So every request that changes something must prove it comes from the AwaitIt UI:
// - Sec-Fetch-Site, when the browser sends it, must be same-origin;
// - the UI's custom header and a JSON body, which no other origin can send without a CORS preflight.
// Bearer clients carry their own credential (a browser never adds it by itself) and skip the second check.
export const rejectCrossSiteRequests: RequestHandler = (req, res, next) => {
  if (req.method === 'GET' || req.method === 'HEAD') {
    return next();
  }

  const fetchSite = req.headers['sec-fetch-site'];

  if (fetchSite !== undefined && fetchSite !== 'same-origin') {
    return res.status(403).json({ error: 'CROSS_SITE_REQUEST' });
  }

  if (req.headers.authorization?.startsWith('Bearer ')) {
    return next();
  }

  if (req.get(constants.REQUEST_HEADER_NAME) !== '1' || !req.is('application/json')) {
    return res.status(403).json({ error: 'CROSS_SITE_REQUEST' });
  }

  return next();
};
