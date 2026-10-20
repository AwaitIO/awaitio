import { FieldContext, Hint, Label, type FieldProps } from 'awaitio/ui';
import { useId, type FC } from 'react';

// Label, control, help text and error of one form field. The SDK wraps every component in it unless the component
// sets `wrap: false`; a component drawing its own layout can use it directly too.
export const Field: FC<FieldProps> = ({ label, helpText, optional, error, children }) => {
  const id = useId();

  return (
    <FieldContext.Provider value={id}>
      <div className="flex flex-col gap-1">
        <Label htmlFor={id}>
          {label}
          {optional && <span className="ml-1.5 text-xs font-normal text-gray-500">optional</span>}
        </Label>
        {children}
        {helpText && <Hint>{helpText}</Hint>}
        {error && (
          <p role="alert" className="text-xs text-red-600">
            {error}
          </p>
        )}
      </div>
    </FieldContext.Provider>
  );
};
