import { match, P } from 'ts-pattern';
import type { FC, ReactNode } from 'react';

export type FormFieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
};

export const FormField: FC<FormFieldProps> = ({ label, htmlFor, error, children }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {match(error)
        .with(P.string, (message) => {
          return (
            <p role="alert" className="text-xs text-red-600">
              {message}
            </p>
          );
        })
        .otherwise(() => {
          return null;
        })}
    </div>
  );
};
