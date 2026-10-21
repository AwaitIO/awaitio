import { Fragment, type ReactNode } from 'react';

// Lets the browser wrap a long expression after "." or "(" (prisma.order.|findUniqueOrThrow(|{) instead of in the
// middle of a name.
export const withBreakPoints = (text: string): ReactNode[] => {
  const [first, ...rest] = text.split(/(?<=[.(])/);

  return [
    first,
    ...rest.map((part, index) => {
      return (
        <Fragment key={index}>
          <wbr />
          {part}
        </Fragment>
      );
    }),
  ];
};
