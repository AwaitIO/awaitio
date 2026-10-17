import { match } from 'ts-pattern';
import type { ButtonHTMLAttributes, FC } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export const Button: FC<ButtonProps> = ({ variant = 'primary', className, type = 'button', ...props }) => {
  const variantClassName = match(variant)
    .with('primary', () => {
      return 'bg-gray-900 text-white hover:bg-gray-700';
    })
    .with('secondary', () => {
      return 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-100';
    })
    .exhaustive();

  return (
    <button
      type={type}
      className={['rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50', variantClassName, className].filter(Boolean).join(' ')}
      {...props}
    />
  );
};
