import { match } from 'ts-pattern';
import type { FC } from 'react';

export type RunOutcomeProps = {
  status: 'SUCCESS' | 'FAILURE' | 'CANCELED';
  // ISO time the run ended.
  finishedAt: string | null;
};

const formatFinishedAt = (iso: string) => {
  const date = new Date(iso);

  return `${new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(date)} at ${new Intl.DateTimeFormat('en-US', { timeStyle: 'short' }).format(date)}`;
};

// The line above a finished run: an icon, what happened and when, e.g. "Completed at Oct 19, 2026 at 3:35 PM".
export const RunOutcome: FC<RunOutcomeProps> = ({ status, finishedAt }) => {
  const { label, circleClassName, icon } = match(status)
    .with('SUCCESS', () => {
      return { label: 'Completed', circleClassName: 'bg-green-600', icon: 'M5 10.5 8.5 14 15 6.5' };
    })
    .with('FAILURE', () => {
      return { label: 'Failed', circleClassName: 'bg-red-600', icon: 'M6.5 6.5l7 7m0-7-7 7' };
    })
    .with('CANCELED', () => {
      return { label: 'Canceled', circleClassName: 'bg-gray-400', icon: 'M6 10h8' };
    })
    .exhaustive();

  return (
    <div className="flex items-center gap-3">
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${circleClassName}`}>
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d={icon} />
        </svg>
      </span>
      <p className="text-base">
        <span className="font-medium text-gray-900">{label}</span>
        {finishedAt && <span className="text-gray-500"> at {formatFinishedAt(finishedAt)}</span>}
      </p>
    </div>
  );
};
