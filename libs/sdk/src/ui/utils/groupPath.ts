import { encodePath } from './encodePath';

export type GroupPathArgs = {
  group: string;
};

// The action list narrowed to one folder of the actions directory: /groups/billing, /groups/billing/invoices.
export const groupPath = ({ group }: GroupPathArgs) => {
  return `/groups/${encodePath({ path: group })}`;
};
