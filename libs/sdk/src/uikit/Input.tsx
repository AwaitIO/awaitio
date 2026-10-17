import { useContext, type FC, type InputHTMLAttributes } from 'react';
import { constants } from './constants';
import { FieldContext } from './FieldContext';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'className' | 'id'> & {
  value: string;
  onChange: (value: string) => void;
};

export const Input: FC<InputProps> = ({ value, onChange, type = 'text', ...props }) => {
  return (
    <input
      {...props}
      id={useContext(FieldContext)}
      type={type}
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
      className={constants.CONTROL_CLASS_NAME}
    />
  );
};
