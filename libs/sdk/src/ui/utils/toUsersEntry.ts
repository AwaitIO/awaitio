import { toQuotedString } from './toQuotedString';

export type ToUsersEntryArgs = {
  email: string;
  name: string;
  passwordHash: string;
};

// The line to paste into `users` in app.ts, written the way the docs write it.
export const toUsersEntry = ({ email, name, passwordHash }: ToUsersEntryArgs) => {
  return `{ email: ${toQuotedString({ value: email })}, name: ${toQuotedString({ value: name })}, passwordHash: ${toQuotedString({ value: passwordHash })} },`;
};
