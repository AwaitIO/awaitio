export type ParsePasswordHashArgs = {
  passwordHash: string;
};

const HASH_PATTERN = /^scrypt\$(\d+)\$(\d+)\$(\d+)\$([A-Za-z0-9+/]+=*)\$([A-Za-z0-9+/]+=*)$/;

// Null when the string is not a hash from hashPassword().
export const parsePasswordHash = ({ passwordHash }: ParsePasswordHashArgs) => {
  const parts = HASH_PATTERN.exec(passwordHash);

  if (!parts) {
    return null;
  }

  const [, cost, blockSize, parallelization, salt, key] = parts;

  return {
    options: { N: Number(cost), r: Number(blockSize), p: Number(parallelization) },
    salt: Buffer.from(salt, 'base64'),
    key: Buffer.from(key, 'base64'),
  };
};
