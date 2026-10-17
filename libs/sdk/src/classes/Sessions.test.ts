import { expect, test } from 'vitest';
import { Sessions } from './Sessions';
import { testUser } from '../testing/testUser';
import { hashPassword } from '../utils/hashPassword';

const { secret, password, passwordHash } = testUser;

type LogInArgs = {
  sessions: Sessions;
};

const logIn = async ({ sessions }: LogInArgs) => {
  const result = await sessions.login({ email: 'petr@example.com', password });

  if (result.status !== 'OK') {
    throw new Error(result.status);
  }

  return result.cookie;
};

test('Should hash a password with a fresh salt each time', async () => {
  const again = await hashPassword({ password });

  expect(passwordHash).toMatch(/^scrypt\$32768\$8\$1\$[A-Za-z0-9+/]+=*\$[A-Za-z0-9+/]+=*$/);

  expect(again).not.toBe(passwordHash);
});

test('Should log out a user everywhere once their password hash changes', async () => {
  const cookie = await logIn({ sessions: new Sessions({ secret, users: [{ email: 'petr@example.com', name: 'Petr', passwordHash }] }) });

  expect(new Sessions({ secret, users: [{ email: 'petr@example.com', name: 'Petr', passwordHash }] }).read(cookie)).toEqual({ email: 'petr@example.com', name: 'Petr' });

  expect(new Sessions({ secret, users: [{ email: 'petr@example.com', name: 'Petr', passwordHash: await hashPassword({ password }) }] }).read(cookie)).toBeNull();

  expect(new Sessions({ secret: `${secret}-new`, users: [{ email: 'petr@example.com', name: 'Petr', passwordHash }] }).read(cookie)).toBeNull();

  expect(new Sessions({ secret, users: [] }).read(cookie)).toBeNull();
});

test('Should refuse a cookie whose payload was changed', async () => {
  const sessions = new Sessions({
    secret,
    users: [
      { email: 'petr@example.com', name: 'Petr', passwordHash },
      { email: 'eva@example.com', name: 'Eva', passwordHash },
    ],
  });
  const [, signature] = (await logIn({ sessions })).split('.');
  const forged = Buffer.from(JSON.stringify({ email: 'eva@example.com', exp: 9999999999 })).toString('base64url');

  expect(sessions.read(`${forged}.${signature}`)).toBeNull();

  expect(sessions.read('garbage')).toBeNull();

  expect(sessions.read(undefined)).toBeNull();
});

test('Should refuse a weak secret, a duplicate user and a plain password', () => {
  expect(() => {
    return new Sessions({ secret: 'short', users: [] });
  }).toThrow('at least 32 characters');

  expect(() => {
    return new Sessions({
      secret,
      users: [
        { email: 'a@example.com', name: 'A', passwordHash },
        { email: 'A@example.com', name: 'A', passwordHash },
      ],
    });
  }).toThrow('listed twice');

  expect(() => {
    return new Sessions({ secret, users: [{ email: 'a@example.com', name: 'A', passwordHash: password }] });
  }).toThrow('awaitit hash-password');
});
