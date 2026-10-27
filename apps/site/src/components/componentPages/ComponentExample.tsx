import type { ComponentPage } from '../../types/ComponentPage';
import { CodeBlock } from '../CodeBlock';
import { TrafficLights } from '../TrafficLights';
import { BrowserFrame } from '../variants/BrowserFrame';
import type { FC } from 'react';

export type ComponentExampleProps = {
  page: ComponentPage;
};

// The simplest use in the ink terminal and, next to it, roughly what it shows in the browser.
export const ComponentExample: FC<ComponentExampleProps> = ({ page }) => {
  const { Output } = page;

  return (
    <div className="grid w-full gap-6 md:grid-cols-2 md:gap-10">
      <figure className="flex min-w-0 flex-col gap-4">
        <div className="flex flex-1 flex-col overflow-hidden rounded-[10px] border-[1.5px] border-gray-900 bg-gray-900 shadow-[6px_6px_0_var(--color-orange-500)]">
          <div className="flex items-center gap-4 px-4 py-3">
            <TrafficLights />
            <span className="truncate font-mono text-xs text-gray-400">{page.example.file}</span>
          </div>
          <CodeBlock lines={page.example.lines} focusLines={page.example.focus} wrap className="px-5 pt-1 pb-5 text-[12px] leading-6" />
        </div>
        <figcaption className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">The code.</span> One call in an action, the whole file.
        </figcaption>
      </figure>
      <figure className="flex min-w-0 flex-col gap-4">
        <BrowserFrame url={page.outputUrl} flush className="flex-1">
          <Output />
        </BrowserFrame>
        <figcaption className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">In the browser.</span> Roughly what your team sees. Your theme decides the details.
        </figcaption>
      </figure>
    </div>
  );
};
