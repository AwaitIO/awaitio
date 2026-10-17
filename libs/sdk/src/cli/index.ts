#!/usr/bin/env node
import { readPassword } from './readPassword';
import { hashPassword } from '../utils/hashPassword';

const MIN_PASSWORD_LENGTH = 12;

// `awaitit hash-password`: prints the hash for a user's `passwordHash`. The password itself is never printed.
const main = async () => {
  if (process.argv[2] !== 'hash-password') {
    console.error('Usage: awaitit hash-password');

    return 1;
  }

  const password = await readPassword();

  if (password === null) {
    console.error('The passwords do not match.');

    return 1;
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    console.error(`Use at least ${MIN_PASSWORD_LENGTH} characters.`);

    return 1;
  }

  console.info(await hashPassword({ password }));

  return 0;
};

void main().then((code) => {
  process.exitCode = code;
});
