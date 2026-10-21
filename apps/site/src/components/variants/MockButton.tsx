import type { FC } from 'react';

export type MockButtonProps = {
  label?: string;
  small?: boolean;
};

export const MockButton: FC<MockButtonProps> = ({ label = 'Continue', small = false }) => {
  return <span className={['self-start rounded-md bg-gray-900 font-medium text-white', small ? 'px-2 py-1 text-[11px]' : 'px-4 py-2 text-sm'].join(' ')}>{label}</span>;
};
