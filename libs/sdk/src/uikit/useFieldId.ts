import { useContext } from 'react';
import { FieldContext } from './FieldContext';

// For a theme's controls: the id their Field gave them, to put on the <input> so its label points at it.
export const useFieldId = () => {
  return useContext(FieldContext);
};
