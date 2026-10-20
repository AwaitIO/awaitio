import type { ButtonProps } from 'awaitio/ui';
import type { FC } from 'react';

export const Button: FC<ButtonProps> = ({ variant = 'primary', className, type = 'button', ...props }) => {
  const variantClassName = variant === 'primary' ? 'bg-gray-900 text-white hover:bg-gray-700' : 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-100';

  return (
    <button
      type={type}
      className={['rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50', variantClassName, className].filter(Boolean).join(' ')}
      {...props}
    />
  );
};
