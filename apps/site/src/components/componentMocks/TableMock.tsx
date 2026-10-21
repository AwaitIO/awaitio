import type { FC } from 'react';

export const TableMock: FC = () => {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="overflow-hidden rounded-md border border-gray-300 bg-white text-[10px]">
        <div className="grid grid-cols-3 bg-gray-50 px-2 py-1 font-medium text-gray-600">
          <span>Name</span>
          <span>Plan</span>
          <span>Credits</span>
        </div>
        {['Ada', 'Grace', 'Linus'].map((name) => {
          return (
            <div key={name} className="grid grid-cols-3 border-t border-gray-100 px-2 py-1 text-gray-800">
              <span>{name}</span>
              <span className="text-gray-500">Team</span>
              <span>120</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
