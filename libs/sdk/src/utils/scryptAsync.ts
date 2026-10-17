import { scrypt, type ScryptOptions } from 'crypto';

export type ScryptAsyncArgs = {
  password: string;
  salt: Buffer;
  keyLength: number;
  options: ScryptOptions;
};

export const scryptAsync = ({ password, salt, keyLength, options }: ScryptAsyncArgs) => {
  return new Promise<Buffer>((resolve, reject) => {
    // 128 * N * r bytes plus headroom; the default 32 MB limit is just under what N = 32768 needs.
    scrypt(password, salt, keyLength, { ...options, maxmem: 64 * 1024 * 1024 }, (error, key) => {
      return error ? reject(error) : resolve(key);
    });
  });
};
