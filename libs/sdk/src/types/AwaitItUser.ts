export type AwaitItUser = {
  email: string;
  // Shown in the header and in ctx.user.
  name: string;
  // From `awaitit hash-password`, never the password itself.
  passwordHash: string;
};
