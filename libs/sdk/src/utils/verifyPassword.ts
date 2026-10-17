import { timingSafeEqual } from 'crypto';
import { parsePasswordHash } from './parsePasswordHash';
import { scryptAsync } from './scryptAsync';

export type VerifyPasswordArgs = {
  password: string;
  passwordHash: string;
};

export const verifyPassword = async ({ password, passwordHash }: VerifyPasswordArgs) => {
  const parsed = parsePasswordHash({ passwordHash });

  if (!parsed) {
    return false;
  }

  const key = await scryptAsync({ password, salt: parsed.salt, keyLength: parsed.key.length, options: parsed.options });

  return timingSafeEqual(key, parsed.key);
};
