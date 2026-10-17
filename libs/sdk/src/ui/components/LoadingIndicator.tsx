import type { LoadingState } from '../../shared/types/LoadingState';
import type { FC } from 'react';

export type LoadingIndicatorProps = {
  loading: LoadingState | null;
};

export const LoadingIndicator: FC<LoadingIndicatorProps> = ({ loading }) => {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <span className="size-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
      <span className="flex flex-col">
        <span className="text-sm font-medium">{loading?.label ?? 'Running…'}</span>
        {loading?.description && <span className="text-sm text-gray-500">{loading.description}</span>}
      </span>
    </div>
  );
};
