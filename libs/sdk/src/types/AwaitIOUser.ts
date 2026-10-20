export type AwaitIOUser = {
  email: string;
  // Shown in the header and in ctx.user.
  name: string;
  // From Create new account on the login page, never the password itself.
  passwordHash: string;
};
