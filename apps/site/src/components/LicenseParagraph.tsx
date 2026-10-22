import { constants } from '../constants';
import type { FC } from 'react';

type LicenseParagraphProps = {
  text: string;
  className?: string;
};

// Markdown links `[text](url)` and the license email in a paragraph of license text.
const LINK_PATTERN = new RegExp(`\\[([^\\]]+)\\]\\(([^)]+)\\)|${constants.LICENSE_EMAIL.replaceAll('.', '\\.')}`, 'g');

// A paragraph of plain license text, with its markdown links and the license email turned into links.
export const LicenseParagraph: FC<LicenseParagraphProps> = ({ text, className }) => {
  const parts = [];
  let last = 0;

  for (const match of text.matchAll(LINK_PATTERN)) {
    const [whole, label, href] = match;

    parts.push(text.slice(last, match.index));
    parts.push(
      <a key={match.index} href={href ?? `mailto:${whole}`} className="underline hover:text-gray-900">
        {label ?? whole}
      </a>,
    );
    last = match.index + whole.length;
  }
  parts.push(text.slice(last));

  return <p className={className}>{parts}</p>;
};
