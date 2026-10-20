import { useFieldId, type TextareaProps } from 'awaitio/ui';
import { constants } from '../constants';
import type { FC } from 'react';

export const Textarea: FC<TextareaProps> = ({ value, onChange, ...props }) => {
  return (
    <textarea
      {...props}
      id={useFieldId()}
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
      className={constants.CONTROL_CLASS_NAME}
    />
  );
};
