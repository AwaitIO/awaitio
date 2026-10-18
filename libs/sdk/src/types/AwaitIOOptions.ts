import type { AwaitIOEnvironment } from './AwaitIOEnvironment';
import type { AwaitIOUser } from './AwaitIOUser';
import type { ComponentTree } from './ComponentTree';
import type { LayoutTree } from './LayoutTree';

export type AwaitIOOptions<T extends ComponentTree, L extends LayoutTree> = {
  // The project's name, shown on the login page, in the header and in the browser tab.
  name: string;
  // Every environment (production, staging…) runs as its own server with its own options. List them all in each
  // one: the header shows the current environment as a badge and links to the others.
  environments?: AwaitIOEnvironment[];
  // Signs the session cookies. At least 32 characters; changing it logs everyone out.
  secret: string;
  // Who can log in. Changing a user's password hash logs that user out everywhere.
  users: AwaitIOUser[];
  // io components available to every action, e.g. { input: { text: inputText } } for io.input.text().
  components?: T;
  // Layouts pages can show, e.g. { table: layoutTable } for layout.table() in app.page().
  layouts?: L;
};
