import { useFieldId, type InputProps } from 'awaitio/ui';
import { constants } from '../constants';
import type { FC } from 'react';

export const Input: FC<InputProps> = ({ value, onChange, type = 'text', ...props }) => {
  return (
    <input
      {...props}
      id={useFieldId()}
      type={type}
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
      className={constants.CONTROL_CLASS_NAME}
    />
  );
};
