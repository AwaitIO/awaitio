import { Duration } from 'luxon';

export const constants = {
  SESSION_COOKIE_NAME: 'awaitio_session',
  SESSION_MAX_AGE: Duration.fromObject({ days: 7 }),
  MIN_SECRET_LENGTH: 32,
  // Only this machine can reach the server unless listen() is given another host (e.g. '0.0.0.0' in Docker).
  DEFAULT_HOST: '127.0.0.1',

  // scrypt cost: about 100 ms per hash, so guessing passwords from a leaked hash is slow too.
  SCRYPT_COST: 32768,
  SCRYPT_BLOCK_SIZE: 8,
  SCRYPT_PARALLELIZATION: 1,
  SCRYPT_KEY_LENGTH: 32,
  SCRYPT_SALT_LENGTH: 16,
  // An unknown email is checked against this hash, so it takes as long as a wrong password and does not reveal
  // which emails exist.
  DUMMY_PASSWORD_HASH: `scrypt$32768$8$1$${Buffer.alloc(16).toString('base64')}$${Buffer.alloc(32).toString('base64')}`,
  // Failed logins per email before it is locked for the rest of the window.
  MAX_FAILED_LOGINS: 10,
  FAILED_LOGIN_WINDOW: Duration.fromObject({ minutes: 15 }),

  // A running action whose page is closed is canceled after this, so a page refresh (which reconnects within
  // a second) keeps the run alive while an abandoned tab does not park a handler forever.
  CANCEL_AFTER_DISCONNECT: Duration.fromObject({ seconds: 30 }),
  FINISHED_RUN_TTL: Duration.fromObject({ minutes: 15 }),
  SWEEP_INTERVAL: Duration.fromObject({ minutes: 1 }),
  SSE_PING_INTERVAL: Duration.fromObject({ seconds: 15 }),

  // One or more path segments: hello, billing/refund_order, billing/invoices/overdue/send_reminder.
  ACTION_SLUG_PATTERN: /^[A-Za-z0-9_-]+(\/[A-Za-z0-9_-]+)*$/,
  // Files in the actions directory that hold an action; tests, declarations and files starting with _ or . do not.
  ACTION_FILE_PATTERN: /^(?![_.]).+(?<!\.d|\.test|\.spec)\.(ts|tsx|js|mjs|cjs)$/,
};
