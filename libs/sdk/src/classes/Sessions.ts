import { timingSafeEqual } from 'crypto';
import { DateTime } from 'luxon';
import { z } from 'zod/v4';
import { LoginLimiter } from './LoginLimiter';
import { constants } from '../constants';
import type { LoginRequest } from '../shared/types/LoginRequest';
import type { SessionUser } from '../shared/types/SessionUser';
import type { AwaitIOUser } from '../types/AwaitIOUser';
import type { SessionsLoginResult } from '../types/SessionsLoginResult';
import { parsePasswordHash } from '../utils/parsePasswordHash';
import { signSessionPayload } from '../utils/signSessionPayload';
import { verifyPassword } from '../utils/verifyPassword';

export type SessionsOptions = {
  secret: string;
  users: AwaitIOUser[];
};

const payloadSchema = z.object({ email: z.string(), exp: z.number() });

// Stateless sessions: the cookie carries the email and the expiry, signed with the secret and the user's password
// hash. Nothing is stored on the server, so a restart keeps everyone logged in.
export class Sessions {
  private readonly secret: string;
  private readonly users: Map<string, AwaitIOUser>;
  private readonly limiter = new LoginLimiter();

  constructor({ secret, users }: SessionsOptions) {
    if (secret.length < constants.MIN_SECRET_LENGTH) {
      throw new Error(`The secret must be at least ${constants.MIN_SECRET_LENGTH} characters long.`);
    }

    this.secret = secret;
    this.users = new Map();

    users.forEach((user) => {
      const email = user.email.trim().toLowerCase();

      if (this.users.has(email)) {
        throw new Error(`The user ${email} is listed twice.`);
      }

      if (!parsePasswordHash({ passwordHash: user.passwordHash })) {
        throw new Error(`The password hash of ${email} is not one from Create new account on the login page.`);
      }

      this.users.set(email, { ...user, email });
    });
  }

  async login({ email, password }: LoginRequest): Promise<SessionsLoginResult> {
    const normalizedEmail = email.trim().toLowerCase();

    if (this.limiter.isLocked(normalizedEmail)) {
      return { status: 'LOCKED' };
    }

    const user = this.users.get(normalizedEmail);
    const isValid = await verifyPassword({ password, passwordHash: user?.passwordHash ?? constants.DUMMY_PASSWORD_HASH });

    if (!user || !isValid) {
      this.limiter.recordFailure(normalizedEmail);

      return { status: 'INVALID_CREDENTIALS' };
    }

    this.limiter.reset(normalizedEmail);
    const payload = Buffer.from(JSON.stringify({ email: user.email, exp: DateTime.now().plus(constants.SESSION_MAX_AGE).toSeconds() })).toString('base64url');

    return { status: 'OK', user: this.toSessionUser(user), cookie: `${payload}.${signSessionPayload({ secret: this.secret, payload, passwordHash: user.passwordHash })}` };
  }

  // The user of a session cookie, or null when it is missing, forged, expired or its user is gone.
  read(cookie: string | undefined): SessionUser | null {
    const [payload, signature, ...rest] = cookie?.split('.') ?? [];

    if (!payload || !signature || rest.length > 0) {
      return null;
    }

    const parsed = payloadSchema.safeParse(this.parseJson(Buffer.from(payload, 'base64url').toString()));
    const user = parsed.success ? this.users.get(parsed.data.email) : undefined;

    if (!parsed.success || !user || parsed.data.exp < DateTime.now().toSeconds()) {
      return null;
    }

    const expected = Buffer.from(signSessionPayload({ secret: this.secret, payload, passwordHash: user.passwordHash }));
    const candidate = Buffer.from(signature);

    return candidate.length === expected.length && timingSafeEqual(candidate, expected) ? this.toSessionUser(user) : null;
  }

  private toSessionUser({ email, name }: AwaitIOUser): SessionUser {
    return { email, name };
  }

  private parseJson(text: string): unknown {
    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  }
}
