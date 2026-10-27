import type { FC } from 'react';

const users = [
  { name: 'Ana Ruiz', email: 'ana@northwind.example' },
  { name: 'Ben Carter', email: 'ben@bluebird.example' },
  { name: 'Mia Chen', email: 'mia@northwind.example' },
  { name: 'Omar Haddad', email: 'omar@harbor.example' },
  { name: 'Lena Fischer', email: 'lena@bluebird.example' },
];

// Roughly what the example shows: the step's card with the User table, a radio in front of every row, Mia Chen
// picked, and Continue.
export const SelectTableOutput: FC = () => {
  return (
    <div className="flex flex-1 flex-col gap-3 bg-gray-50 p-4 text-left text-gray-900 sm:p-5">
      <p className="text-sm font-semibold">Reset password</p>
      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold">User</span>
          <span className="w-28 rounded-md border border-gray-300 px-2 py-1 text-[11px] text-gray-400 sm:w-36">Filter</span>
        </div>
        <div className="overflow-hidden rounded-lg border border-gray-200 text-[11px]">
          <div className="grid grid-cols-[0.75rem_1fr] gap-3 bg-gray-50 px-3 py-2 text-gray-500 sm:grid-cols-[0.75rem_1fr_1.5fr]">
            <span />
            <span>name</span>
            <span className="hidden sm:block">email</span>
          </div>
          {users.map((user) => {
            const picked = user.name === 'Mia Chen';

            return (
              <div
                key={user.email}
                className={['grid grid-cols-[0.75rem_1fr] items-center gap-3 border-t border-gray-100 px-3 py-2 sm:grid-cols-[0.75rem_1fr_1.5fr]', picked && 'bg-orange-50'].filter(Boolean).join(' ')}
              >
                <span className={['size-3 rounded-full border', picked && 'border-[3.5px] border-orange-500', !picked && 'border-gray-400'].filter(Boolean).join(' ')} />
                <span className="truncate">{user.name}</span>
                <span className="hidden truncate text-gray-600 sm:block">{user.email}</span>
              </div>
            );
          })}
        </div>
      </div>
      <span className="self-start rounded-md bg-gray-900 px-3 py-1.5 text-[11px] font-medium text-white">Continue</span>
    </div>
  );
};
