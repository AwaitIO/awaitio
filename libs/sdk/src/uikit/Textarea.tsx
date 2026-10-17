import { useContext, type FC, type TextareaHTMLAttributes } from 'react';
import { constants } from './constants';
import { FieldContext } from './FieldContext';

export type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange' | 'className' | 'id'> & {
  value: string;
  onChange: (value: string) => void;
};

export const Textarea: FC<TextareaProps> = ({ value, onChange, ...props }) => {
  return (
    <textarea
      {...props}
      id={useContext(FieldContext)}
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
      className={constants.CONTROL_CLASS_NAME}
    />
  );
};
