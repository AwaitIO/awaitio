import type { LoadingState } from '../../shared/types/LoadingState';
import { Card } from '../../uikit/Card';
import type { FC } from 'react';

export type LoadingIndicatorProps = {
  loading: LoadingState | null;
};

export const LoadingIndicator: FC<LoadingIndicatorProps> = ({ loading }) => {
  const itemsInQueue = loading?.itemsInQueue ?? null;

  return (
    <Card>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="size-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
          <span className="flex flex-col">
            <span className="text-sm font-medium">{loading?.label ?? 'Running…'}</span>
            {loading?.description && <span className="text-sm text-gray-500">{loading.description}</span>}
          </span>
        </div>
        {/* ctx.loading.start({ itemsInQueue }) shows how far the handler got; ctx.loading.completeOne() moves it on. */}
        {loading && itemsInQueue !== null && itemsInQueue > 0 && (
          <div className="flex items-center gap-3 sm:pl-7">
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={itemsInQueue}
              aria-valuenow={loading.itemsCompleted}
              aria-label={loading.label}
              className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200"
            >
              <div className="h-full rounded-full bg-gray-900 transition-[width]" style={{ width: `${(loading.itemsCompleted / itemsInQueue) * 100}%` }} />
            </div>
            <span className="shrink-0 text-xs text-gray-500 tabular-nums">
              {loading.itemsCompleted} of {itemsInQueue}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
};
