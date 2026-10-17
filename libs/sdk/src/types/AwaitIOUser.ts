export type AwaitIOUser = {
  email: string;
  // Shown in the header and in ctx.user.
  name: string;
  // From `awaitio hash-password`, never the password itself.
  passwordHash: string;
};
