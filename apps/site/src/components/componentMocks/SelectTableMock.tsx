import type { FC } from 'react';

export const SelectTableMock: FC = () => {
  return (
    <div className="w-full overflow-hidden rounded-md border border-gray-300 bg-white text-[10px]">
      <div className="flex items-center gap-2 bg-gray-50 px-2 py-1 font-medium text-gray-600">
        <span className="w-2.5 shrink-0" />
        <span className="flex-1">Device</span>
        <span className="flex-1">Status</span>
      </div>
      {['Lobby screen', 'Kiosk 2', 'Window'].map((device, index) => {
        return (
          <div key={device} className="flex items-center gap-2 border-t border-gray-100 px-2 py-1 text-gray-800">
            <span className={`size-2.5 shrink-0 rounded-full border ${index === 1 ? 'border-orange-500 bg-orange-500' : 'border-gray-400'}`} />
            <span className="flex-1 truncate">{device}</span>
            <span className="flex-1 text-gray-500">Online</span>
          </div>
        );
      })}
    </div>
  );
};
