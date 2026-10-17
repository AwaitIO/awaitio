import { timingSafeEqual } from 'crypto';

export type IsTokenHashValidArgs = {
  candidate: string | null;
  expected: string;
};

// Both sides are sha256 hex digests, so the comparison takes the same time whatever the token looks like.
export const isTokenHashValid = ({ candidate, expected }: IsTokenHashValidArgs) => {
  if (!candidate) {
    return false;
  }

  const candidateBuffer = Buffer.from(candidate, 'hex');
  const expectedBuffer = Buffer.from(expected, 'hex');

  return candidateBuffer.length === expectedBuffer.length && timingSafeEqual(candidateBuffer, expectedBuffer);
};
