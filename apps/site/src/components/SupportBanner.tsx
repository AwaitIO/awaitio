import { constants } from '../constants';
import { HeartIcon } from '../icons/HeartIcon';
import { Div } from './motion/Div';
import { FadeIn } from './motion/FadeIn';
import type { FC } from 'react';

export const SupportBanner: FC = () => {
  return (
    <FadeIn className="mt-6 flex flex-col gap-4 rounded-[10px] border-[1.5px] border-orange-500 bg-orange-50 p-6 shadow-[5px_5px_0_var(--color-orange-500)] sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-5">
        {/* A slow double beat with a long rest, so the heart looks alive without pulling the eye all the time. */}
        <Div className="shrink-0" animate={{ scale: [1, 1.12, 1, 1.08, 1] }} transition={{ duration: 1.2, times: [0, 0.15, 0.3, 0.45, 0.6], repeat: Infinity, repeatDelay: 1.6, ease: 'easeInOut' }}>
          <HeartIcon size="normal" className="h-12 w-12 text-orange-500" />
        </Div>
        <div>
          <p className="text-sm font-medium text-gray-500">Support AwaitIO</p>
          <p className="mt-1 text-gray-600">No license needed but you like AwaitIO? A sponsorship of any amount, once or monthly, funds its development.</p>
        </div>
      </div>
      <a href={constants.SPONSORS_URL} className="shrink-0 self-start rounded-lg border-[1.5px] border-orange-600 px-5 py-3 text-sm font-medium text-orange-700 hover:bg-orange-100 sm:self-auto">
        Sponsor on GitHub
      </a>
    </FadeIn>
  );
};
