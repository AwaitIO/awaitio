import type { Request } from 'express';

export type RequestHostArgs = {
  req: Request;
};

// The host the browser used, also behind a proxy that sets X-Forwarded-Host.
export const requestHost = ({ req }: RequestHostArgs) => {
  const forwarded = req.get('x-forwarded-host')?.split(',')[0]?.trim();

  return forwarded || req.get('host') || null;
};
