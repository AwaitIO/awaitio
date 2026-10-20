import { Prose } from 'awaitio/ui';
import { useEffect, useState, type ComponentType, type FC } from 'react';

type MarkdownComponent = ComponentType<{ children: string }>;

export type MarkdownTextProps = {
  text: string;
};

// react-markdown is ESM only and runs only in the browser, so it is loaded when the text is first drawn; the server
// half of the package never draws it. Raw HTML in the text is shown as text.
export const MarkdownText: FC<MarkdownTextProps> = ({ text }) => {
  const [Markdown, setMarkdown] = useState<MarkdownComponent | null>(null);

  useEffect(() => {
    void import('react-markdown').then((module) => {
      setMarkdown(() => {
        return module.default;
      });
    });
  }, []);

  return <Prose>{Markdown && <Markdown>{text}</Markdown>}</Prose>;
};
