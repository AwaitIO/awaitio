import { useId, type FC, type ReactNode } from 'react';
import { FieldContext } from './FieldContext';

export type FieldProps = {
  label: string;
  helpText?: string;
  // What is wrong with the value, shown under the control.
  error?: string | null;
  children: ReactNode;
};

// Label, control, help text and error of one form field. The SDK wraps every component in it unless the component
// sets `wrap: false`; a component drawing its own layout can use it directly too.
export const Field: FC<FieldProps> = ({ label, helpText, error, children }) => {
  const id = useId();

  return (
    <FieldContext.Provider value={id}>
      <div className="flex flex-col gap-1">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        {children}
        {helpText && <p className="text-xs text-gray-500">{helpText}</p>}
        {error && (
          <p role="alert" className="text-xs text-red-600">
            {error}
          </p>
        )}
      </div>
    </FieldContext.Provider>
  );
};
