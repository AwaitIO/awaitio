import { createHmac } from 'crypto';

export type SignSessionPayloadArgs = {
  secret: string;
  payload: string;
  passwordHash: string;
};

// The user's password hash is part of the signed data: a new password makes every older cookie of that user invalid.
export const signSessionPayload = ({ secret, payload, passwordHash }: SignSessionPayloadArgs) => {
  return createHmac('sha256', secret).update(`${payload}.${passwordHash}`).digest('base64url');
};
