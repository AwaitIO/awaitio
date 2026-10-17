import type { AwaitItUser } from './AwaitItUser';
import type { ComponentTree } from './ComponentTree';

export type AwaitItOptions<T extends ComponentTree> = {
  // Signs the session cookies. At least 32 characters; changing it logs everyone out.
  secret: string;
  // Who can log in. Changing a user's password hash logs that user out everywhere.
  users: AwaitItUser[];
  // io components available to every action, e.g. { input: { text: inputText } } for io.input.text().
  components?: T;
};
