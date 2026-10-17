import { randomBytes } from 'crypto';
import { scryptAsync } from './scryptAsync';
import { constants } from '../constants';

export type HashPasswordArgs = {
  password: string;
};

// `scrypt$N$r$p$salt$hash`, salt and hash in base64. The parameters travel with the hash, so they can be raised
// later without breaking the hashes already in configs.
export const hashPassword = async ({ password }: HashPasswordArgs) => {
  const salt = randomBytes(constants.SCRYPT_SALT_LENGTH);
  const options = { N: constants.SCRYPT_COST, r: constants.SCRYPT_BLOCK_SIZE, p: constants.SCRYPT_PARALLELIZATION };
  const key = await scryptAsync({ password, salt, keyLength: constants.SCRYPT_KEY_LENGTH, options });

  return ['scrypt', options.N, options.r, options.p, salt.toString('base64'), key.toString('base64')].join('$');
};
