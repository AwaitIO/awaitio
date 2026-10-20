import { Router, type IRouter } from 'express';
import { LoginLimiter } from '../classes/LoginLimiter';
import { accessRequestSchema } from '../shared/schemas/accessRequestSchema';
import { formatZodError } from '../utils/formatZodError';
import { hashPassword } from '../utils/hashPassword';

// POST /api/access-request: someone without a login sends their email, name and password and gets back the entry for
// `users`, to hand to whoever runs AwaitIO. It is the only way to make a password hash. Nothing is stored and nobody is logged in; the password never leaves this
// request. Open without a session like the login, and limited per address like it, because every request costs a scrypt.
export const createAccessRequestRouter = (): IRouter => {
  const router = Router();
  const limiter = new LoginLimiter();

  router.post('/access-request', (req, res, next) => {
    const address = req.ip ?? 'unknown';

    if (limiter.isLocked(address)) {
      return res.status(429).json({ error: 'TOO_MANY_ATTEMPTS', message: 'Too many requests. Try again in a few minutes.' });
    }

    limiter.recordFailure(address);
    const body = accessRequestSchema.safeParse(req.body);

    if (!body.success) {
      return res.status(400).json({ error: 'BAD_REQUEST', message: formatZodError({ error: body.error }) });
    }

    const { email, name, password } = body.data;

    return hashPassword({ password })
      .then((passwordHash) => {
        res.json({ user: { email, name, passwordHash } });
      })
      .catch(next);
  });

  return router;
};
