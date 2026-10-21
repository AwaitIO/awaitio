import type { FC } from 'react';

export const ObjectMock: FC = () => {
  return (
    <div className="w-full rounded-md border border-gray-200 bg-white p-2 font-mono text-[10px] leading-relaxed text-gray-700">
      <div>{'{'}</div>
      <div className="pl-3">
        id: <span className="text-orange-600">42</span>,
      </div>
      <div className="pl-3">
        plan: <span className="text-emerald-700">&quot;Team&quot;</span>,
      </div>
      <div className="pl-3">
        owner: <span className="text-gray-400">{'{…}'}</span>
      </div>
      <div>{'}'}</div>
    </div>
  );
};
