import type { RunParams } from '../shared/types/RunParams';
import type { SessionUser } from '../shared/types/SessionUser';

export type PageCtx<TParams = Readonly<RunParams>> = {
  page: {
    // The folder the page stands for: actions/users/index.ts → users.
    slug: string;
  };
  // The query string the page was opened with: /groups/users?role=admin gives { role: 'admin' }, parsed by the page's
  // params schema when it has one. As untrusted as a form field: anyone can craft the link.
  params: TParams;
  // Who opened the page.
  user: SessionUser;
};
