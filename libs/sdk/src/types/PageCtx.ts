import type { RunParams } from '../shared/types/RunParams';
import type { SessionUser } from '../shared/types/SessionUser';

export type PageCtx = {
  page: {
    // The folder the page stands for: actions/users/index.ts → users.
    slug: string;
  };
  // The query string the page was opened with, as strings: /groups/users?role=admin gives { role: 'admin' }.
  params: Readonly<RunParams>;
  // Who opened the page.
  user: SessionUser;
};
