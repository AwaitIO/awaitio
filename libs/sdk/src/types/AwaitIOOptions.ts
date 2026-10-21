import type { AwaitIOEnvironment } from './AwaitIOEnvironment';
import type { AwaitIOUser } from './AwaitIOUser';
import type { ComponentTree } from './ComponentTree';
import type { LayoutTree } from './LayoutTree';
import type { Theme } from './Theme';

export type AwaitIOOptions<T extends ComponentTree, L extends LayoutTree> = {
  // The project's name, shown on the login page, in the header and in the browser tab.
  name: string;
  // Absolute path of the folder with the action files, e.g. join(__dirname, 'actions'): one app.defineAction(...) per file,
  // subfolders become groups. Loaded by listen(), once the action files can import this instance.
  actionsDirectory: string;
  // Every environment (production, staging…) runs as its own server with its own options. List them all in each
  // one: the header shows the current environment as a badge and links to the others.
  environments?: AwaitIOEnvironment[];
  // Signs the session cookies. At least 32 characters; changing it logs everyone out.
  secret: string;
  // Who can log in. Changing a user's password hash logs that user out everywhere.
  users: AwaitIOUser[];
  // Failed logins per email within 15 minutes before that email is locked for the rest of them. Defaults to 10; false
  // turns the lock off, e.g. for a public demo whose shared login anyone could otherwise lock.
  maxFailedLogins?: number | false;
  // io components available to every action, e.g. { input: { text: inputText } } for io.input.text().
  components?: T;
  // How the UI looks: which theme package draws each block, e.g. defaultTheme from @awaitio/theme-default, or
  // { ...defaultTheme, Label: myTheme.Label } to replace only the label.
  theme: Theme;
  // Layouts pages can show, e.g. { table: layoutTable } for layout.table() in app.definePage().
  layouts?: L;
};
