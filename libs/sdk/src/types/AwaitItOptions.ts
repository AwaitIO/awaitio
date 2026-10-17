import type { AwaitItEnvironment } from './AwaitItEnvironment';
import type { AwaitItUser } from './AwaitItUser';
import type { ComponentTree } from './ComponentTree';

export type AwaitItOptions<T extends ComponentTree> = {
  // The project's name, shown on the login page, in the header and in the browser tab.
  name: string;
  // Every environment (production, staging…) runs as its own server with its own options. List them all in each
  // one: the header shows the current environment as a badge and links to the others.
  environments?: AwaitItEnvironment[];
  // Signs the session cookies. At least 32 characters; changing it logs everyone out.
  secret: string;
  // Who can log in. Changing a user's password hash logs that user out everywhere.
  users: AwaitItUser[];
  // io components available to every action, e.g. { input: { text: inputText } } for io.input.text().
  components?: T;
};
