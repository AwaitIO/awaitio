import { Duration } from 'luxon';

export const constants = {
  SESSION_COOKIE_NAME: 'awaitit_session',
  SESSION_COOKIE_MAX_AGE: Duration.fromObject({ days: 30 }),
  MIN_TOKEN_LENGTH: 16,
  // Only this machine can reach the server unless listen() is given another host (e.g. '0.0.0.0' in Docker).
  DEFAULT_HOST: '127.0.0.1',

  // A running action whose page is closed is canceled after this, so a page refresh (which reconnects within
  // a second) keeps the run alive while an abandoned tab does not park a handler forever.
  CANCEL_AFTER_DISCONNECT: Duration.fromObject({ seconds: 30 }),
  FINISHED_RUN_TTL: Duration.fromObject({ minutes: 15 }),
  SWEEP_INTERVAL: Duration.fromObject({ minutes: 1 }),
  SSE_PING_INTERVAL: Duration.fromObject({ seconds: 15 }),

  ACTION_SLUG_PATTERN: /^[A-Za-z0-9_-]+$/,
};
