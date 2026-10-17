import { createContext } from 'react';

// The id of the control inside the current Field, so the label points at it without the component passing ids around.
export const FieldContext = createContext<string | undefined>(undefined);
