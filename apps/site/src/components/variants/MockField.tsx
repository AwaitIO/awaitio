import type { FC } from 'react';

export type MockFieldProps = {
  label: string;
  value?: string;
  focused?: boolean;
  hint?: string;
  small?: boolean;
};

// A static picture of one AwaitIO form field.
export const MockField: FC<MockFieldProps> = ({ label, value = '', focused = false, hint, small = false }) => {
  return (
    <div className="flex flex-col gap-1">
      <span className={['font-medium text-gray-900', small ? 'text-[11px]' : 'text-sm'].join(' ')}>{label}</span>
      <span
        className={[
          'block truncate rounded-md border bg-white text-gray-800',
          small ? 'px-2 py-1 text-[11px]' : 'px-3 py-2 text-sm',
          focused ? 'border-blue-500 ring-4 ring-blue-100' : 'border-gray-300',
        ].join(' ')}
      >
        {value || '\u00a0'}
      </span>
      <span className={['text-[11px] text-gray-500', !hint && 'hidden'].filter(Boolean).join(' ')}>{hint}</span>
    </div>
  );
};
