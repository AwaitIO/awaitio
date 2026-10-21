import type { FC } from 'react';

export const MetadataMock: FC = () => {
  return (
    <div className="grid w-full grid-cols-3 gap-1.5">
      {[
        ['Users', '542'],
        ['Admins', '3'],
        ['Plan', 'Team'],
      ].map(([label, value]) => {
        return (
          <div key={label} className="flex flex-col gap-0.5 rounded-md border border-gray-200 bg-white px-2 py-1.5">
            <span className="text-[9px] text-gray-500">{label}</span>
            <span className="text-sm font-semibold text-gray-900">{value}</span>
          </div>
        );
      })}
    </div>
  );
};
