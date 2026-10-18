import type { LayoutUiProps } from '../../client/types/LayoutUiProps';
import type { FC } from 'react';

export type BasicLayoutOptions = {
  title?: string;
  description?: string;
};

// The built-in io.layout.basic: the page's title and description, then the display components below each other.
export const BasicLayout: FC<LayoutUiProps<BasicLayoutOptions>> = ({ props, children }) => {
  return (
    <div className="flex flex-col gap-8">
      {(props.title || props.description) && (
        <div className="flex flex-col gap-2">
          {props.title && <h1 className="text-2xl font-semibold">{props.title}</h1>}
          {props.description && <p className="text-sm text-gray-600">{props.description}</p>}
        </div>
      )}
      {children}
    </div>
  );
};
