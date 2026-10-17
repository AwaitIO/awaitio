export type ParentOfArgs = {
  slug: string;
};

// The folder a slug lives in, '' for a file directly in the actions directory: billing/invoices/send_reminder → billing/invoices.
export const parentOf = ({ slug }: ParentOfArgs) => {
  return slug.split('/').slice(0, -1).join('/');
};
