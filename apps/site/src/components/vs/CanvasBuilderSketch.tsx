import { CursorIcon } from '../../icons/CursorIcon';
import type { FC } from 'react';

const palette = ['Table', 'Button', 'Text input', 'Select', 'Chart'];

// A visual builder as people know it: a palette of components on the left, a dotted canvas with widgets on it, a
// button being dragged into place and a query wired to the table.
export const CanvasBuilderSketch: FC = () => {
  return (
    <div className="flex min-h-[15rem] flex-1 text-[10px] text-gray-600">
      <div className="flex w-20 shrink-0 flex-col gap-1.5 border-r border-gray-200 bg-gray-50 p-2 sm:w-24">
        {palette.map((item) => {
          return (
            <span key={item} className="truncate rounded border border-gray-200 bg-white px-1.5 py-1">
              {item}
            </span>
          );
        })}
      </div>
      <div className="relative flex-1 bg-[radial-gradient(var(--color-gray-300)_1px,transparent_1px)] [background-size:12px_12px] p-3">
        <div className="absolute top-3 left-3 rounded border border-gray-300 bg-white px-1.5 py-0.5 font-mono">query1</div>
        <svg className="absolute top-[1.4rem] left-[3.6rem] h-8 w-12 text-gray-400" viewBox="0 0 48 32" fill="none" aria-hidden="true">
          <path d="M0 2h20v28h28" stroke="currentColor" strokeDasharray="3 2" />
        </svg>
        <div className="absolute top-12 right-3 left-[5.5rem] rounded border border-gray-300 bg-white">
          {[0, 1, 2, 3].map((row) => {
            return (
              <div key={row} className={['flex gap-2 px-2 py-1.5', row > 0 && 'border-t border-gray-100'].filter(Boolean).join(' ')}>
                <span className="h-1.5 w-8 rounded bg-gray-200" />
                <span className="h-1.5 flex-1 rounded bg-gray-100" />
              </div>
            );
          })}
        </div>
        <div className="absolute bottom-4 left-6 rounded border-[1.5px] border-dashed border-gray-500 bg-white px-3 py-1.5 font-medium text-gray-800">
          Refund
          <span className="absolute -right-9 -bottom-6">
            <CursorIcon />
          </span>
        </div>
      </div>
    </div>
  );
};
