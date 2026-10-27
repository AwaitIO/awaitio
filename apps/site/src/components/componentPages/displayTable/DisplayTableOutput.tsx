import type { FC } from 'react';

const users = [
  { name: 'Ana Ruiz', email: 'ana@northwind.example', createdAt: 'Oct 16, 2026, 9:30 AM' },
  { name: 'Ben Carter', email: 'ben@bluebird.example', createdAt: 'Oct 14, 2026, 4:12 PM' },
  { name: 'Mia Chen', email: 'mia@northwind.example', createdAt: 'Oct 9, 2026, 11:05 AM' },
  { name: 'Omar Haddad', email: 'omar@harbor.example', createdAt: 'Oct 2, 2026, 8:47 AM' },
  { name: 'Lena Fischer', email: 'lena@bluebird.example', createdAt: 'Sep 28, 2026, 2:20 PM' },
];

// Roughly what the example shows: the step's card with the heading, the filter, the rows and Continue.
export const DisplayTableOutput: FC = () => {
  return (
    <div className="flex flex-1 flex-col gap-3 bg-gray-50 p-4 text-left text-gray-900 sm:p-5">
      <p className="text-sm font-semibold">List users</p>
      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold">All users</span>
          <span className="w-28 rounded-md border border-gray-300 px-2 py-1 text-[11px] text-gray-400 sm:w-36">Filter</span>
        </div>
        <div className="overflow-hidden rounded-lg border border-gray-200 text-[11px]">
          <div className="grid grid-cols-[1fr_1fr] gap-3 bg-gray-50 px-3 py-2 text-gray-500 sm:grid-cols-[1fr_1.5fr_1.4fr]">
            <span>name</span>
            <span className="hidden sm:block">email</span>
            <span>createdAt</span>
          </div>
          {users.map((user) => {
            return (
              <div key={user.email} className="grid grid-cols-[1fr_1fr] gap-3 border-t border-gray-100 px-3 py-2 sm:grid-cols-[1fr_1.5fr_1.4fr]">
                <span className="truncate">{user.name}</span>
                <span className="hidden truncate text-gray-600 sm:block">{user.email}</span>
                <span className="truncate text-gray-600">{user.createdAt}</span>
              </div>
            );
          })}
        </div>
      </div>
      <span className="self-start rounded-md bg-gray-900 px-3 py-1.5 text-[11px] font-medium text-white">Continue</span>
    </div>
  );
};
